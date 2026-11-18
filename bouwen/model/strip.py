import re,sys
t=open(sys.argv[1]).read()
t=t.replace('<!doctype html>\n','',1)
t=re.sub(r'<html[^>]*><head><meta charset="utf-8"><meta name="viewport"[^>]*>\n','',t,count=1)
dys=open('/home/claude/oefenen/dyslexie.js',encoding='utf-8').read()
t=t.replace('<script src="dyslexie.js"></script>','',1)
t=t.replace('</style></head><body>','</style>\n',1)
t=re.sub(r'<a href="index.html" id="back"[^>]*>.*?</a>\n?','',t,count=1)
t=t.replace('<script src="resultaten.js"></script>\n','',1).replace('<script src="resultaten.js"></script>','',1)
t=t.replace('</script></body></html>','</script>\n<script>\n'+dys+'</script>')
assert 'resultaten.js' not in t and '<body' not in t and 'id="back"' not in t
open(sys.argv[2],'w').write(t);print('ok',len(t))
