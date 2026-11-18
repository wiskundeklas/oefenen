const {chromium}=require('playwright');
const T=process.env.SHOTDIR||require('path').join(require('os').tmpdir(),'oefenen-t');require('fs').mkdirSync(T,{recursive:true});
const FILE=process.argv[2],W=+(process.argv[3]||360),PFX=process.argv[4]||'hp';
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:W,height:800},deviceScaleFactor:1});
const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/fonts|ERR_|Failed to load|net::/.test(m.text()))errs.push('CONSOLE '+m.text())});
await p.goto('file://'+FILE);await p.fill('#nmi','Test');await p.click('#go');
const keys=await p.evaluate(()=>Object.keys(HP));console.log('pictures',keys.join(','));
for(let i=0;i<keys.length;i+=3){
  await p.evaluate(ks=>{stage.innerHTML='<div class="card">'+ks.map(k=>'<h3>'+k+'</h3><div class="pic">'+HP[k]()+'</div>').join('')+'</div>'},keys.slice(i,i+3));
  const w=await p.evaluate(()=>document.documentElement.scrollWidth);if(w>W+1)console.log('OVERFLOW',keys.slice(i,i+3),w);
  await p.screenshot({path:T+'/'+PFX+'-pics'+(i/3)+'.png',fullPage:true});
}
console.log('errs',errs);await b.close()})();
