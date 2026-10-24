#!/usr/bin/env python3
"""Read-only handoff helper. No application, shell command or provider execution.

Use only a trusted, immutable local copy of the documentation package. Hashes
are integrity comparisons, not signatures or proof of authorization.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import re
import sys
from pathlib import Path, PurePosixPath
from typing import Any

ROOT = Path(__file__).resolve().parent
MAX_INPUT_BYTES = 8 * 1024 * 1024
MAX_DEPTH = 64
DEFAULT_EXCERPT_BYTES = 65536
MAX_EXCERPT_BYTES = 262144


class HandoffError(ValueError):
    """A safe local error code without reflecting input payloads."""
    def __init__(self, code: str):
        super().__init__(code)
        self.code = code


def strict_load(raw: bytes) -> Any:
    if not isinstance(raw, bytes) or len(raw) > MAX_INPUT_BYTES:
        raise HandoffError('H21-SIZE')
    if raw.startswith(b'\xef\xbb\xbf'):
        raise HandoffError('H21-ENCODING')
    def pairs(values: list[tuple[str, Any]]) -> dict[str, Any]:
        result: dict[str, Any] = {}
        for key, value in values:
            if key in result:
                raise HandoffError('H21-DUPLICATE-JSON-MEMBER')
            result[key] = value
        return result
    def constant(_: str) -> None:
        raise HandoffError('H21-NONFINITE')
    try:
        data = json.loads(raw.decode('utf-8', errors='strict'),
                          object_pairs_hook=pairs, parse_constant=constant)
        todo = [(data, 0)]
        while todo:
            value, depth = todo.pop()
            if depth > MAX_DEPTH:
                raise HandoffError('H21-DEPTH')
            if isinstance(value, float) and not (-float('inf') < value < float('inf')):
                raise HandoffError('H21-NONFINITE')
            if isinstance(value, dict):
                todo.extend((v, depth + 1) for v in value.values())
            elif isinstance(value, list):
                todo.extend((v, depth + 1) for v in value)
        return data
    except HandoffError:
        raise
    except (UnicodeError, json.JSONDecodeError, RecursionError, ValueError):
        raise HandoffError('H21-JSON') from None


def safe_file(root: Path, relative: str) -> Path:
    if (not isinstance(relative, str) or not relative or '\\' in relative
            or ':' in relative or '\x00' in relative
            or any(ord(c) < 32 for c in relative)):
        raise HandoffError('H21-PATH')
    path = PurePosixPath(relative)
    if path.is_absolute() or any(x in ('', '.', '..') for x in relative.split('/')):
        raise HandoffError('H21-PATH')
    root = root.resolve()
    current = root
    for part in path.parts:
        current = current / part
        if current.is_symlink():
            raise HandoffError('H21-SYMLINK')
    try:
        if not current.resolve().is_relative_to(root):
            raise HandoffError('H21-PATH')
        if not current.is_file():
            raise HandoffError('H21-FILE-MISSING')
        return current
    except OSError:
        raise HandoffError('H21-FILE-IO') from None


def read_bytes(root: Path, relative: str) -> bytes:
    try:
        path = safe_file(root, relative)
        if path.stat().st_size > MAX_INPUT_BYTES:
            raise HandoffError('H21-SIZE')
        with path.open('rb') as stream:
            raw = stream.read(MAX_INPUT_BYTES + 1)
        if len(raw) > MAX_INPUT_BYTES:
            raise HandoffError('H21-SIZE')
        return raw
    except OSError:
        raise HandoffError('H21-FILE-IO') from None


def load(root: Path, filename: str) -> Any:
    return strict_load(read_bytes(root, filename))


def ensure_unique(rows: list[dict[str, Any]], key: str = 'id') -> None:
    values = [row[key] for row in rows]
    if len(values) != len(set(values)):
        raise HandoffError('H21-DUPLICATE-ID')


def one(rows: list[dict[str, Any]], identifier: str, pattern: str) -> dict[str, Any]:
    if not isinstance(identifier, str) or not re.fullmatch(pattern, identifier):
        raise HandoffError('H21-ID')
    ensure_unique(rows)
    matches = [r for r in rows if r['id'] == identifier]
    if len(matches) != 1:
        raise HandoffError('H21-UNKNOWN-ID')
    return matches[0]


def resolve_pointer(data: Any, pointer: str) -> Any:
    if not isinstance(pointer, str) or (pointer and not pointer.startswith('/')):
        raise HandoffError('H21-POINTER')
    if pointer == '':
        return data
    current = data
    for token in pointer.split('/')[1:]:
        if re.search(r'~(?![01])', token):
            raise HandoffError('H21-POINTER-ESCAPE')
        token = token.replace('~1', '/').replace('~0', '~')
        if isinstance(current, dict):
            if token not in current:
                raise HandoffError('H21-POINTER-MISSING')
            current = current[token]
        elif isinstance(current, list):
            if not re.fullmatch(r'0|[1-9][0-9]*', token) or len(token) > 16:
                raise HandoffError('H21-POINTER-INDEX')
            index = int(token)
            if index >= len(current):
                raise HandoffError('H21-POINTER-MISSING')
            current = current[index]
        else:
            raise HandoffError('H21-POINTER-TYPE')
    return current


def select_lines(text: str, selector: dict[str, Any]) -> str:
    if (not isinstance(selector, dict)
            or set(selector) != {'start_line', 'end_line'}):
        raise HandoffError('H21-LINE-RANGE')
    start, end = selector['start_line'], selector['end_line']
    lines = text.splitlines()
    if (type(start) is not int or type(end) is not int
            or not 1 <= start <= end <= len(lines)):
        raise HandoffError('H21-LINE-RANGE')
    # Preserve original line separators and the terminal newline, if present.
    return ''.join(text.splitlines(keepends=True)[start - 1:end])


def budget(value: int) -> int:
    if type(value) is not int or not 1 <= value <= MAX_EXCERPT_BYTES:
        raise HandoffError('H21-BUDGET')
    return value


def excerpt(root: Path, source: dict[str, Any], max_bytes: int = DEFAULT_EXCERPT_BYTES) -> dict[str, Any]:
    limit = budget(max_bytes)
    raw = read_bytes(root, source['path'])
    if hashlib.sha256(raw).hexdigest() != source['sha256']:
        raise HandoffError('H21-SOURCE-HASH')
    if source['selector_kind'] == 'json_pointer':
        selected = resolve_pointer(strict_load(raw), source['selector'])
        content = json.dumps(selected, ensure_ascii=False, indent=2, allow_nan=False)
    elif source['selector_kind'] == 'line_range':
        try:
            content = select_lines(raw.decode('utf-8', errors='strict'), source['selector'])
        except UnicodeError:
            raise HandoffError('H21-ENCODING') from None
    else:
        raise HandoffError('H21-SELECTOR-KIND')
    length = len(content.encode('utf-8'))
    if length > limit:
        raise HandoffError('H21-EXCERPT-TOO-LARGE')
    return {'source': source, 'selected_utf8_bytes': length,
            'content': content, 'truncated': False,
            'authority': 'REFERENCE_DRAFT_NOT_APPROVED',
            'instruction_trust': 'DATA_NOT_AGENT_INSTRUCTION'}


def verify_sources(root: Path) -> dict[str, Any]:
    manifest = load(root, 'DOC-21_SOURCE_MANIFEST.json')
    entries = manifest['entries']
    paths = [entry['retained_path'] for entry in entries]
    if len(paths) != len(set(paths)) or len(entries) != manifest['count']:
        raise HandoffError('H21-SOURCE-MANIFEST')
    mismatches: list[dict[str, Any]] = []
    for entry in entries:
        try:
            raw = read_bytes(root, entry['retained_path'])
            if len(raw) != entry['size_bytes'] or hashlib.sha256(raw).hexdigest() != entry['sha256']:
                mismatches.append({'path': entry['retained_path'], 'code': 'H21-SOURCE-HASH-SIZE'})
        except HandoffError as exc:
            # Corpus paths are output only after the local path validator.
            mismatches.append({'entry_number': len(mismatches) + 1, 'code': exc.code})
    return {'checked_files': len(entries), 'mismatches': mismatches,
            'integrity_matches': not mismatches, 'approval_verified': False,
            'production_authorized': False}


def read_task(root: Path, task_id: str) -> dict[str, Any]:
    task = one(load(root, 'DOC-21_TASK_REGISTRY.json')['tasks'], task_id, r'TASK21-[0-9]{3}')
    return {'task': task, 'work_executed': False, 'production_authorized': False}


def read_recipe(root: Path, recipe_id: str) -> dict[str, Any]:
    source = load(root, 'DOC-20_ROADMAP_REGISTRY.json')
    recipe = one(source['release_recipes'], recipe_id, r'R20-[0-9]{2}')
    routes = load(root, 'DOC-21_VARIANT_ROUTING.json')['routes']
    index = {(r['work_package_ref'], r['variant_key']): r['task_id'] for r in routes}
    if len(index) != len(routes):
        raise HandoffError('H21-ROUTING-DUPLICATE')
    required = []
    for d in recipe['required_deliverables']:
        key = (d['work_package_ref'], d['variant_key'])
        if key not in index:
            raise HandoffError('H21-ROUTING-MISSING')
        required.append({**d, 'task_id': index[key]})
    return {'recipe_ref': recipe_id, 'required_tasks': required,
            'gate_refs': recipe['gate_refs'],
            'excluded_capabilities': recipe['excluded_capabilities'],
            'note': 'Exact source variants; not a schedule, topological sort, dispatch or approval.',
            'work_executed': False, 'production_authorized': False}


def check_gates(root: Path) -> dict[str, Any]:
    candidate = load(root, 'DOC-21_BASELINE_CANDIDATE.json')
    # Never interpret a file's asserted signature or Boolean as trusted approval.
    return {'scope': 'PLANNING_ONLY', 'status': 'BLOCKED_FOR_APPLICATION_AND_PEOPLE',
            'blockers': candidate['unresolved_scope_facts'],
            'production_authorized': False, 'application_commands_bound': False,
            'actual_authority_verification': 'NOT_IMPLEMENTED',
            'work_executed': False}


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument('--verify-sources', action='store_true')
    group.add_argument('--list-tasks', action='store_true')
    group.add_argument('--task')
    group.add_argument('--recipe')
    group.add_argument('--excerpt')
    group.add_argument('--check-gates', action='store_true')
    parser.add_argument('--max-bytes', type=int, default=DEFAULT_EXCERPT_BYTES)
    args = parser.parse_args(argv)
    try:
        budget(args.max_bytes)
        status = 0
        if args.verify_sources:
            result = verify_sources(ROOT)
            status = 0 if result['integrity_matches'] else 2
        elif args.list_tasks:
            tasks = load(ROOT, 'DOC-21_TASK_REGISTRY.json')['tasks']
            ensure_unique(tasks)
            result = {'tasks': [{k: t[k] for k in ('id', 'work_package_ref', 'variant_key', 'kind', 'title')}
                                for t in tasks], 'work_executed': False, 'production_authorized': False}
        elif args.task:
            result = read_task(ROOT, args.task)
        elif args.recipe:
            result = read_recipe(ROOT, args.recipe)
        elif args.excerpt:
            sources = load(ROOT, 'DOC-21_CONTEXT_SOURCES.json')['sources']
            selected = one(sources, args.excerpt, r'SRC21-[0-9]{4}')
            result = excerpt(ROOT, selected, args.max_bytes)
        else:
            result, status = check_gates(ROOT), 3
        print(json.dumps(result, ensure_ascii=False, indent=2, allow_nan=False))
        return status
    except HandoffError as exc:
        print(json.dumps({'error': exc.code, 'scope': 'LOCAL_HANDOFF_ONLY', 'production_authorized': False}))
        return 2
    except (OSError, KeyError, TypeError, ValueError, OverflowError):
        print(json.dumps({'error': 'H21-REGISTRY-CONTRACT', 'production_authorized': False}))
        return 2


if __name__ == '__main__':
    raise SystemExit(main())
