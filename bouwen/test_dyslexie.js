const {chromium}=require('playwright');
const files=['index.html','hoeken.html','hoeken-meten.html','kompasroos.html','recht-scherp-stomp.html','lijnen-en-hoeken.html','ruimtefiguren.html','ruimtefiguren-lab.html','uitslag.html','decimalen.html','rekenles-getallen.html','rekenles-plus-min.html','rekenles-keer-delen.html','rekenles-breuken.html','rekenles-breuken-keer.html'];
(async()=>{const b=await chromium.launch();const bad=[];
for(const W of [360,320]){
 for(const f of files){
  for(const dys of [0,1]){
   const p=await b.newPage({viewport:{width:W,height:760},deviceScaleFactor:1});
   const errs=[];p.on('pageerror',e=>errs.push(e.message));
   await p.addInitScript(d=>{try{localStorage.setItem('dyslexie-stand',d?'1':'0')}catch(e){};window.speechSynthesis={getVoices:()=>[],addEventListener(){},cancel(){},speak(){}}},dys);
   await p.goto('file:///home/claude/oefenen/'+f);await p.waitForTimeout(400);
   const r=await p.evaluate(()=>{const b=document.getElementById('dysbtn');const R=b&&b.getBoundingClientRect();
     // overlap met andere elementen bovenaan
     let ov=[];if(R){document.querySelectorAll('a,button,h1,h2,header *').forEach(e=>{if(e===b||b.contains(e))return;const q=e.getBoundingClientRect();if(q.width&&q.height&&q.left<R.right&&q.right>R.left&&q.top<R.bottom&&q.bottom>R.top&&getComputedStyle(e).visibility!=='hidden')ov.push((e.id||e.className||e.tagName).toString().slice(0,20)+':'+(e.textContent||'').trim().slice(0,15))})}
     return {btn:!!b,txt:b&&b.textContent,cls:document.documentElement.className,sw:document.documentElement.scrollWidth,ov:ov.slice(0,3),top:R&&Math.round(R.top),w:R&&Math.round(R.width)}});
   if(!r.btn)bad.push(f+' geen knop');
   if(r.sw>W+1)bad.push(f+' '+W+' dys'+dys+' overflow '+r.sw);
   if(r.ov.length)bad.push(f+' '+W+' dys'+dys+' knop overlapt '+r.ov.join(','));
   if(errs.length)bad.push(f+' fout '+errs[0]);
   if(dys!==(r.cls.includes('dys')?1:0))bad.push(f+' stand klopt niet');
   if(W===360&&['index.html','hoeken.html','ruimtefiguren.html','rekenles-getallen.html'].includes(f))await p.screenshot({path:'/tmp/t/dys-'+f.replace('.html','')+'-'+dys+'.png'});
   await p.close()}}}
console.log(bad.length?bad.join('\n'):'PROBLEMS none');await b.close()})()
