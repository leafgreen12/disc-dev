from pathlib import Path
import json, random, sys, re, hashlib
from fractions import Fraction
from urllib.parse import unquote,urlsplit
sys.dont_write_bytecode=True
B=Path('/mnt/data/vaga_disc_review/source/vaga_disc_docs_dot_19')
O=Path('/mnt/data/Vaga_DISC_Review_2026-10-15')
sys.path.insert(0,str(B))
import score_doc09_reference as s
bank=s.load_bank()
plans=[s.load_integer_json(B/n) for n in ['DOC-09_PLAN_L40.json','DOC-09_PLAN_L48.json']]
rng=random.Random(20261015); checks=[]
for plan in plans:
 for i in range(30):
  vals={k['item_revision_ref']:rng.randint(1,5) for k in plan['items']}
  if i>=20:
   for ref in rng.sample(list(vals),i-19): del vals[ref]
  inp={'schema_version':'0.1.0','artifact_kind':'LOCAL_SYNTHETIC_SUBMISSION','submission_ref':f'probe-random-{i}', 'form_revision_ref':plan['form_revision_ref'],'context_ref':plan['context_ref'],'instruction_ref':plan['instruction_ref'],'scale_ref':plan['scale_ref'],'submission_state':'SUBMITTED','responses':[{'item_revision_ref':k,'value':v} for k,v in vals.items()]}
  result=s.score(plan,inp,bank);expected={}
  for dim in ['D','I','S','C']:
   keys=[k for k in plan['items'] if k['construct_code']==dim]
   present=[k for k in keys if k['item_revision_ref'] in vals]
   signed=[vals[k['item_revision_ref']]*(1 if k['polarity']=='FORWARD' else -1)+(0 if k['polarity']=='FORWARD' else 6) for k in present]
   f=Fraction(25*(sum(signed)-len(keys)),len(keys)) if len(keys)==len(present) else None
   expected[dim]=None if f is None else {'numerator':f.numerator,'denominator':f.denominator}
  actual={d['code']:d['linear_score'] for d in result['dimensions']}
  checks.append({'plan':plan['plan_id'],'seed_case':i,'passed':expected==actual,'expected':expected,'actual':actual})
print('ARITHMETIC',sum(x['passed'] for x in checks),'/',len(checks))
(O/'independent_arithmetic_tests.json').write_text(json.dumps({'seed':20261015,'scope':'SYNTHETIC_ARITHMETIC_NOT_PSYCHOMETRIC_VALIDATION','tests':checks},ensure_ascii=False,indent=2))
api=json.loads((B/'DOC-13_OPENAPI.json').read_text())
refs=[]
def walk(o,path=''):
 if isinstance(o,dict):
  for k,v in o.items():
   if k=='$ref':refs.append((path,v))
   walk(v,path+'/'+k)
 elif isinstance(o,list):
  for n,v in enumerate(o):walk(v,path+'/'+str(n))
walk(api)
ref_errors=[]
for p,ref in refs:
 if not ref.startswith('#/'):ref_errors.append((p,ref,'EXTERNAL_NOT_VALIDATED'));continue
 try:
  v=api
  for k in ref[2:].split('/'): v=v[k.replace('~1','/').replace('~0','~')]
 except Exception as exc:ref_errors.append((p,ref,str(exc)))
operations=[];param_errors=[];security_errors=[]
for path,pi in api['paths'].items():
 for method,op in pi.items():
  if method not in ['get','put','post','delete','patch','options','head','trace']:continue
  operations.append((path,method,op['operationId']))
  params={p['name']:p for p in pi.get('parameters',[])+op.get('parameters',[]) if 'name' in p}
  for name in re.findall(r'\{([^}]+)\}',path):
   if name not in params or params[name]['in']!='path' or not params[name].get('required'):param_errors.append([path,method,name])
  for scheme in op.get('security',api.get('security',[])):
   if any(k not in api['components']['securitySchemes'] for k in scheme):security_errors.append([path,method,scheme])
ids=[x[2] for x in operations]
oas={'scope':'INDEPENDENT_STATIC_REFERENCE_AND_PARAMETER_LINT_NOT_FULL_OPENAPI_VALIDATOR','operation_count':len(operations),'ref_occurrences':len(refs),'ref_errors':ref_errors,'path_parameter_errors':param_errors,'security_reference_errors':security_errors,'duplicate_operation_ids':[i for i in set(ids) if ids.count(i)>1]}
(O/'openapi_static_audit.json').write_text(json.dumps(oas,ensure_ascii=False,indent=2));print('OAS',json.dumps(oas))
missing=[];link_count=0
for p in B.rglob('*.md'):
 t=re.sub(r'```.*?```','',p.read_text(),flags=re.S)
 for link in re.findall(r'\[[^\]\n]*\]\(([^)]+)\)',t):
  link=link.strip().split()[0]
  if re.match(r'^[a-zA-Z][\w+.-]*:',link) or link.startswith('#'):continue
  rel=unquote(link.split('#')[0]);link_count+=1
  if rel and not (p.parent/rel).exists():missing.append({'source':str(p.relative_to(B)),'target':link})
json_errors=[]
for p in B.rglob('*.json'):
 try:json.loads(p.read_text())
 except Exception as exc:json_errors.append({'path':str(p.relative_to(B)),'error':str(exc)})
report={'markdown_links_checked':link_count,'missing_local_links':missing,'json_files_parsed':len(list(B.rglob('*.json'))),'json_parse_errors':json_errors}
(O/'corpus_links_and_json_audit.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));print('LINKS',link_count,'MISSING',len(missing));print(missing[:30]);print('JSON',len(json_errors))
