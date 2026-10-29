"""Query archivinformationssystem.at fulltext (scopeArchiv). usage: ais_search.py "term" [out.html]"""
import re,sys,time,requests
U="https://www.archivinformationssystem.at/volltextsuche.aspx"
def search(term):
    s=requests.Session(); s.headers['User-Agent']='Mozilla/5.0 research (cyphersolver)'
    r=s.get(U,timeout=30); t=r.text
    d={m.group(1):m.group(2) for m in re.finditer(r'<input type="hidden" name="([^"]+)" id="[^"]*" value="([^"]*)"',t)}
    import html
    d={k:html.unescape(v) for k,v in d.items()}
    d['ctl00$cphMainArea$txtMitAllenWoertern']=term
    d['ctl00$cphMainArea$cmdSuchen']='Suchen'
    time.sleep(3)
    r=s.post(U,data=d,timeout=60)
    return s,r
if __name__=='__main__':
    s,r=search(sys.argv[1]); print(r.status_code,r.url,len(r.text))
    open(sys.argv[2] if len(sys.argv)>2 else '_tmp/res.html','w',encoding='utf8').write(r.text)

def results(term):
    s,r=search(term); time.sleep(3)
    x=s.get("https://www.archivinformationssystem.at/resultatliste.aspx",timeout=60)
    return s,x.text

import html as _h, json
RL="https://www.archivinformationssystem.at/resultatliste.aspx"
def parse(t):
    rows=[]
    for tr in re.findall(r'<tr class="(?:gridItemLimitedUsability|rgAltRow|rgRow|gridItem[^"]*)"[^>]*>(.*?)</tr>',t,flags=re.S):
        m=re.search(r'detail\.aspx\?ID=(\d+)"[^>]*>(.*?)</a>',tr,flags=re.S)
        if not m: continue
        title=_h.unescape(re.sub(r'<[^>]+>','',m.group(2))).strip()
        darin=re.search(r'lblDarin">(.*?)</span>',tr,flags=re.S)
        darin=_h.unescape(re.sub(r'<[^>]+>',' ',darin.group(1))).strip() if darin else ''
        tds=re.findall(r'<td[^>]*>(.*?)</td>',tr,flags=re.S)
        sig=re.search(r'lblSignatur">(.*?)</span>',tr,flags=re.S)
        rows.append(dict(id=m.group(1),title=title,darin=darin,date=_h.unescape(re.sub(r'<[^>]+>','',tds[2])).strip() if len(tds)>2 else '',
            sig=_h.unescape(sig.group(1)).strip() if sig else '', image='openimage(' in tr))
    return rows
def hidden(t):
    return {k:_h.unescape(v) for k,v in re.findall(r'<input type="hidden" name="([^"]+)" id="[^"]*" value="([^"]*)"',t)}
def crawl(term,maxpages=40):
    s,t=results(term)
    tot=re.search(r'von (\d+)</span>',t); total=int(tot.group(1)) if tot else 0
    out=parse(t); p=1
    while len(out)<total and p<maxpages:
        m=re.search(r"__doPostBack\(&#39;([^&]*)&#39;,&#39;&#39;\)\" *>>>",t) or re.search(r'class="nextPage" href="javascript:__doPostBack\(&#39;([^&]+)&#39;',t)
        if not m: break
        d=hidden(t); d['__EVENTTARGET']=m.group(1); d['__EVENTARGUMENT']=''
        time.sleep(3); t=s.post(RL,data=d,timeout=60).text
        new=parse(t)
        if not new or new[0]['id']==out[-1]['id'] : break
        out+=new; p+=1
    return total,out
if __name__=='__main__' and len(sys.argv)>2 and sys.argv[2]=='crawl':
    tot,o=crawl(sys.argv[1]); print(tot,len(o))
    json.dump(o,open('_tmp/crawl_%s.json'%re.sub(r'\W','',sys.argv[1]),'w',encoding='utf8'),ensure_ascii=False,indent=1)
