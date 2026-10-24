from pathlib import Path
import json
P=Path('/mnt/data/vaga_disc_docs_dot_19')
def read(n):return json.loads((P/n).read_text())
def put(n,d):(P/n).write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n')
def obj(p):return {'type':'object','properties':p,'required':list(p),'additionalProperties':False}
def string(pattern=None):
 d={'type':'string','minLength':1}
 if pattern:d['pattern']=pattern
 return d
def array(i,mi=0,ma=None):
 d={'type':'array','items':i,'minItems':mi}
 if ma is not None:d['maxItems']=ma
 return d
def infer(value):
 if value is None:return {'type':'null'}
 if isinstance(value,bool):return {'const':value}
 if isinstance(value,str):return string()
 if isinstance(value,int):return {'type':'integer','minimum':0}
 if isinstance(value,list):return array(infer(value[0])) if value else {'type':'array','maxItems':0}
 if isinstance(value,dict):return obj({k:infer(v) for k,v in value.items()})
 raise TypeError(type(value))

def root_schema(n,listkey=None,row_schema=None):
 d=read(n);s=infer(d)
 for k in ['document_id','version','prepared_on','status','approval_status','meaning']:
  if k in d:s['properties'][k]={'const':d[k]}
 if listkey:s['properties'][listkey]=array(row_schema,1)
 return s

sample=read('DOC-21_TASK_REGISTRY.json')['tasks'][0];ts=infer(sample)
for k in ['source_story_ids','source_fr_ids','source_ac_pool','source_dependency_work_packages','recipe_refs','required_context_source_ids','contract_context_source_ids']:
 ts['properties'][k]=array(string())
for k in ['document_status','dispatch_status','application_execution_status','ac_applicability_status','write_scope_status']:
 ts['properties'][k]={'const':sample[k]}
ts['properties']['id']=string(r'^TASK21-[0-9]{3}$')
ts['properties']['work_package_ref']=string(r'^WP20-[0-9]{3}$')
ts['properties']['kind']={'enum':['PREPARATION_ONLY','HUMAN_OWNED_AGENT_PREPARES','IMPLEMENTATION_AFTER_BASELINE']}
ts['properties']['specialist_source_files']=array(obj({'path':string(),'sha256':string(r'^[a-f0-9]{64}$')}),1)
ss=obj({'id':string(r'^SRC21-[0-9]{4}$'),'path':string(),'sha256':string(r'^[a-f0-9]{64}$'),
 'selector_kind':{'enum':['json_pointer','line_range']},'selector':{},'label':string(),
 'authority':{'const':'REFERENCE_DRAFT_NOT_APPROVED'},'instruction_trust':{'const':'DATA_NOT_AGENT_INSTRUCTION'}})
ss['allOf']=[{'if':{'properties':{'selector_kind':{'const':'json_pointer'}}},'then':{'properties':{'selector':{'type':'string'}}},
 'else':{'properties':{'selector':obj({'start_line':{'type':'integer','minimum':1},'end_line':{'type':'integer','minimum':1}})}}}]
rs=infer(read('DOC-21_VARIANT_ROUTING.json')['routes'][0])
for k in ['recipe_refs','source_fr_ids','source_ac_pool']:rs['properties'][k]=array(string())
rs['properties']['dispatch_status']={'const':'NOT_DISPATCHED'}
for k,p in [('work_package_ref',r'^WP20-[0-9]{3}$'),('task_id',r'^TASK21-[0-9]{3}$')]:rs['properties'][k]=string(p)
bs=root_schema('DOC-21_BASELINE_CANDIDATE.json')
for k in ['allowed_work','recipe_ref','proposed_next_recipe_ref','conditional_auth_delta']:
 bs['properties'][k]={'const':read('DOC-21_BASELINE_CANDIDATE.json')[k]}
result=obj({'task_id':string(r'^TASK21-[0-9]{3}$'),'scope':{'const':'PLANNING_ONLY'},
'outcome':{'enum':['CANDIDATE_WRITTEN','BLOCKED','NO_CHANGE']},'files_written':array(string()),'source_ids':array(string(r'^SRC21-[0-9]{4}$')),
'commands':array(obj({'command':string(),'outcome':{'enum':['PASS','FAIL','NOT_RUN','BLOCKED']},'evidence_ref':{'type':['string','null']}})),
'missing_items':array(string()),'human_decisions_needed':array(string()),'application_implemented':{'const':False},'production_authorized':{'const':False}})
main={'$schema':'https://json-schema.org/draft/2020-12/schema','title':'Vaga DOC21 draft handoff contracts; not an authorization service',
 '$defs':{'TaskRegistry':root_schema('DOC-21_TASK_REGISTRY.json','tasks',ts),'SourceRegistry':root_schema('DOC-21_CONTEXT_SOURCES.json','sources',ss),
 'VariantRouting':root_schema('DOC-21_VARIANT_ROUTING.json','routes',rs),'CandidateBaseline':bs,'TaskResultTemplate':result}}
put('DOC-21_HANDOFF_CONTRACTS.schema.json',main)
put('handoff_templates/TASK_RESULT.schema.json',{'$schema':'https://json-schema.org/draft/2020-12/schema',**result})
put('handoff_templates/TASK_RESULT.template.json',{'task_id':'TASK21-001','scope':'PLANNING_ONLY','outcome':'BLOCKED','files_written':[],
'source_ids':[],'commands':[],'missing_items':['Task chưa được thực hiện trong ứng dụng/Codex.'],
'human_decisions_needed':['Phạm vi baseline và người chịu trách nhiệm chưa được chốt.'],'application_implemented':False,'production_authorized':False})
print('schemas written')
