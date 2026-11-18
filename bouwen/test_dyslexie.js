/* Test dyslexie-stand + leesliniaal op alle pagina's van de website (map = repo).
   Gebruik: node test_dyslexie.js [MAP]   (standaard: de repo-map, een niveau boven bouwen/)
   Controleert per pagina, per breedte (360 en 320), met stand uit / aan / aan+liniaal:
   knop aanwezig, geen zijwaarts scrollen, geen fouten, knoppen hangen niet over Menu/Vorige/Volgende of een invoerveld (andere inhoud schuift gewoon onder de zwevende knoppen door, dat telt niet),
   en dat de liniaal een balk toont en met de pijltjes verder gaat. */
const {chromium}=require('playwright');
const DIR=process.argv[2]||require('path').resolve(__dirname,'..');
const files=require('fs').readdirSync(DIR).filter(f=>f.endsWith('.html'));
(async()=>{const b=await chromium.launch();const bad=[];
for(const W of [360,320]){
 for(const f of files){
  for(const mode of ['uit','aan','liniaal']){
   const p=await b.newPage({viewport:{width:W,height:760},deviceScaleFactor:1});
   const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/fonts|ERR_|Failed to load|net::|Fetch API|file:/.test(m.text()))errs.push('CONSOLE '+m.text())});
   await p.addInitScript(m=>{try{localStorage.setItem('dyslexie-stand',m==='uit'?'0':'1');localStorage.setItem('dyslexie-liniaal',JSON.stringify({aan:m==='liniaal',kleur:'geel',groter:m==='liniaal'?1:0,tempo:0}))}catch(e){};window.speechSynthesis={getVoices:()=>[],addEventListener(){},cancel(){},speak(){}}},mode);
   await p.goto('file://'+DIR+'/'+f);await p.waitForTimeout(600);
   if(await p.$('#nmi')){try{await p.fill('#nmi','Test');await p.click('#go');await p.waitForTimeout(400)}catch(e){}}
   const r=await p.evaluate(()=>{const b=document.getElementById('dysbtn');const R=b&&b.getBoundingClientRect();
     const hit=(A,B)=>{const w=Math.min(A.right,B.right)-Math.max(A.left,B.left),h=Math.min(A.bottom,B.bottom)-Math.max(A.top,B.top);return w>2&&h>2};
     const dock=[...document.querySelectorAll('#dysdock button:not([hidden])')].filter(x=>x.offsetParent!==null||getComputedStyle(x).position==='fixed').map(x=>x.getBoundingClientRect());
     const mine=[R,...dock].filter(Boolean);
     const others=[...document.querySelectorAll('a,button,h1,h2,header *,.nav .btn,.opt,.c2,input')].filter(e=>!e.closest('#dysbtn,#dysdock,#dyspanel,#dysgrip')&&getComputedStyle(e).visibility!=='hidden').map(e=>({r:e.getBoundingClientRect(),hard:e.matches('.nav .btn,input'),n:(e.id||e.className||e.tagName).toString().slice(0,18)+':'+(e.textContent||'').trim().slice(0,12)})).filter(x=>x.r.width>0&&x.r.height>0);
     const ov=[];mine.forEach(m=>others.forEach(o=>{if(hit(m,o.r)&&o.hard&&!/^(hr|a|body)/.test(o.n))ov.push(o.n)}));
     const band=document.getElementById('dysband');const bs=band&&getComputedStyle(band).display;
     return {btn:!!b,cls:document.documentElement.className,sw:document.documentElement.scrollWidth,ov:ov.slice(0,3),band:bs,rb:!!document.getElementById('dysrulbtn')}});
   if(!r.btn)bad.push(f+' geen knop');
   if(r.sw>W+1)bad.push(f+' '+W+' '+mode+' overflow '+r.sw);
   if(r.ov.length&&mode!=='uit')bad.push(f+' '+W+' '+mode+' dyslexie-knoppen over: '+r.ov.join(' | '));
   if(errs.length)bad.push(f+' '+mode+' fout '+errs[0]);
   if((mode!=='uit')!==r.cls.includes('dys'))bad.push(f+' stand klopt niet');
   if(mode!=='uit'&&!r.rb)bad.push(f+' geen liniaal-knop');
   if(mode==='liniaal'){
     if(r.band!=='block')bad.push(f+' '+W+' liniaal-balk niet zichtbaar ('+r.band+')');
     await p.mouse.click(5,5);await p.waitForTimeout(700);
     const t0=await p.evaluate(()=>document.getElementById('dysband').getBoundingClientRect().top+scrollY);
     for(let i=0;i<3;i++){await p.evaluate(()=>{const a=document.activeElement;if(a&&a.blur)a.blur()});await p.keyboard.press('ArrowDown');await p.waitForTimeout(450)}
     const t1=await p.evaluate(()=>document.getElementById('dysband').getBoundingClientRect().top+scrollY);
     if(Math.abs(t1-t0)<3)bad.push(f+' '+W+' liniaal beweegt niet met pijltje (t0 '+Math.round(t0)+', t1 '+Math.round(t1)+')');
   }
   await p.close()}}}
console.log(bad.length?bad.join('\n'):'PROBLEMS none');await b.close()})()
