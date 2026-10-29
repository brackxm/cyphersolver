import requests, json, time, sys, urllib.parse
H={"User-Agent":"cyphersolver-research (dnbourdeau@gmail.com)"}
U="https://discovery.nationalarchives.gov.uk/API/search/records"
def q(term, series=None, dept=None, maxpages=40, size=100, extra=None):
    out=[];total=None
    for p in range(1,maxpages+1):
        prm={"sps.searchQuery":term,"sps.resultsPageSize":size,"sps.page":p}
        if series: prm["sps.recordSeries"]=series
        if dept: prm["sps.department"]=dept
        if extra: prm.update(extra)
        r=requests.get(U,params=prm,headers=H,timeout=60)
        time.sleep(3.5)
        if r.status_code!=200: print("ERR",r.status_code,term,series); break
        j=r.json(); total=j.get("count")
        recs=j.get("records",[])
        out+=recs
        if len(out)>=total or not recs: break
    return total,out
if __name__=="__main__":
    term=sys.argv[1]; series=sys.argv[2] if len(sys.argv)>2 and sys.argv[2]!="-" else None
    dept=sys.argv[3] if len(sys.argv)>3 else None
    t,o=q(term,series,dept)
    fn="raw_%s_%s_%s.json"%(term.replace(" ","_").replace('"',''),(series or dept or "all").replace(" ","")  ,"x")
    json.dump(o,open(fn,"w"))
    print(term,series,dept,"total",t,"got",len(o))
