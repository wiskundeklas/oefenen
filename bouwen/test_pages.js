const {chromium}=require('playwright');
const T=process.env.SHOTDIR||require('path').join(require('os').tmpdir(),'oefenen-t');require('fs').mkdirSync(T,{recursive:true});
const DIR=process.env.DIR||require('path').resolve(__dirname,'..');
const W=+(process.argv[2]||360),H=+(process.argv[3]||760),FILES=process.argv.slice(4);
const SET=JSON.parse(process.env.RSET||'{"aan":true,"kleur":"geel","groter":1,"tempo":0}');
(async()=>{const b=await chromium.launch();
 for(const f of FILES){
  const p=await b.newPage({viewport:{width:W,height:H},deviceScaleFactor:1});
  const errs=[];p.on('pageerror',e=>errs.push('PAGEERR '+e.message));p.on('console',m=>{if(m.type()==='error'&&!/fonts|ERR_|Failed to load|net::/.test(m.text()))errs.push('CONSOLE '+m.text())});
  await p.addInitScript(([s])=>{localStorage.setItem('dyslexie-stand','1');localStorage.setItem('dyslexie-liniaal',JSON.stringify(s));window.speechSynthesis={getVoices:()=>[],addEventListener(){},cancel(){},speak(){}}},[SET]);
  await p.goto('file://'+DIR+'/'+f);
  if(await p.$('#nmi')){try{await p.fill('#nmi','Test');await p.click('#go')}catch(e){}}
  await p.waitForTimeout(700);
  const g=async()=>p.evaluate(()=>{const e=id=>document.getElementById(id);const r=x=>{if(!x)return null;const c=x.getBoundingClientRect();return [Math.round(c.top),Math.round(c.height),getComputedStyle(x).display]};return {band:r(e('dysband')),lens:r(e('dyslens')),y:Math.round(scrollY),ow:document.documentElement.scrollWidth}});
  const s0=await g();
  for(let i=0;i<3;i++){await p.keyboard.press('ArrowDown');await p.waitForTimeout(450)}
  const s1=await g();
  const nbtn=await p.evaluate(()=>!!document.getElementById('dysrulbtn'));
  console.log(f.padEnd(28),'ruler btn',nbtn,'start',JSON.stringify(s0),'after3',JSON.stringify(s1),'errs',JSON.stringify(errs));
  await p.screenshot({path:T+'/pg-'+f.replace(/[^a-z0-9]/gi,'_')+'.png'});
  await p.close();
 }
 await b.close()})();
