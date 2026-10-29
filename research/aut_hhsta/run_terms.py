import ais_search as a, json, re, time, sys
terms=sys.argv[1:]
for t in terms:
    try:
        tot,o=a.crawl(t,maxpages=60)
    except Exception as e:
        print(t,'ERR',e,flush=True); continue
    json.dump(o,open('_tmp/crawl_%s.json'%re.sub(r'\W','',t),'w',encoding='utf8'),ensure_ascii=False,indent=1)
    print(t,tot,len(o),sum(r['image'] for r in o),flush=True); time.sleep(3)
