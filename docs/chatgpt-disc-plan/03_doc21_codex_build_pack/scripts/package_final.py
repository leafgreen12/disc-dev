from pathlib import Path
import hashlib,json,zipfile,tempfile,subprocess,sys,os
from datetime import datetime,timezone
p=Path('/mnt/data/vaga_disc_docs_dot_19')
oldzip=Path('/mnt/data/Vaga_DISC_Tai_lieu_Dot_18_DOC20_v0.1.0.zip')
zipout=Path('/mnt/data/Vaga_DISC_Tai_lieu_Dot_19_DOC21_v0.1.0.zip')
source=json.loads((p/'DOC-21_SOURCE_MANIFEST.json').read_text())
# Verify source bytes against input archive, independent of the helper.
with zipfile.ZipFile(oldzip) as z:
 assert z.testzip() is None
 for entry in source['entries']:
  name='vaga_disc_docs_dot_18/'+entry['source_path']
  assert z.read(name)==(p/entry['retained_path']).read_bytes(),entry['retained_path']
files=sorted(x for x in p.rglob('*') if x.is_file())
for f in files:
 assert not f.is_symlink()
 assert '__pycache__' not in f.parts and f.suffix.lower() not in ['.pyc','.ttf','.otf','.woff','.woff2']
 assert f.name not in ['auth.json','.env']
entries=[]
for f in files:
 if f.name=='PACKAGE_MANIFEST.json' and f.parent==p:continue
 b=f.read_bytes();entries.append({'path':f.relative_to(p).as_posix(),'size_bytes':len(b),'sha256':hashlib.sha256(b).hexdigest()})
manifest={'document_id':'VAGA-DISC-PACKAGE-DOT-19','version':'0.1.0','prepared_on':'2026-10-15',
 'document_status':'REVIEW_DRAFT','approval_status':'NOT_APPROVED','core_drafts':22,'approved_core_documents':0,
 'source_files_preserved':475,'file_count_excluding_this_manifest':len(entries),
 'application_implemented':False,'production_authorized':False,'entries':entries,
 'self_hash_policy':'MANIFEST_EXCLUDED_TO_AVOID_SELF_REFERENCE'}
(p/'PACKAGE_MANIFEST.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
files=sorted(x for x in p.rglob('*') if x.is_file())
with zipfile.ZipFile(zipout,'w',zipfile.ZIP_DEFLATED,compresslevel=9) as z:
 for f in files:z.write(f,arcname='vaga_disc_docs_dot_19/'+f.relative_to(p).as_posix())
with zipfile.ZipFile(zipout) as z:
 assert z.testzip() is None
 assert len(z.infolist())==len(files)
 for f in files:assert z.read('vaga_disc_docs_dot_19/'+f.relative_to(p).as_posix())==f.read_bytes()
 for entry in entries:
  b=z.read('vaga_disc_docs_dot_19/'+entry['path'])
  assert len(b)==entry['size_bytes'] and hashlib.sha256(b).hexdigest()==entry['sha256']
 # Re-extract and execute validator from ZIP in a different location.
 with tempfile.TemporaryDirectory(prefix='vaga-handoff-roundtrip-') as directory:
  z.extractall(directory)
  rp=Path(directory)/'vaga_disc_docs_dot_19'
  before={f.relative_to(rp).as_posix():hashlib.sha256(f.read_bytes()).hexdigest() for f in rp.rglob('*') if f.is_file()}
  result=subprocess.run([sys.executable,str(rp/'verify_doc21.py')],cwd=rp,env={**os.environ,'PYTHONDONTWRITEBYTECODE':'1'},capture_output=True,text=True,timeout=40)
  assert result.returncode==0,result.stdout[-3000:]
  check=json.loads(result.stdout);assert check['failed']==0
  after={f.relative_to(rp).as_posix():hashlib.sha256(f.read_bytes()).hexdigest() for f in rp.rglob('*') if f.is_file()}
  assert before==after,'Verifier altered package'
verification={'verified_at':datetime.now(timezone.utc).isoformat(),'scope':'ARCHIVE_INTEGRITY_AND_LOCAL_TOOL_ROUNDTRIP',
 'zip_filename':zipout.name,'zip_sha256':hashlib.sha256(zipout.read_bytes()).hexdigest(),'zip_size_bytes':zipout.stat().st_size,
 'zip_crc_ok':True,'zip_file_count':len(files),'input_file_byte_comparisons':475,'archive_entry_byte_comparisons':len(files),
 'manifest_entry_hash_comparisons':len(entries),'roundtrip_checker_total':check['total'],'roundtrip_checker_passed':check['passed'],
 'roundtrip_source_files_modified':0,'application_tests':'NOT_RUN','codex_invocations':0,'production_authorized':False}
output=Path('/mnt/data/Vaga_DISC_Dot_19_DOC21_Package_Verification.json')
output.write_text(json.dumps(verification,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(verification,ensure_ascii=False,indent=2))
