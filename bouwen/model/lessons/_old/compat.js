let DRAG=null;
function drawSvg(q,ang){const V=[100,92],L=72,a1=q.rot;const diff=((ang-a1)%360+360)%360,bt=diff>180?360-diff:diff,near=Math.abs(bt-90)<=3;const h=PT(V,ang,L);
  let s='<line class="ray" x1="100" y1="92" x2="'+pp(PT(V,a1,L)).replace(',','" y2="')+'"/><line class="ray2" x1="100" y1="92" x2="'+pp(h).replace(',','" y2="')+'"/>';
  if(near)s+='<path class="sgn" d="'+sqPath(V,a1,ang,16)+'"/>';else s+='<path class="arc" d="'+arcPath(V,a1,ang,22)+'"/>';
  s+='<circle class="vd" cx="100" cy="92" r="4.5"/><circle class="hd" cx="'+f1(h[0])+'" cy="'+f1(h[1])+'" r="11"/>';return s}
function setupDraw(q){const svg=$('#drsvg');q.ang=q.rot+(q.goal==='stomp'?60:q.goal==='scherp'?150:30);q.ang=(q.ang+360)%360;q.bt=0;
  const upd=()=>{svg.innerHTML=drawSvg(q,q.ang);const diff=((q.ang-q.rot)%360+360)%360;q.bt=diff>180?360-diff:diff};upd();
  const toAng=e=>{const r=svg.getBoundingClientRect(),x=(e.clientX-r.left)/r.width*200-100,y=(e.clientY-r.top)/r.height*184-92;return deg(Math.atan2(-y,x))};
  svg.onpointerdown=e=>{if(S.locked)return;DRAG=1;try{svg.setPointerCapture(e.pointerId)}catch(_){}q.ang=toAng(e);upd()};
  svg.onpointermove=e=>{if(!DRAG||S.locked)return;q.ang=toAng(e);upd()};
  svg.onpointerup=svg.onpointercancel=()=>{DRAG=null};
  q.set=a=>{q.ang=q.rot+a;upd()}}
function setupComp(q){const svg=$('#cpsvg'),v=$('#cpv');q.b=q.cur;const draw=()=>{svg.innerHTML=compassInner({nums:true,rays:[{b:q.b}],handle:q.b});v.textContent='De lijn wijst naar '+q.b+'°'};draw();
  const tb=e=>{const r=svg.getBoundingClientRect(),x=(e.clientX-r.left)/r.width*220-110,y=(e.clientY-r.top)/r.height*220-110;return ((Math.round(deg(Math.atan2(x,-y))/5)*5)%360+360)%360};let drag=0;
  svg.onpointerdown=e=>{if(S.locked)return;drag=1;try{svg.setPointerCapture(e.pointerId)}catch(_){}q.b=tb(e);draw()};
  svg.onpointermove=e=>{if(!drag||S.locked)return;q.b=tb(e);draw()};svg.onpointerup=svg.onpointercancel=()=>{drag=0};
  q.set=b=>{q.b=b;draw()}}
function drawOk(q){const b=q.bt;return q.goal==='recht'?Math.abs(b-90)<=6:q.goal==='scherp'?(b>=12&&b<=76):(b>=104&&b<=168)}

/* ---------- soorten vragen omzetten naar het vaste model ---------- */
const NL3=['recht','scherp','stomp'];
function cv(q){
 if(!q)return q;
 if(q.type==='pick'){const cards=q.cards;q.type='custom';
  q.mount=(box,done)=>{box.innerHTML='<div class="cards">'+cards.map((c,i)=>'<button class="acard" type="button" data-v="'+i+'">'+(c.poly||angleSvg(c.d,c.rot,{arc:true}))+'<b>'+LET4[i]+'</b></button>').join('')+'</div>';
   $$('.acard',box).forEach(b=>b.onclick=()=>{if(S.locked)return;const ok=b.dataset.v===q.ans;if(ok)b.classList.add('ok');else{b.classList.add('no');b.disabled=true}done(ok)})};
  q.reveal=box=>$$('.acard',box).forEach(b=>{if(b.dataset.v===q.ans)b.classList.add('ok')});
 }else if(q.type==='multi'){const cards=q.cards,ans=q.ans;q.type='custom';
  q.mount=(box,done)=>{const sel=[];box.innerHTML=cards.map((c,i)=>'<div class="mrow" data-r="'+i+'">'+angleSvg(c.d,c.rot)+'<div><b>'+LET4[i]+'</b><div class="tri">'+NL3.map(k=>'<button type="button" data-k="'+k+'">'+k[0].toUpperCase()+k.slice(1)+'</button>').join('')+'</div></div></div>').join('')+'<div class="row" style="justify-content:center"><button class="btn" type="button" id="chk2">Controleer</button></div>';
   $$('.mrow',box).forEach(r=>$$('button',r).forEach(b=>b.onclick=()=>{if(S.locked)return;sfx('tap');$$('button',r).forEach(x=>x.classList.remove('sel'));b.classList.add('sel');sel[+r.dataset.r]=b.dataset.k}));
   $('#chk2',box).onclick=()=>{if(S.locked)return;if(sel.filter(Boolean).length<cards.length){fb('tip','Kies bij elke hoek eerst een antwoord.');return}
    const ok=ans.every((a,i)=>sel[i]===a);if(!ok)$$('.mrow',box).forEach((r,i)=>$$('button',r).forEach(b=>{b.classList.remove('no');if(b.dataset.k===sel[i]&&sel[i]!==ans[i])b.classList.add('no')}));
    if(ok)$('#chk2',box).hidden=true;done(ok)}};
  q.reveal=box=>{$$('.mrow',box).forEach((r,i)=>$$('button',r).forEach(b=>{b.classList.remove('no','sel');if(b.dataset.k===ans[i])b.classList.add('ok')}));$('#chk2',box).hidden=true};
 }else if(q.type==='draw'){q.type='custom';
  q.mount=(box,done)=>{box.innerHTML='<svg class="fig dr" id="drsvg" viewBox="0 0 200 184" style="max-width:300px" role="img" aria-label="Sleep de stip om de hoek te maken"></svg><div class="row" style="justify-content:center"><button class="btn" type="button" id="chk2">Controleer</button></div>';
   setupDraw(q);$('#chk2',box).onclick=()=>{if(S.locked)return;const ok=drawOk(q);if(ok)$('#chk2',box).hidden=true;done(ok)}};
  q.reveal=box=>{q.set(q.goal==='recht'?90:q.goal==='scherp'?45:135);$('#chk2',box).hidden=true};
 }else if(q.type==='comp'){q.type='custom';
  q.mount=(box,done)=>{box.innerHTML='<svg class="fig dr" id="cpsvg" viewBox="0 0 220 220" style="max-width:300px" role="img" aria-label="Kompasroos: sleep de stip"></svg><div class="verd" id="cpv"></div><div class="row" style="justify-content:center"><button class="btn" type="button" id="chk2">Controleer</button></div>';
   setupComp(q);$('#chk2',box).onclick=()=>{if(S.locked)return;const ok=cdiff(q.b,q.t)<=7;if(ok)$('#chk2',box).hidden=true;done(ok)}};
  q.reveal=box=>{q.set(q.t);$('#chk2',box).hidden=true};
 }else if(q.type==='order'&&q.cards[0].h===undefined){q.cards.forEach((c,i)=>{c.h='<span style="display:block;width:100%">'+angleSvg(c.d,c.rot)+'<b>'+LET4[i]+'</b></span>'});q.cols=true}
 return q}
const mk=plan=>()=>build(plan,t=>cv(M[t]()));
