import json,sys,os
D=os.path.dirname(os.path.abspath(__file__))
def rd(p):return open(p,encoding='utf-8').read()
les=sys.argv[1];out=sys.argv[2]
meta=json.load(open(os.path.join(les,'lesson.json')))
base=rd(D+'/base.html').replace('@@TITLE@@',meta['title']).replace('@@KEY@@',meta['key'])
base=base.replace('</style>',rd(D+'/extra.css')+'</style>',1)
parts=[base,rd(D+'/lib.js')]
for f in meta['files']:parts.append(rd(os.path.join(les,f)))
parts.append(rd(D+'/ui.js'));parts.append(rd(D+'/engine.js'))
html='\n'.join(parts)+'\n</script></body></html>\n'
open(out,'w',encoding='utf-8').write(html)
print('built',out,len(html))
