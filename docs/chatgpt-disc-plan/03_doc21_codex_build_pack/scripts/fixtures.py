import json
from pathlib import Path
p=Path('/mnt/data/vaga_disc_docs_dot_19')
cases=[]
def add(op,args,expected=None,code=None):
 cases.append({'id':f'FX21-{len(cases)+1:03d}','operation':op,'arguments':args,'expected_value':expected,'expected_error':code,'scope':'LOCAL_SYNTHETIC_ONLY'})
add('strict_json',{'text':'{"a":1}'},{'a':1})
add('strict_json',{'text':'{"a":1,"a":2}'},code='H21-DUPLICATE-JSON-MEMBER')
add('strict_json',{'text':'{"nested":{"a":1,"a":1}}'},code='H21-DUPLICATE-JSON-MEMBER')
for v in ['NaN','Infinity','-Infinity','1e999']:add('strict_json',{'text':v},code='H21-NONFINITE')
add('strict_json',{'text':'\ufeff{}'},code='H21-ENCODING')
add('strict_json',{'text':'{"a":}'},code='H21-JSON')
add('strict_json',{'hex':'fffe'},code='H21-JSON')
add('strict_json',{'text':'[true,null,0]'},[True,None,0])
add('strict_json',{'text':'["Tiếng Việt", "ẩn/hiện"]'},['Tiếng Việt','ẩn/hiện'])
d={'a/b':{'~key':['x','y']},'':7,'m~1n':8,'scalar':0}
add('pointer',{'data':d,'pointer':'/a~1b/~0key/1'},'y')
add('pointer',{'data':d,'pointer':'/'},7)
add('pointer',{'data':d,'pointer':'/m~01n'},8)
add('pointer',{'data':d,'pointer':''},d)
add('pointer',{'data':d,'pointer':'a'},code='H21-POINTER')
add('pointer',{'data':d,'pointer':'/a~2b'},code='H21-POINTER-ESCAPE')
add('pointer',{'data':d,'pointer':'/a~'},code='H21-POINTER-ESCAPE')
add('pointer',{'data':d,'pointer':'/unknown'},code='H21-POINTER-MISSING')
for suffix in ['01','-','-1','+1','1.0']:
 add('pointer',{'data':d,'pointer':'/a~1b/~0key/'+suffix},code='H21-POINTER-INDEX')
add('pointer',{'data':d,'pointer':'/a~1b/~0key/2'},code='H21-POINTER-MISSING')
add('pointer',{'data':d,'pointer':'/scalar/x'},code='H21-POINTER-TYPE')
add('lines',{'text':'a\r\nb\nc','selector':{'start_line':1,'end_line':2}},'a\r\nb\n')
add('lines',{'text':'a\nb','selector':{'start_line':2,'end_line':2}},'b')
for sel in [{'start_line':0,'end_line':1},{'start_line':True,'end_line':1},{'start_line':1,'end_line':True},
 {'start_line':2,'end_line':1},{'start_line':1,'end_line':3},{'start_line':1},
 {'start_line':1,'end_line':2,'file':'no'},{'start_line':1.0,'end_line':2}]:
 add('lines',{'text':'a\nb','selector':sel},code='H21-LINE-RANGE')
for val in [0,-1,True,262145]:add('budget',{'value':val},code='H21-BUDGET')
add('budget',{'value':1},1);add('budget',{'value':262144},262144)
for path in ['../a.txt','/tmp/a.txt','a/../a.txt','a//b.txt','a/./b.txt','C:/a.txt','a\\b.txt','a\x00.txt']:
 add('path',{'relative':path},code='H21-PATH')
add('path',{'relative':'missing.txt'},code='H21-FILE-MISSING')
add('path',{'relative':'ok.txt'},'ok.txt')
add('path_symlink',{},code='H21-SYMLINK')
add('source_hash',{},code='H21-SOURCE-HASH')
add('excerpt_budget',{},code='H21-EXCERPT-TOO-LARGE')
add('unique',{'rows':[{'id':'x'},{'id':'x'}]},code='H21-DUPLICATE-ID')
add('unique',{'rows':[{'id':'x'},{'id':'y'}]},True)
(p/'DOC-21_LOCAL_FIXTURES.json').write_text(json.dumps({'document_id':'DOC-21-LOCAL-FIXTURES','version':'0.1.0','scope':'LOCAL_SYNTHETIC_ONLY','cases':cases},ensure_ascii=False,indent=2)+'\n')
print(len(cases),'fixtures')
