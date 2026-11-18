/* ---------- klokken en hoeken tekenen ---------- */
const rad=d=>d*Math.PI/180;
const f1=n=>(+n).toFixed(1);
const PT=(x,y,a,r)=>[x+r*Math.cos(rad(a)),y+r*Math.sin(rad(a))];
const uurD=h=>h<=6?30*h:360-30*h;
const arcP=(x,y,a1,a2,r)=>{const p=PT(x,y,a1,r),q=PT(x,y,a2,r);return 'M'+f1(p[0])+','+f1(p[1])+' A'+r+' '+r+' 0 '+((a2-a1)>180?1:0)+' 1 '+f1(q[0])+','+f1(q[1])};
const wedgeP=(x,y,a1,a2,r)=>{const p=PT(x,y,a1,r);return 'M'+x+','+y+' L'+f1(p[0])+','+f1(p[1])+' '+arcP(x,y,a1,a2,r).replace(/^M[^A]*/,'')+' Z'};
/* een klok (120 x 120) met de wijzers van h uur */
function clockG(h,x,lab){let s='<g transform="translate('+(x||0)+',0)"><circle cx="60" cy="60" r="54" fill="#fff" stroke="#17324d" stroke-width="3"/>';
  for(let i=0;i<60;i++){const a=i*6-90,L=i%5===0?5:2.5,p=PT(60,60,a,50),q=PT(60,60,a,50-L);s+='<line x1="'+f1(p[0])+'" y1="'+f1(p[1])+'" x2="'+f1(q[0])+'" y2="'+f1(q[1])+'" stroke="#17324d" stroke-width="'+(i%5===0?1.4:.6)+'"/>'}
  for(let i=1;i<=12;i++){const p=PT(60,60,i*30-90,38);s+='<text x="'+f1(p[0])+'" y="'+f1(p[1])+'" text-anchor="middle" dominant-baseline="central" style="font:600 10px Lexend,sans-serif;fill:#17324d">'+i+'</text>'}
  const ah=h*30-90,a1=h<=6?-90:ah,a2=h<=6?ah:270;
  s+='<path d="'+wedgeP(60,60,a1,a2,24)+'" fill="rgba(214,51,108,.22)"/><path d="'+arcP(60,60,a1,a2,24)+'" fill="none" stroke="#d6336c" stroke-width="3"/>';
  const m=PT(60,60,-90,43),hh=PT(60,60,ah,28);
  s+='<line x1="60" y1="60" x2="'+f1(m[0])+'" y2="'+f1(m[1])+'" stroke="#2a6fdb" stroke-width="3" stroke-linecap="round"/><line x1="60" y1="60" x2="'+f1(hh[0])+'" y2="'+f1(hh[1])+'" stroke="#17324d" stroke-width="5.5" stroke-linecap="round"/><circle cx="60" cy="60" r="4" fill="#d6336c"/>';
  if(lab)s+='<text x="60" y="134" text-anchor="middle" style="font:700 14px Lexend,sans-serif;fill:#17324d">'+lab+'</text>';
  return s+'</g>'}
const clockSvg=(h,max)=>'<svg class="fig" viewBox="0 0 120 120" style="max-width:'+(max||200)+'px" role="img" aria-label="Een klok met wijzers">'+clockG(h)+'</svg>';
const clocksRow=(hs,labs)=>'<svg class="fig" viewBox="0 0 '+(hs.length*128)+' 142" style="max-width:'+Math.min(420,hs.length*140)+'px" role="img" aria-label="Klokken met wijzers">'+hs.map((h,i)=>clockG(h,i*128+4,labs[i])).join('')+'</svg>';
/* een hoek: x,y = hoekpunt, a1 = richting van het eerste been (graden, 0 = rechts, met de klok mee), d = grootte */
function angG(o){const x=o.x,y=o.y,a1=o.a1,a2=o.a1+o.d,L=o.len||40,col=o.col||'#2a6fdb',r=o.r||Math.min(18,L*.45);
  const p=PT(x,y,a1,L),q=PT(x,y,a2,L);let s='';
  if(!o.noArc)s+='<path d="'+wedgeP(x,y,a1,a2,r)+'" fill="'+(o.fill||'rgba(42,111,219,.15)')+'"/><path d="'+arcP(x,y,a1,a2,r)+'" fill="none" stroke="'+(o.arcCol||'#d6336c')+'" stroke-width="'+(o.arcW||2.5)+'"/>';
  s+='<line x1="'+x+'" y1="'+y+'" x2="'+f1(p[0])+'" y2="'+f1(p[1])+'" stroke="'+(o.col1||col)+'" stroke-width="'+(o.w||3.5)+'" stroke-linecap="round"/><line x1="'+x+'" y1="'+y+'" x2="'+f1(q[0])+'" y2="'+f1(q[1])+'" stroke="'+(o.col2||col)+'" stroke-width="'+(o.w||3.5)+'" stroke-linecap="round"/>';
  if(!o.noDot)s+='<circle cx="'+x+'" cy="'+y+'" r="'+(o.dot||3.2)+'" fill="'+(o.dotCol||'#17324d')+'"/>';
  return s}
/* een rij hoeken, elk in een vakje van 100 x 92. items: {d,len,rot,lab} */
function angCell(it,i){const x0=i*100,vx=x0+50,vy=78,a1=-90+(it.rot||0)-it.d/2;
  return angG({x:vx,y:vy,a1,d:it.d,len:it.len||42})+(it.lab?'<text x="'+(x0+6)+'" y="15" style="font:700 14px Lexend,sans-serif;fill:#17324d">∠'+it.lab+'</text>':'')}
const angRow=items=>'<svg class="fig" viewBox="0 0 '+(items.length*100)+' 96" style="max-width:'+Math.min(420,items.length*130)+'px" role="img" aria-label="Hoeken">'+items.map(angCell).join('')+'</svg>';
const angCard=(it)=>'<svg viewBox="0 0 100 96" style="width:100%;max-width:150px;display:block;margin:0 auto" role="img" aria-label="Een hoek">'+angCell(it,0)+'</svg>';
/* grote hoek met namen van de delen */
function angBig(o){o=o||{};const d=o.d||50,a1=-d,len=o.len||Math.min(160,Math.round(108/Math.sin(rad(d)))),x=34,y=120,hi=o.hi||'';
  const p=PT(x,y,0,len),q=PT(x,y,-d,len),ar=PT(x,y,-d/2,44);
  let s='<path d="'+wedgeP(x,y,-d,0,34)+'" fill="rgba(42,111,219,.12)"/>';
  s+='<line x1="'+x+'" y1="'+y+'" x2="'+f1(p[0])+'" y2="'+f1(p[1])+'" stroke="'+(hi==='been'?'#e8870a':'#2a6fdb')+'" stroke-width="'+(hi==='been'?7:4)+'" stroke-linecap="round" data-part="been"/>';
  s+='<line x1="'+x+'" y1="'+y+'" x2="'+f1(q[0])+'" y2="'+f1(q[1])+'" stroke="'+(hi==='been'?'#e8870a':'#2a6fdb')+'" stroke-width="'+(hi==='been'?7:4)+'" stroke-linecap="round" data-part="been"/>';
  s+='<path d="'+arcP(x,y,-d,0,34)+'" fill="none" stroke="'+(hi==='boogje'?'#d6336c':'#d6336c')+'" stroke-width="'+(hi==='boogje'?7:3)+'" data-part="boogje"/>';
  s+='<circle cx="'+x+'" cy="'+y+'" r="'+(hi==='hoekpunt'?10:5)+'" fill="'+(hi==='hoekpunt'?'#ffc533':'#17324d')+'" stroke="'+(hi==='hoekpunt'?'#b35f00':'#fff')+'" stroke-width="2.5" data-part="hoekpunt"/>';
  if(o.letter)s+='<text x="'+(x-10)+'" y="'+(y+22)+'" text-anchor="middle" style="font:700 20px Lexend,sans-serif;fill:#d6336c">'+o.letter+'</text>';
  if(o.tags){const lab={hoekpunt:[x+2,y+30],been:[x+len*.62,y+18],boogje:[x+46,y-14]};if(hi&&lab[hi]){const nm=hi==='been'?'been':hi;s+='<text x="'+f1(lab[hi][0])+'" y="'+f1(lab[hi][1])+'" text-anchor="middle" class="bub">'+nm+'</text>'}}
  return '<svg class="fig" viewBox="0 0 240 150" style="max-width:340px" role="img" aria-label="Een hoek met hoekpunt, benen en boogje">'+s+'</svg>'}
const ang3=(h,ls)=>{ // hoek met drie letters: ls=[hoekpunt,eind1,eind2]
  const d=55,x=60,y=110,len=95,p=PT(x,y,0,len),q=PT(x,y,-d,len);
  return '<svg class="fig" viewBox="0 0 220 140" style="max-width:300px" role="img" aria-label="Een hoek met drie letters">'+angG({x,y,a1:-d,d:d,len,r:30,dot:5})+'<text x="'+(x-4)+'" y="'+(y+26)+'" text-anchor="middle" class="bub">'+ls[0]+'</text><text x="'+f1(p[0]+14)+'" y="'+f1(p[1]+5)+'" text-anchor="middle" class="bub">'+ls[1]+'</text><text x="'+f1(q[0]+6)+'" y="'+f1(q[1]-10)+'" text-anchor="middle" class="bub">'+ls[2]+'</text></svg>'};
