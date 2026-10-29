import json,glob,re
allr={}
for f in glob.glob('raw_*.json'):
    for x in json.load(open(f)): allr[x['id']]=x
print(len(allr))
json.dump(list(allr.values()),open('all_records.json','w'))
