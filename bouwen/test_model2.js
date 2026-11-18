const {chromium}=require('playwright');
const T=process.env.SHOTDIR||require('path').join(require('os').tmpdir(),'oefenen-t');require('fs').mkdirSync(T,{recursive:true});
const FILE=process.argv[2],W=+(process.argv[4]||360),RUNS=+(process.argv[3]||2),SHOTS=process.argv[5]||'',PFX=process.argv[6]||'m';
(async()=>{const b=await chromium.launch();const bad=[];
for(let run=0;run<RUNS;run++){
 const p=await b.newPage({viewport:{width:W,height:760},deviceScaleFactor:1});
 p.on('pageerror',e=>bad.push('PAGEERR '+e.message));p.on('console',m=>{if(m.type()==='error'&&!/fonts|ERR_|Failed to load|net::/.test(m.text()))bad.push('CONSOLE '+m.text())});
 await p.addInitScript(()=>{window.speechSynthesis={getVoices:()=>[],addEventListener(){},cancel(){},speak(){}}});
 if(process.env.DYS)await p.addInitScript(()=>localStorage.setItem('dyslexie-stand','1'));
 if(process.env.RSET)await p.addInitScript(s=>localStorage.setItem('dyslexie-liniaal',s),process.env.RSET);
 await p.goto('file://'+FILE);
 await p.fill('#nmi','Test');await p.click('#go');
 const ov=async(tag)=>{const w=await p.evaluate(()=>document.documentElement.scrollWidth);if(w>W+1)bad.push(tag+' overflow '+w)};
 const raw=async(tag)=>{const t=await p.evaluate(()=>document.body.innerText);if(/undefined|NaN|\{\/|\[object|@@/.test(t))bad.push(tag+' RAW: '+(t.match(/.{0,30}(undefined|NaN|\{\/|\[object|@@).{0,30}/)||[''])[0])};
 const navok=async(tag)=>{const n=await p.evaluate(()=>['bMenu','bPrev','bMain'].map(i=>!!document.getElementById(i)));if(n.some(x=>!x))bad.push(tag+' nav mist '+n);
  await p.evaluate(()=>window.dispatchEvent(new Event('scroll')));await p.waitForTimeout(70);
  const hit=await p.evaluate(()=>{const R=e=>e.getBoundingClientRect();const nb=[...document.querySelectorAll('.nav .btn')].map(R);const dk=[document.getElementById('dysbtn'),...document.querySelectorAll('#dysdock button:not([hidden])')].filter(Boolean).map(R);let h=0;for(const a of nb)for(const d of dk){const w=Math.min(a.right,d.right)-Math.max(a.left,d.left),hh=Math.min(a.bottom,d.bottom)-Math.max(a.top,d.top);if(w>2&&hh>2)h++}return h});
  if(hit)bad.push(tag+' knoppen over nav ('+hit+')')};
 const shot=async(n)=>{if(SHOTS&&run===0)await p.screenshot({path:T+'/'+PFX+'-'+n+'.png',fullPage:true})};
 await ov('menu');await shot('menu');
 const NL=await p.evaluate(()=>BR.LV.length);
 for(let l=0;l<NL;l++){
  const ns=await p.evaluate(l=>BR.LV[l].steps.length,l);
  for(let k=0;k<ns;k++){
   await p.evaluate(([l,k])=>explain(l,k),[l,k]);await ov('ex'+l+'.'+k);await raw('ex'+l+'.'+k);await navok('ex'+l+'.'+k);
   for(let r=0;r<8;r++){const bt=await p.$$('#wd button:not([disabled]), #wd .c2, #wd [data-part], #wd [data-i]');if(bt.length){const x=bt[Math.floor(Math.random()*bt.length)];try{await x.click({timeout:800})}catch(e){}}await p.waitForTimeout(40)}
   const sl=await p.$('#wd input[type=range]');if(sl){await sl.evaluate(e=>{e.value=e.min;e.dispatchEvent(new Event('input',{bubbles:true}));e.value=e.max;e.dispatchEvent(new Event('input',{bubbles:true}))})}
   await p.waitForTimeout(1200);
   await ov('exw'+l+'.'+k);await raw('exw'+l+'.'+k);await shot('ex'+l+'-'+k);
  }
  await p.evaluate(l=>startQuiz(l),l);
  const n=await p.evaluate(()=>BR.S().qs.length);
  for(let q=0;q<n;q++){
   await ov('q'+l+'.'+q);await raw('q'+l+'.'+q);await navok('q'+l+'.'+q);
   const info=await p.evaluate(()=>{const S=BR.S(),qq=S.qs[S.i];return {type:qq.type,ans:qq.ans,cards:qq.cards?qq.cards.map(c=>c.r):null,key:qq.key}});
   await shot('q'+l+'-'+q);
   if(info.type==='mc'){
     if(q%3===0){const wr=await p.$('.opt:not([data-v="'+info.ans.replace(/"/g,'\\"')+'"])');if(wr)await wr.click();}
     await p.click('.opt[data-v="'+info.ans.replace(/"/g,'\\"')+'"]');
   }else if(info.type==='custom'){
     const kind=await p.evaluate(()=>document.querySelector('.acard')?'pick':document.querySelector('.mrow')?'multi':document.getElementById('drsvg')?'draw':document.getElementById('cpsvg')?'comp':'?');
     if(kind==='?')bad.push('q'+l+'.'+q+' onbekend custom');
     if(kind==='pick'){if(q%3===0){const w=await p.$('.acard:not([data-v="'+info.ans+'"])');if(w)await w.click()}await p.click('.acard[data-v="'+info.ans+'"]')}
     else if(kind==='multi'){if(q%3===0){await p.click('#chk2')}
       const ans=await p.evaluate(()=>BR.S().qs[BR.S().i].ans);for(let i=0;i<ans.length;i++)await p.click('.mrow[data-r="'+i+'"] button[data-k="'+ans[i]+'"]');await p.click('#chk2')}
     else if(kind==='draw'){if(q%3===0)await p.click('#chk2');await p.evaluate(()=>{const q=BR.S().qs[BR.S().i];q.set(q.goal==='recht'?90:q.goal==='scherp'?45:135)});await p.click('#chk2')}
     else if(kind==='comp'){if(q%3===0)await p.click('#chk2');await p.evaluate(()=>{const q=BR.S().qs[BR.S().i];q.set(q.t)});await p.click('#chk2')}
   }else if(info.type==='order'){
     if(q%2===0){const bad1=info.cards.map((r,i)=>i).sort((a,b)=>info.cards[b]-info.cards[a]);for(const v of bad1)await p.click('#ord > button[data-v="'+v+'"]');await p.waitForTimeout(50)}
     const st=await p.evaluate(()=>BR.S().locked);
     if(!st){const order=info.cards.map((r,i)=>i).sort((a,b)=>info.cards[a]-info.cards[b]);for(const v of order)await p.click('#ord > button[data-v="'+v+'"]')}
   }
   const dis=await p.evaluate(()=>document.getElementById('bMain').disabled);if(dis)bad.push('q'+l+'.'+q+' volgende blijft uit');
   if(q===3&&l===1){await p.click('#bPrev');const t1=await p.evaluate(()=>document.querySelector('.qhead').textContent);if(!new RegExp('Vraag 3 van '+n).test(t1))bad.push('terug fout '+t1);
     await p.click('#bMain');const t2=await p.evaluate(()=>document.querySelector('.qhead').textContent);if(!new RegExp('Vraag 4 van '+n).test(t2))bad.push('vooruit fout '+t2);
     const dd=await p.evaluate(()=>document.getElementById('bMain').disabled);if(dd)bad.push('na terug-vooruit is volgende uit')}
   await p.click('#bMain');
  }
  const done=await p.evaluate(()=>document.body.innerText);if(!/klaar!/.test(done))bad.push('niet klaar l'+l);
  await ov('fin'+l);await navok('fin'+l);await shot('fin'+l);
 }
 // boek
 await p.evaluate(()=>bookMenu());await ov('bookmenu');await navok('bookmenu');await shot('bookmenu');
 const nb=await p.evaluate(()=>BR.BOOK.length);
 for(let k=0;k<nb;k++){
  await p.evaluate(k=>bookEx(BR.BOOK[k].id),k);await ov('book'+k);await raw('book'+k);await navok('book'+k);
  await p.waitForTimeout(150);
  const img=await p.evaluate(()=>{const i=document.querySelector('img.bk');return i&&i.complete&&i.naturalWidth>0});if(!img)bad.push('book'+k+' plaatje laadt niet');
  const ns=await p.evaluate(()=>document.querySelectorAll('#sts .bstp').length);
  const shows=await p.$$('#sts .show');for(const x of shows)await x.click();await ov('bookpic'+k);await raw('bookpic'+k);
  for(let s=0;s<ns;s++)await p.click('#sts .bstp[data-k="'+s+'"] .sh');
  const okTxt=await p.evaluate(()=>/klaar! Goed gedaan/.test(document.body.innerText));if(!okTxt)bad.push('book'+k+' geen klaar-melding');
  await shot('book'+k);
 }
 const db=await p.evaluate(()=>JSON.parse(localStorage.getItem(KEY)));
 if(Object.keys(db.book).length!==nb)bad.push('book DB '+Object.keys(db.book).length);
 if(Object.keys(db.lv).length!==NL)bad.push('lv DB '+Object.keys(db.lv).length);
 // toets
 await p.evaluate(()=>toetsIntro());await ov('toetsintro');await navok('toetsintro');await shot('toetsintro');
 await p.click('#bMain');
const solveC=async(goed)=>{const kind=await p.evaluate(()=>document.querySelector('.acard')?'pick':document.querySelector('.mrow')?'multi':document.getElementById('drsvg')?'draw':document.getElementById('cpsvg')?'comp':'?');
  const ans=await p.evaluate(()=>BR.S().qs[BR.S().i].ans);
  if(kind==='pick'){const sel=goed?'.acard[data-v="'+ans+'"]':'.acard:not([data-v="'+ans+'"])';await p.click(sel)}
  else if(kind==='multi'){for(let i=0;i<ans.length;i++){const k=goed?ans[i]:(ans[i]==='recht'?'scherp':'recht');await p.click('.mrow[data-r="'+i+'"] button[data-k="'+k+'"]')}await p.click('#chk2')}
  else if(kind==='draw'){await p.evaluate(g=>{const q=BR.S().qs[BR.S().i];q.set(g?(q.goal==='recht'?90:q.goal==='scherp'?45:135):(q.goal==='recht'?30:q.goal==='scherp'?150:30))},goed);await p.click('#chk2')}
  else if(kind==='comp'){await p.evaluate(g=>{const q=BR.S().qs[BR.S().i];q.set(g?q.t:(q.t+90)%360)},goed);await p.click('#chk2')}
  else bad.push('toets onbekend custom')};
 const nt=await p.evaluate(()=>BR.S().qs.length);
 for(let q=0;q<nt;q++){
  await ov('t'+q);await raw('t'+q);await navok('t'+q);
  const info=await p.evaluate(()=>{const S=BR.S(),qq=S.qs[S.i];return {type:qq.type,ans:qq.ans,cards:qq.cards?qq.cards.map(c=>c.r):null}});
  if(q===0)await shot('toets0');
  const goed=q%3!==1;
  if(info.type==='mc'){const sel=goed?'.opt[data-v="'+info.ans.replace(/"/g,'\\"')+'"]':'.opt:not([data-v="'+info.ans.replace(/"/g,'\\"')+'"])';await p.click(sel)}
  else if(info.type==='custom'){await solveC(goed)}
  else{const order=info.cards.map((r,i)=>i).sort((a,b)=>goed?info.cards[a]-info.cards[b]:info.cards[b]-info.cards[a]);for(const v of order)await p.click('#ord > button[data-v="'+v+'"]')}
  const tip=await p.evaluate(()=>!!document.querySelector('#fbk .tip'));if(tip)bad.push('toets toont tip');
  if(q===2){await p.click('#bPrev');await p.click('#bMain')}
  if(q===1)await shot('toets1');
  await p.click('#bMain');
 }
 const rt=await p.evaluate(()=>document.body.innerText);if(!/Jouw resultaat/.test(rt)||!/%/.test(rt))bad.push('geen resultaat');
 await ov('toetsdone');await navok('toetsdone');await shot('toetsdone');
 const db2=await p.evaluate(()=>JSON.parse(localStorage.getItem(KEY)));if(!db2.toets||typeof db2.toets.last!=='number')bad.push('toets niet bewaard');
 await p.evaluate(()=>menu());await ov('menu2');await shot('menu2');
 await p.close();
}
console.log(bad.length?'PROBLEMS:\n'+[...new Set(bad)].join('\n'):'PROBLEMS none');await b.close()})();
