/* ---------- knoppen om mee te spelen ---------- */
const UREN=[1,2,3,4,5,6,7,8,9,10,11];
const jaNee=(ok,t)=>'<div class="fb '+(ok?'ok':'no')+'" style="margin:8px 0">'+t+'</div>';
/* 1. stel de klok in */
function wKlok(box){let h=3;
  const paint=()=>{const d=uurD(h);
    box.innerHTML='<p class="note center" style="margin:0">Kies een tijd</p>'+chipsH(UREN,h,'data-h',x=>x+' uur')+clockSvg(h,210)+'<div class="say">Om <b>'+h+' uur</b> maken de wijzers een hoek. Kijk naar het roze boogje. '+(h===6?'Nu is de hoek heel groot: de wijzers wijzen precies van elkaar af.':(d<=60?'De hoek is klein.':d<=120?'De hoek is middelgroot.':'De hoek is groot.'))+'</div>';
    $$('[data-h]',box).forEach(b=>b.onclick=()=>{sfx('tap');h=+b.dataset.h;paint()})};paint()}
/* 2. tik op de klok met de grootste (of kleinste) hoek */
function wGroot(box){let hs,mode,res=null;
  const nieuw=()=>{let a,b;do{a=pick(UREN);b=pick(UREN)}while(uurD(a)===uurD(b));hs=[a,b];mode=pick(['grootste','kleinste']);res=null;paint()};
  function paint(){const want=hs.slice().sort((x,y)=>uurD(x)-uurD(y))[mode==='grootste'?1:0];
    box.innerHTML='<div class="verd" style="font-size:1.1rem">Tik op de klok met de <span class="kw">'+mode+'</span> hoek.</div><div class="two" style="display:grid;grid-template-columns:1fr 1fr;gap:10px">'+hs.map((h,i)=>'<button type="button" class="acard'+(res===i?(res>=0&&hs[i]===want?' good':' bad'):'')+'" data-i="'+i+'" style="border:3px solid '+(res===null?'var(--line)':(hs[res]===want&&hs[i]===want)?'var(--good)':(res===i&&hs[i]!==want)?'var(--oops)':'var(--line)')+';border-radius:14px;background:#fff;padding:6px;cursor:pointer">'+clockSvg(h,150)+'</button>').join('')+'</div><div id="gm"></div>'+(res!==null&&hs[res]===want?'<div class="row" style="justify-content:center"><button class="btn alt small" id="gn" type="button">Nog een keer</button></div>':'');
    if(res!==null)$('#gm',box).innerHTML=hs[res]===want?jaNee(1,'Goed! Bij '+want+' uur is het boogje '+(mode==='grootste'?'groter':'kleiner')+'.'):jaNee(0,'Nog niet goed. Kijk goed naar het roze boogje.');
    $$('[data-i]',box).forEach(b=>b.onclick=()=>{if(res!==null&&hs[res]===want)return;res=+b.dataset.i;sfx(hs[res]===want?'ok':'no');paint()});
    const g=$('#gn',box);if(g)g.onclick=()=>{sfx('tap');nieuw()}}
  nieuw()}
/* 3. twee keer zo groot */
const DUB=[[1,2],[2,4],[3,6]];
function wDubbel(box){let k=1;
  const paint=()=>{const [a,b]=DUB[k];
    box.innerHTML='<p class="note center" style="margin:0">Kies een tijd</p>'+chipsH(DUB.map((x,i)=>i),k,'data-k',i=>DUB[i][0]+' uur')+'<div style="display:grid;grid-template-columns:1fr auto 1fr;gap:6px;align-items:center"><div>'+clockSvg(a,150)+'<div class="center"><b>'+a+' uur</b></div></div><div class="verd" style="font-size:1.4rem">× 2<br>→</div><div>'+clockSvg(b,150)+'<div class="center"><b>'+b+' uur</b></div></div></div><div class="say">Om '+a+' uur is de hoek <b>'+uurD(a)/30+' uren</b> groot. Twee keer zo groot is <b>'+uurD(b)/30+' uren</b>. Dus: '+b+' uur.</div>';
    $$('[data-k]',box).forEach(x=>x.onclick=()=>{sfx('tap');k=+x.dataset.k;paint()})};paint()}
/* 4. delen van een hoek */
function wDelen(box){let hi='';
  const T={hoekpunt:'Het <b>hoekpunt</b> is het punt waar de twee benen elkaar raken.',been:'Een hoek heeft twee <b>benen</b>. Dit zijn de lijnen van de hoek.',boogje:'Het <b>boogje</b> laat de hoek zien. Het staat tussen de twee benen.','':'Tik op een knop. Of tik op de hoek zelf.'};
  const paint=()=>{box.innerHTML='<div id="ab">'+angBig({d:50,hi,tags:true})+'</div><div class="say" id="at">'+T[hi]+'</div>'+chipsH(['hoekpunt','been','boogje'],hi,'data-p',x=>x[0].toUpperCase()+x.slice(1));
    const go=p=>{sfx('tap');hi=p;paint()};$$('[data-p]',box).forEach(b=>b.onclick=()=>go(b.dataset.p));$$('[data-part]',box).forEach(e=>{e.style.cursor='pointer';e.onclick=()=>go(e.dataset.part)})};paint()}
/* 5. ∠ en de letter */
function wTeken(box){let L='P';
  const paint=()=>{box.innerHTML='<p class="note center" style="margin:0">Kies een letter</p>'+chipsH(['P','Q','R','S','T'],L,'data-l')+angBig({d:50,letter:L})+'<div class="verd">Je schrijft: <span class="kw">∠'+L+'</span></div><div class="say">Je zegt: <b>hoek '+L+'</b>. De letter <b>'+L+'</b> staat bij het hoekpunt.</div>';
    $$('[data-l]',box).forEach(b=>b.onclick=()=>{sfx('tap');L=b.dataset.l;paint()})};paint()}
/* 6. langere benen */
function wLanger(box){let len=60;const D=40,x=26,y=116;
  const fig=()=>'<svg class="fig" viewBox="0 0 240 130" style="max-width:340px" role="img" aria-label="Een hoek met benen die langer of korter worden"><g opacity=".4">'+angG({x,y,a1:-D,d:D,len:50,col:'#17324d',noArc:true,noDot:true,w:2})+'</g>'+angG({x,y,a1:-D,d:D,len,r:26,w:4.5})+'</svg>';
  const txt=()=>'De benen zijn nu <b>'+(len<55?'korter':len>65?'langer':'even lang')+'</b>. Het roze boogje blijft <b>even groot</b>. De hoek verandert niet!';
  box.innerHTML='<div id="lgf"></div><input class="slider" id="sl" type="range" min="40" max="170" step="5" value="'+len+'" aria-label="Maak de benen langer of korter"><p class="note center" style="margin:0">Schuif en maak de benen langer of korter.</p><div class="say" id="lgt"></div>';
  const upd=()=>{$('#lgf',box).innerHTML=fig();$('#lgt',box).innerHTML=txt()};
  $('#sl',box).oninput=e=>{len=+e.target.value;upd()};upd()}
/* 7. leg de ene hoek op de andere */
const PAREN=[{A:50,B:80,t:'groter'},{A:75,B:40,t:'kleiner'},{A:60,B:60,t:'even groot'}];
function wLeg(box){let k=0,st=0,raf=0;
  const A0={x:46,y:108,a1:-120},B0={x:190,y:108,a1:-165};
  function fig(tt){const P=PAREN[k],bx=B0.x+(A0.x-B0.x)*tt,by=B0.y+(A0.y-B0.y)*tt,ba=B0.a1+(A0.a1-B0.a1)*tt;
    return '<svg class="fig" viewBox="0 0 250 130" style="max-width:360px" role="img" aria-label="Twee hoeken die je op elkaar legt">'
     +angG({x:A0.x,y:A0.y,a1:A0.a1,d:P.A,len:62,col:'#2a6fdb',fill:'rgba(42,111,219,.22)',r:34,w:4})
     +angG({x:bx,y:by,a1:ba,d:P.B,len:62,col:'#e8870a',fill:'rgba(232,135,10,.28)',arcCol:'#e8870a',r:26,w:3.5,noDot:true})
     +'<text x="'+(tt<1?24:24)+'" y="126" style="font:700 14px Lexend,sans-serif;fill:#2a6fdb">∠A</text><text x="'+f1(tt<1?B0.x-20:B0.x+8)+'" y="126" style="font:700 14px Lexend,sans-serif;fill:#e8870a">∠B</text></svg>'}
  function msg(){const P=PAREN[k];if(st===0)return 'Dit zijn ∠A (blauw) en ∠B (oranje). Welke hoek is groter? Leg ∠B op ∠A. Dan zie je het.';
    return P.t==='even groot'?'De benen liggen precies op elkaar. ∠B is <b>even groot</b> als ∠A.':P.t==='kleiner'?'∠B ligt <b>binnen</b> ∠A. Dus ∠B is <b>kleiner</b> dan ∠A.':'∠B steekt <b>buiten</b> ∠A. Dus ∠B is <b>groter</b> dan ∠A.'}
  function paint(tt){box.innerHTML='<p class="note center" style="margin:0">Kies twee hoeken</p>'+chipsH([0,1,2],k,'data-k',i=>'Paar '+(i+1))+'<div id="lf">'+fig(tt==null?(st?1:0):tt)+'</div><div class="say" id="lm">'+msg()+'</div><div class="row" style="justify-content:center"><button class="btn" id="lb" type="button">'+(st?'Nog een keer':'Leg ∠B op ∠A ▶')+'</button></div>';
    $$('[data-k]',box).forEach(b=>b.onclick=()=>{cancelAnimationFrame(raf);sfx('tap');k=+b.dataset.k;st=0;paint()});
    $('#lb',box).onclick=()=>{sfx('tap');if(st){st=0;paint();return}run()}}
  function run(){const t0=performance.now(),dur=1000;const step=now=>{const t=Math.min(1,(now-t0)/dur),e=t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;const f=$('#lf',box);if(!f)return;f.innerHTML=fig(e);if(t<1)raf=requestAnimationFrame(step);else{st=1;sfx('ok');paint(1)}};raf=requestAnimationFrame(step)}
  paint()}
/* 8. van klein naar groot */
function wSorteer(box){let items,next,fout=0;
  const nieuw=()=>{let ds;do{ds=shuffle([25,40,55,70,85,100,115,130,145]).slice(0,4)}while(false);ds=ds.sort((a,b)=>a-b);const L=shuffle(['A','B','C','D']);items=shuffle(ds.map((d,i)=>({d,lab:L[i],len:pick([32,38,44]),rot:ri(-25,25),r:i})));next=0;fout=0;paint()};
  function paint(){const done=next>=items.length;
    box.innerHTML='<div class="verd" style="font-size:1.1rem">Tik de hoeken aan van <span class="kw">klein naar groot</span>.</div><div class="two" style="display:grid;grid-template-columns:1fr 1fr;gap:10px">'+items.map((it,i)=>{const got=it.r<next;return '<button type="button" data-i="'+i+'" style="position:relative;border:3px solid '+(got?'var(--good)':'var(--line)')+';border-radius:14px;background:'+(got?'var(--goodbg)':'#fff')+';padding:6px;cursor:pointer">'+angCard({d:it.d,len:it.len,rot:it.rot,lab:it.lab})+(got?'<span class="nb" style="position:absolute;top:6px;right:6px;margin:0">'+(it.r+1)+'</span>':'')+'</button>'}).join('')+'</div><div id="sm2"></div>'+(done?'<div class="row" style="justify-content:center"><button class="btn alt small" id="sn2" type="button">Nieuwe hoeken</button></div>':'');
    $('#sm2',box).innerHTML=done?jaNee(1,'Goed! Van klein naar groot: '+items.slice().sort((a,b)=>a.r-b.r).map(x=>'∠'+x.lab).join(', ')+'.'):(fout?jaNee(0,'Nog niet. Zoek de kleinste hoek die nog over is. Kijk niet naar de lengte van de benen.'):'');
    $$('[data-i]',box).forEach(b=>b.onclick=()=>{if(next>=items.length)return;const it=items[+b.dataset.i];if(it.r<next)return;if(it.r===next){next++;fout=0;sfx('ok')}else{fout=1;sfx('no')}paint()});
    const n=$('#sn2',box);if(n)n.onclick=()=>{sfx('tap');nieuw()}}
  nieuw()}
const WID={klok:wKlok,groot:wGroot,dubbel:wDubbel,delen:wDelen,teken:wTeken,langer:wLanger,leg:wLeg,sorteer:wSorteer};
