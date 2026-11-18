const {chromium}=require('playwright');
const T=process.env.SHOTDIR||require('path').join(require('os').tmpdir(),'oefenen-t');require('fs').mkdirSync(T,{recursive:true});
const FILE=process.argv[2],W=+(process.argv[3]||360),H=+(process.argv[4]||760),SC=process.argv[5]||'A',PFX=process.argv[6]||'r';
const SET=JSON.parse(process.env.RSET||'{"aan":true,"kleur":"geel","groter":0,"tempo":0}');
(async()=>{const b=await chromium.launch();
 const p=await b.newPage({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:process.env.TOUCH==='1'});
 const errs=[];p.on('pageerror',e=>errs.push('PAGEERR '+e.message));p.on('console',m=>{if(m.type()==='error'&&!/fonts|ERR_|Failed to load|net::/.test(m.text()))errs.push('CONSOLE '+m.text())});
 await p.addInitScript(([s])=>{window.__dysDebug=1;localStorage.setItem('dyslexie-stand','1');localStorage.setItem('dyslexie-liniaal',JSON.stringify(s));window.speechSynthesis={getVoices:()=>[],addEventListener(){},cancel(){},speak(){}}},[SET]);
 await p.goto('file://'+FILE);
 if(await p.$('#nmi')){await p.fill('#nmi','Test');await p.click('#go')}
 await p.waitForTimeout(500);
 if(process.env.EXPL){await p.evaluate(e=>{const [l,k]=e.split(',').map(Number);explain(l,k)},process.env.EXPL);await p.waitForTimeout(500)}
 const info=async(tag)=>{const o=await p.evaluate(()=>{const g=id=>document.getElementById(id);const r=e=>{if(!e)return null;const c=e.getBoundingClientRect();return {t:Math.round(c.top),h:Math.round(c.height),l:Math.round(c.left),w:Math.round(c.width),d:getComputedStyle(e).display}};
   return {band:r(g('dysband')),lens:r(g('dyslens')),grip:r(g('dysgrip')),dock:r(g('dysdock')),btn:r(g('dysbtn')),y:Math.round(scrollY),ow:document.documentElement.scrollWidth,lensTxt:(g('dyslens')||{}).textContent,bottomVar:document.documentElement.style.getPropertyValue('--dys-b')}});
   console.log(tag,JSON.stringify(o));return o};
 const shot=async(n)=>{await p.screenshot({path:T+'/'+PFX+'-'+n+'.png'})};
 await info('start');await shot('start');
 if(SC==='A'){ // pijltjes
   for(let i=0;i<8;i++){await p.keyboard.press('ArrowDown');await p.waitForTimeout(500);await info('down'+(i+1))}
   await shot('down');
   for(let i=0;i<3;i++){await p.keyboard.press('ArrowUp');await p.waitForTimeout(500);await info('up'+(i+1))}
   await shot('up');
 }
 if(SC==='P'){ // paneel
   await p.click('#dysrulbtn');await p.waitForTimeout(300);await shot('panel0');await info('panel');
   await p.click('#dyspanel .col[data-v="blauw"]');await p.click('#dyspanel [data-a="groter"][data-v="2"]');await p.click('#dyspanel [data-a="tempo"][data-v="2"]');await p.waitForTimeout(300);await shot('panel1');
   console.log('LS',await p.evaluate(()=>localStorage.getItem('dyslexie-liniaal')));
   await p.click('#dyspanel [data-a="klaar"]');await p.waitForTimeout(400);await info('closed');await shot('closed');
 }
 if(SC==='L'){ // lens
   for(let i=0;i<4;i++){await p.keyboard.press('ArrowDown');await p.waitForTimeout(500);await info('down'+(i+1));await shot('lens-'+i)}
   await shot('lens-b');
 }
 if(SC==='Auto'){
   await p.click('#dysplay');for(let i=0;i<8;i++){await p.waitForTimeout(1500);await info('auto'+i)}await shot('auto');
   await p.click('#dysplay');const a=await info('paused');await p.waitForTimeout(2500);const b2=await info('paused2');console.log('PAUSE_OK',JSON.stringify(a.band)===JSON.stringify(b2.band));
 }
 if(SC==='M'){ // muis
   for(const y of [150,260,380,500]){await p.mouse.move(W/2,y);await p.waitForTimeout(350);await info('mouse'+y)}await shot('mouse');
 }
 if(SC==='Q'){ // snel achter elkaar pijltjes indrukken
   const idx=async()=>p.evaluate(()=>{const rows=window.__dysRows();const b=document.getElementById('dysband').getBoundingClientRect();const cy=b.top+b.height/2+scrollY;let best=0,bd=1e9;rows.forEach((r,i)=>{const d=Math.abs((r.top+r.bottom)/2-cy);if(d<bd){bd=d;best=i}});return {best,bd:Math.round(bd),n:rows.length,txt:rows[best].parts.join('').slice(0,30)}});
   const a=await idx();
   for(let i=0;i<10;i++){await p.keyboard.press('ArrowDown');await p.waitForTimeout(40)}
   await p.waitForTimeout(1400);const b2=await idx();console.log('Q start',JSON.stringify(a),'end',JSON.stringify(b2),'verwacht',a.best+10,b2.best===a.best+10?'OK':'FOUT');
   for(let i=0;i<10;i++){await p.keyboard.press('ArrowUp');await p.waitForTimeout(40)}
   await p.waitForTimeout(1400);const c=await idx();console.log('Q terug',JSON.stringify(c),'verwacht',a.best,c.best===a.best?'OK':'FOUT');
 }
 if(SC==='G'){ // handvat slepen, tikken op pijltjes, wiel, tikken op tekst
   const gp=async()=>p.evaluate(()=>{const r=document.getElementById('dysgrip').getBoundingClientRect();return {x:r.left+15,y:r.top,h:r.height}});
   let g=await gp();
   await p.mouse.move(g.x,g.y+g.h/2);await p.mouse.down();await p.mouse.move(g.x,g.y+g.h/2+90,{steps:8});await p.mouse.up();await p.waitForTimeout(400);await info('dragged +90');await shot('dragged');
   g=await gp();await p.mouse.click(g.x,g.y+g.h-12);await p.waitForTimeout(500);await info('tap down chevron');
   g=await gp();await p.mouse.click(g.x,g.y+12);await p.waitForTimeout(500);await info('tap up chevron');
   await p.mouse.move(100,100);await p.mouse.wheel(0,250);await p.waitForTimeout(900);await info('after wheel');await shot('wheel');
   if(process.env.TOUCH==='1'){await p.touchscreen.tap(120,200);await p.waitForTimeout(500);await info('tap 120,200');await shot('tap')}
 }
 const bad=await p.evaluate(()=>{const t=document.body.innerText;return /undefined|NaN|\[object/.test(t)});
 console.log('ERRS',JSON.stringify(errs),'rawtext',bad);
 await b.close()})();
