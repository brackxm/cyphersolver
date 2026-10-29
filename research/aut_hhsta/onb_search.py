"""ÖNB Digital keyword search through the site's own insert_query -> /search/<id> flow."""
import requests,re,time,html,json,sys
def search(term,pages=3):
    s=requests.Session(); s.headers['User-Agent']='Mozilla/5.0 research (cyphersolver)'
    s.get('https://onb.digital/',timeout=30); time.sleep(3)
    r=s.post('https://onb.digital/Frontend/insert_query',data={'keywords':term,'entdecken':'false'},timeout=60)
    qid=r.text.strip(); out=[]; seen=set()
    # qid might be a long page when fails
    m=None
    for p in range(1,pages+1):
        time.sleep(3)
        u='https://onb.digital/search/'+qid+('' if p==1 else '?page=%d'%p)
        t=s.get(u,timeout=60).text
        if p==1:
            open('_tmp/onb_last.html','w',encoding='utf8').write(t)
        n=0
        for blk in re.split(r'<div id="result_',t)[1:]:
            iid=re.match(r'(\d+)',blk).group(1)
            if iid in seen: continue
            seen.add(iid); n+=1
            ty=re.search(r'translate="[^"]*">\s*([^<]*?)\s*</span>',blk)
            ti=re.search(r'result_text_middle">\s*<a[^>]*>\s*(.*?)\s*</a>',blk,flags=re.S)
            dt=re.search(r'bottom date">\s*<a[^>]*>\s*(.*?)\s*</a>',blk,flags=re.S)
            out.append(dict(id=iid,type=html.unescape(ty.group(1)) if ty else '',title=html.unescape(re.sub(r'\s+',' ',ti.group(1))) if ti else '',date=html.unescape(re.sub(r'\s+',' ',dt.group(1))) if dt else '',url='https://onb.digital/result/'+iid))
        if n==0: break
    return qid[:30],out
if __name__=='__main__':
    for term in sys.argv[1:]:
        q,o=search(term)
        json.dump(o,open('_tmp/onb_%s.json'%re.sub(r'\W','',term),'w',encoding='utf8'),ensure_ascii=False,indent=1)
        print(term,len(o),flush=True)
