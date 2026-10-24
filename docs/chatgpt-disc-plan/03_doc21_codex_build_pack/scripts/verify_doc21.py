#!/usr/bin/env python3
"""Verify documentation and local helper contracts; never execute application tasks.

Default output is stdout. --output requires a NEW file outside this package.
Requires Python 3.11+ and an already-installed jsonschema. No dependency install.
"""
from __future__ import annotations
import sys
sys.dont_write_bytecode = True
import argparse
import ast
import copy
import hashlib
import importlib.metadata
import json
import os
import re
import subprocess
import tempfile
import tomllib
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import unquote
from typing import Any, Callable

import jsonschema
import handoff_doc21 as h

P = Path(__file__).resolve().parent
CHECKS: list[dict[str, Any]] = []


def check(name: str, group: str, fn: Callable[[], Any]) -> None:
    try:
        detail = fn()
        if detail is False:
            raise AssertionError('Unexpected False')
        CHECKS.append({'id': f'CK21-{len(CHECKS)+1:03d}', 'name':name,'group':group,'outcome':'PASS', 'detail':detail})
    except Exception as exc:
        CHECKS.append({'id': f'CK21-{len(CHECKS)+1:03d}', 'name':name,'group':group,'outcome':'FAIL',
                       'error_type':type(exc).__name__,'error':str(exc)[:300]})


def require(condition: bool, detail: Any = True) -> Any:
    if not condition:
        raise AssertionError('Assertion not met')
    return detail


def read(n: str) -> Any:
    return h.load(P,n)


def validate_def(name: str, value: Any) -> bool:
    schema = read('DOC-21_HANDOFF_CONTRACTS.schema.json')
    target = {**schema,'$ref':'#/$defs/'+name}
    jsonschema.Draft202012Validator(target).validate(value)
    return True


def rejected_schema(name: str, value: Any) -> bool:
    try:
        validate_def(name,value)
    except jsonschema.ValidationError:
        return True
    raise AssertionError('Invalid draft accepted')


def source_alignment() -> dict[str,int]:
    roadmap=read('DOC-20_ROADMAP_REGISTRY.json')
    tasks=read('DOC-21_TASK_REGISTRY.json')['tasks']
    expected={(w['id'],v['key']):(w,v) for w in roadmap['work_packages'] for v in w['variants']}
    actual={(t['work_package_ref'],t['variant_key']):t for t in tasks}
    require(set(actual)==set(expected) and len(actual)==len(tasks)==50)
    for key,t in actual.items():
        w,v=expected[key]
        require(t['source_story_ids']==w['primary_story_refs'])
        require(t['source_fr_ids']==w['fr_refs'])
        require(t['source_ac_pool']==w['ac_refs'])
        require(t['implementation_steps']==w['implementation_steps'])
        require(t['title']==v['deliverable'])
        require(t['source_dependency_work_packages']==w['dependency_refs'])
    return {'work_packages':len(roadmap['work_packages']),'variants':len(expected),'tasks':len(tasks)}


def verify_all_excerpts() -> dict[str,int]:
    sources=read('DOC-21_CONTEXT_SOURCES.json')['sources']
    h.ensure_unique(sources)
    maximum=0
    for source in sources:
        result=h.excerpt(P,source,h.MAX_EXCERPT_BYTES)
        require(result['truncated'] is False)
        maximum=max(maximum,result['selected_utf8_bytes'])
    return {'sources_resolved':len(sources),'largest_excerpt_bytes':maximum}


def task_links() -> dict[str,int]:
    sources={s['id']:s for s in read('DOC-21_CONTEXT_SOURCES.json')['sources']}
    tasks=read('DOC-21_TASK_REGISTRY.json')['tasks']
    refs=0
    for task in tasks:
        for key in ['required_context_source_ids','contract_context_source_ids']:
            for ref in task[key]:
                require(ref in sources);refs+=1
        for sp in task['specialist_source_files']:
            require(hashlib.sha256(h.read_bytes(P,sp['path'])).hexdigest()==sp['sha256'])
    return {'context_references':refs,'tasks':len(tasks)}


def verify_trace() -> dict[str,int]:
    old=read('DOC-20_TRACEABILITY.json')['rows']
    now=read('DOC-21_TRACEABILITY.json')['rows']
    oi={r['story_id']:r for r in old}; ni={r['story_id']:r for r in now}
    require(set(oi)==set(ni) and len(now)==75)
    ac=set()
    for sid,r in ni.items():
        for key in ['story_id','fr_id','ac_refs','source_tc16_refs','primary_work_package']:
            require(r[key]==oi[sid][key])
        require(r['runtime_evidence_refs']==[])
        ac.update(r['ac_refs'])
    return require(len(ac)==375,{'stories':75,'unique_ac':len(ac)})


def new_markdowns() -> list[Path]:
    old={e['retained_path'] for e in read('DOC-21_SOURCE_MANIFEST.json')['entries']}
    return sorted(x for x in P.rglob('*.md') if x.relative_to(P).as_posix() not in old)


def markdown_links() -> dict[str,int]:
    total=0; errors=[]
    for f in new_markdowns():
        text=f.read_text(encoding='utf-8')
        nofence=re.sub(r'```.*?```','',text,flags=re.S)
        for link in re.findall(r'\[[^\]\n]*\]\(([^)]+)\)',nofence):
            link=link.strip().split(' ')[0]
            if re.match(r'^[a-zA-Z][a-zA-Z0-9+.-]*:',link):continue
            path,_,anchor=link.partition('#')
            target=(f.parent/unquote(path)).resolve() if path else f
            total+=1
            if not target.is_relative_to(P) or not target.is_file():
                errors.append(f'{f.name}: {link}')
            elif anchor and target.suffix=='.md':
                body=target.read_text(encoding='utf-8')
                if not re.search(r'<a\s+id=["\']'+re.escape(unquote(anchor))+r'["\']',body):
                    # Check automatically generated simple Markdown heading slugs.
                    headings=re.findall(r'^#{1,6}\s+(.+)$',body,re.M)
                    slugs={re.sub(r'[^\w\- ]','',v.lower()).replace(' ','-') for v in headings}
                    if unquote(anchor) not in slugs:errors.append(f'{f.name}: anchor {link}')
    require(not errors,errors[:12])
    return {'markdown_files':len(new_markdowns()),'local_links':total}


def fenced_code() -> bool:
    for f in new_markdowns():
        lines=f.read_text().splitlines();fence=None
        for line in lines:
            m=re.match(r'^\s*(`{3,}|~{3,})',line)
            if m:
                token=m.group(1)
                if fence is None:fence=token[0]
                elif fence==token[0]:fence=None
        require(fence is None, f.name)
    return True


def all_recipes() -> dict[str,int]:
    road=read('DOC-20_ROADMAP_REGISTRY.json')['release_recipes']
    for recipe in road:
        out=h.read_recipe(P,recipe['id'])
        expected=recipe['required_deliverables']
        require([{k:t[k] for k in ['work_package_ref','variant_key']} for t in out['required_tasks']]==expected)
        require(out['work_executed'] is False and out['production_authorized'] is False)
    return {'recipes_checked':len(road)}


def document_index() -> dict[str,int]:
    d=read('DOC-21_DOCUMENT_INDEX.json')
    require(len(d['documents'])==22 and d['approved_count']==0)
    for i,r in enumerate(d['documents']):
        require(r['document_id']==f'DOC-{i:02d}')
        require(h.safe_file(P,r['path']).exists())
        require(r['status']=='REVIEW_DRAFT' and r['approval_status']=='NOT_APPROVED')
    return {'drafts':22,'approved':0}


def check_agents() -> dict[str,int]:
    files=[P/'AGENTS.md',*sorted((P/'agent_templates').rglob('AGENTS.md'))]
    require(len(files)==5)
    root_size=files[0].stat().st_size
    maximum=max(root_size+f.stat().st_size for f in files[1:])
    require(root_size<8192 and maximum<32768)
    require('Không tự ký approval' in files[0].read_text())
    return {'agent_files':len(files),'root_bytes':root_size,'max_root_plus_template_bytes':maximum,
            'actual_codex_loading_verified':False}


def config_example() -> bool:
    doc=tomllib.loads((P/'.codex/config.toml.example').read_text())
    require(doc['approval_policy']=='on-request' and doc['sandbox_mode']=='workspace-write')
    require(doc['web_search']=='disabled' and doc['sandbox_workspace_write']['network_access'] is False)
    require(not (P/'.codex/config.toml').exists() and not (P/'.codex/auth.json').exists())
    return True


def command_slots() -> dict[str,int]:
    d=read('DOC-21_COMMAND_REGISTRY.json');rows=d['commands']
    h.ensure_unique(rows)
    local=[r for r in rows if r['class']=='LOCAL_PACK']
    product=[r for r in rows if r['class']=='PRODUCT_UNBOUND']
    require(len(local)==7 and len(product)==15)
    for c in product:require(c['argv'] is None and c['cwd'] is None and c['status']=='UNBOUND_AFTER_ADR')
    for c in local:
        require(c['argv'][0]=='python' and c['argv'][1] in ['handoff_doc21.py','verify_doc21.py'])
        require(c['network_required'] is False)
    return {'local_commands':7,'product_slots':15,'product_bindings':0}


def negative_case(case: dict[str,Any]) -> bool:
    op=case['operation'];a=case['arguments'];code=None;actual=None
    try:
        if op=='strict_json':
            raw=bytes.fromhex(a['hex']) if 'hex' in a else a['text'].encode('utf-8')
            actual=h.strict_load(raw)
        elif op=='pointer':actual=h.resolve_pointer(a['data'],a['pointer'])
        elif op=='lines':actual=h.select_lines(a['text'],a['selector'])
        elif op=='budget':actual=h.budget(a['value'])
        elif op=='unique':h.ensure_unique(a['rows']);actual=True
        elif op in ['path','path_symlink','source_hash','excerpt_budget']:
            with tempfile.TemporaryDirectory(prefix='vagadoc21-') as directory:
                root=Path(directory);raw='đủ nội dung\n'.encode();(root/'ok.txt').write_bytes(raw)
                if op=='path':actual=h.safe_file(root,a['relative']).name
                elif op=='path_symlink':
                    (root/'link.txt').symlink_to(root/'ok.txt');actual=h.safe_file(root,'link.txt').name
                else:
                    s={'id':'SRC21-TEST','path':'ok.txt','sha256':hashlib.sha256(raw).hexdigest(),
                       'selector_kind':'line_range','selector':{'start_line':1,'end_line':1}}
                    if op=='source_hash':s['sha256']='0'*64
                    actual=h.excerpt(root,s,1 if op=='excerpt_budget' else 100)
        else:raise AssertionError('Unsupported test operation')
    except h.HandoffError as exc:code=exc.code
    require(code==case['expected_error'], {'expected_error':case['expected_error'],'actual_error':code})
    if code is None:require(actual==case['expected_value'])
    return True


def run_cli(args: list[str], expected: int, field: str | None = None, value: Any = None) -> dict[str,Any]:
    env={**os.environ,'PYTHONDONTWRITEBYTECODE':'1'}
    r=subprocess.run([sys.executable,str(P/'handoff_doc21.py'),*args],cwd=P,env=env,
                     stdout=subprocess.PIPE,stderr=subprocess.PIPE,text=True,timeout=30,check=False)
    require(r.returncode==expected, {'returncode':r.returncode,'expected':expected})
    if field is not None:require(json.loads(r.stdout)[field]==value)
    return {'argv':args,'actual_exit':r.returncode,'application_command':False,'codex_invoked':False}


def safe_report_path(requested: str) -> Path:
    path=Path(requested).expanduser()
    if path.exists() or path.is_symlink():raise ValueError('Output already exists; refusing overwrite')
    current=path.absolute()
    for parent in [current,*current.parents]:
        if parent.is_symlink():raise ValueError('Symlink output path not allowed')
    path=current.resolve()
    if path.is_relative_to(P):raise ValueError('Output must be outside package')
    if not path.parent.is_dir():raise ValueError('Output parent does not exist')
    return path


def execute() -> dict[str,Any]:
    check('475 source bytes and sizes','SOURCE',lambda:require(h.verify_sources(P)['integrity_matches'],{'files':475}))
    for name,file in [('TaskRegistry','DOC-21_TASK_REGISTRY.json'),('SourceRegistry','DOC-21_CONTEXT_SOURCES.json'),
                      ('VariantRouting','DOC-21_VARIANT_ROUTING.json'),('CandidateBaseline','DOC-21_BASELINE_CANDIDATE.json'),
                      ('TaskResultTemplate','handoff_templates/TASK_RESULT.template.json')]:
        check('Schema '+name,'CONTRACT',lambda n=name,f=file:validate_def(n,read(f)))
    check('Draft202012 schema is valid','CONTRACT',lambda:jsonschema.Draft202012Validator.check_schema(read('DOC-21_HANDOFF_CONTRACTS.schema.json')) is None)
    check('Task result standalone schema','CONTRACT',lambda:jsonschema.Draft202012Validator(read('handoff_templates/TASK_RESULT.schema.json')).is_valid(read('handoff_templates/TASK_RESULT.template.json')))
    check('All source variants and pools preserved','TRACE',source_alignment)
    check('Context selectors resolve with fingerprints','SOURCE',verify_all_excerpts)
    check('Every task context and specialist digest resolves','TRACE',task_links)
    check('75 story trace and 375 AC preserved','TRACE',verify_trace)
    check('14 recipes exact variant routing','TRACE',all_recipes)
    check('22 core document index','DOCUMENT',document_index)
    check('New Markdown local links and anchors','DOCUMENT',markdown_links)
    check('New Markdown code fences paired','DOCUMENT',fenced_code)
    check('Five agent instruction files and bounded sizes','DOCUMENT',check_agents)
    check('Inactive TOML example parses; safe settings','CONTRACT',config_example)
    check('Seven local commands; 15 product slots UNBOUND','CONTRACT',command_slots)
    check('Three starter tasks only in R20-00','TRACE',lambda:require([r['task_id'] for r in h.read_recipe(P,'R20-00')['required_tasks']]==['TASK21-001','TASK21-002','TASK21-003']))
    check('Manual sandbox does not pull optional WPs','TRACE',lambda:require(not ({'WP20-015','WP20-017','WP20-021','WP20-028','WP20-029','WP20-030','WP20-032','WP20-033'} & {r['work_package_ref'] for r in h.read_recipe(P,'R20-01')['required_tasks']})))
    check('Fourteen decisions remain OPEN','DOCUMENT',lambda:require(len(read('DOC-21_DECISIONS.json')['decisions'])==14 and all(d['status']=='OPEN_NOT_APPROVED' for d in read('DOC-21_DECISIONS.json')['decisions'])))
    check('New Python sources parse','DOCUMENT',lambda:all(ast.parse((P/name).read_text()) is not None for name in ['handoff_doc21.py','verify_doc21.py']))
    check('No fake authorization from check-gates','CONTRACT',lambda:require(h.check_gates(P)['production_authorized'] is False and h.check_gates(P)['work_executed'] is False))
    cases=read('DOC-21_LOCAL_FIXTURES.json')['cases'];h.ensure_unique(cases)
    for case in cases:check(case['id']+' '+case['operation'],'FIXTURE',lambda c=case:negative_case(c))
    for key,val in [('production_authorized',True),('assigned_person','Fake'),('human_approvals',['fake']),
                    ('product_command_bindings',{'build':'fake'}),('runtime_evidence_refs',['fake']),
                    ('dispatch_status','DONE'),('application_execution_status','COMPLETED'),('extra','unknown')]:
        mutated=copy.deepcopy(read('DOC-21_TASK_REGISTRY.json'));mutated['tasks'][0][key]=val
        check('Reject task '+key+' injection','NEGATIVE_SCHEMA',lambda d=mutated:rejected_schema('TaskRegistry',d))
    for key,val in [('production_authorized',True),('approvals',['fake']),('stack_decision_ref','fake'),('code_commit','fake')]:
        mutated=copy.deepcopy(read('DOC-21_BASELINE_CANDIDATE.json'));mutated[key]=val
        check('Reject baseline '+key+' injection','NEGATIVE_SCHEMA',lambda d=mutated:rejected_schema('CandidateBaseline',d))
    deep=b'['*70+b'0'+b']'*70
    def reject_deep():
        try:h.strict_load(deep)
        except h.HandoffError as exc:return require(exc.code=='H21-DEPTH')
        raise AssertionError('Depth accepted')
    check('Reject deeply nested JSON','CONTRACT',reject_deep)
    cli=[(['--verify-sources'],0,'integrity_matches',True),(['--list-tasks'],0,'production_authorized',False),
         (['--task','TASK21-001'],0,'work_executed',False),(['--recipe','R20-00'],0,'production_authorized',False),
         (['--excerpt','SRC21-0001'],0,'truncated',False),(['--check-gates'],3,'production_authorized',False),
         (['--task','TASK21-999'],2,'error','H21-UNKNOWN-ID'),(['--recipe','R20-99'],2,'error','H21-UNKNOWN-ID'),
         (['--excerpt','SRC21-0001','--max-bytes','1'],2,'error','H21-EXCERPT-TOO-LARGE'),
         (['--excerpt','SRC21-0001','--max-bytes','262145'],2,'error','H21-BUDGET'),
         (['--excerpt','SRC21-9999'],2,'error','H21-UNKNOWN-ID'),(['--approve'],2,None,None)]
    for args,code,field,value in cli:check('CLI '+' '.join(args),'CLI',lambda a=args,c=code,f=field,v=value:run_cli(a,c,f,v))
    counts={}
    for row in CHECKS:
        group=counts.setdefault(row['group'],{'total':0,'passed':0,'failed':0});group['total']+=1
        group['passed' if row['outcome']=='PASS' else 'failed']+=1
    return {'document_id':'DOC-21-CHECK-RESULTS','executed_at':datetime.now(timezone.utc).isoformat(),
            'environment':{'python':sys.version,'jsonschema':importlib.metadata.version('jsonschema'),'platform':sys.platform},
            'scope':'LOCAL_DOCUMENT_HANDOFF_HELPER_ONLY','total':len(CHECKS),
            'passed':sum(c['outcome']=='PASS' for c in CHECKS),'failed':sum(c['outcome']=='FAIL' for c in CHECKS),
            'groups':counts,'checks':CHECKS,'codex_invocations':0,'provider_calls':0,
            'application_tests':'NOT_RUN','psychometric_validation':'NOT_PERFORMED',
            'independent_openapi_validator':'NOT_RUN','production_authorized':False}


def main(argv: list[str] | None = None) -> int:
    parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('--output');args=parser.parse_args(argv)
    try:
        path=safe_report_path(args.output) if args.output else None
        report=execute();text=json.dumps(report,ensure_ascii=False,indent=2,allow_nan=False)+'\n'
        if path:
            # Exclusive creation prevents overwriting a report created concurrently.
            with path.open('x',encoding='utf-8') as stream:stream.write(text)
            print(json.dumps({'total':report['total'],'passed':report['passed'],'failed':report['failed'],
                              'report_path':str(path),'production_authorized':False},ensure_ascii=False))
        else:print(text,end='')
        return 0 if report['failed']==0 else 1
    except (ValueError,OSError) as exc:
        print(json.dumps({'error':str(exc),'production_authorized':False},ensure_ascii=False));return 2


if __name__=='__main__':raise SystemExit(main())
