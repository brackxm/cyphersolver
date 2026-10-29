"""Fetch AIS detail pages for ids listed in a json file -> _tmp/details2.jsonl (3 s spacing)."""
import re,sys,json,html,time,requests
F=['Unterteilung/Enthält','Erforderliche Bewilligung','Titel','Entstehungszeitraum','Darin','Inhalt','Ort','Sprache','Umfang','Reproduktion vorhanden','Zugänglichkeit','Veröffentlichungen','Bemerkung','Inhalt und Form','Zustand']
def text(t):
    t=re.sub(r'<script.*?</script>','',t,flags=re.S)
    return re.sub(r'\s+',' ',html.unescape(re.sub(r'<[^>]+>',' | ',t)))
out='_tmp/details2.jsonl'
done=set()
try: done={json.loads(l)['id'] for l in open(out,encoding='utf8')}
except FileNotFoundError: pass
ids=json.load(open(sys.argv[1],encoding='utf8'))
s=requests.Session(); s.headers['User-Agent']='Mozilla/5.0 research (cyphersolver)'
f=open(out,'a',encoding='utf8')
for i in ids:
    if i in done: continue
    try:
        r=s.get('https://www.archivinformationssystem.at/detail.aspx?ID='+i,timeout=60); r.encoding='utf-8'
        tx=text(r.text); d={'id':i}
        for k in F:
            m=re.search(r'\| '+re.escape(k)+r': \|[ |]*(.*?)\s*\| \| \|',tx)
            if m: d[k]=m.group(1).strip(' |')
        d['has_view']='Ansichtsbild' in tx or 'openimage' in r.text
    except Exception as e: d={'id':i,'error':str(e)}
    f.write(json.dumps(d,ensure_ascii=False)+'\n'); f.flush(); time.sleep(3)
