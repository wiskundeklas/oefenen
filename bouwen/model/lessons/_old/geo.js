/* ---------- meetkunde ---------- */
const rad=d=>d*Math.PI/180,deg=r=>r*180/Math.PI;
const dir=a=>[Math.cos(rad(a)),-Math.sin(rad(a))];
const PT=(V,a,r)=>{const d=dir(a);return [V[0]+r*d[0],V[1]+r*d[1]]};
const f1=n=>(+n).toFixed(1),pp=p=>f1(p[0])+','+f1(p[1]);
const cls=d=>Math.abs(d-90)<1?'recht':d<90?'scherp':'stomp';
const NAME={recht:'recht',scherp:'scherp',stomp:'stomp'},ADJ={recht:'rechte',scherp:'scherpe',stomp:'stompe'};
function rndDeg(c){return c==='recht'?90:c==='scherp'?ri(20,64):ri(116,160)}
const rndRot=()=>ri(0,35)*10;
function arcPath(V,a,b,r){let d=((b-a)%360+360)%360;if(d>180){const t=a;a=b;b=t;d=360-d}return 'M'+pp(PT(V,a,r))+' A'+r+' '+r+' 0 0 0 '+pp(PT(V,a+d,r))}
function sqPath(V,a,b,s){const p1=PT(V,a,s),p3=PT(V,b,s),p2=[p1[0]+p3[0]-V[0],p1[1]+p3[1]-V[1]];return 'M'+pp(p1)+' L'+pp(p2)+' L'+pp(p3)}
function angleSvg(d,rot,o){o=o||{};const V=[80,76],L=58,a1=rot,a2=rot+d;let s='';
  if(o.geo){const g=[V,PT(V,a1,74),PT(V,a1+90,74)];s+='<polygon class="geo" points="'+g.map(pp).join(' ')+'"/><path class="sgn" style="stroke:#b88600" d="'+sqPath(V,a1,a1+90,12)+'"/>'}
  s+='<line class="ray" x1="'+f1(V[0])+'" y1="'+f1(V[1])+'" x2="'+pp(PT(V,a1,L)).replace(',','" y2="')+'"/><line class="ray2" x1="'+f1(V[0])+'" y1="'+f1(V[1])+'" x2="'+pp(PT(V,a2,L)).replace(',','" y2="')+'"/>';
  if(o.sq)s+='<path class="sgn" d="'+sqPath(V,a1,a2,15)+'"/>';else if(o.arc!==false)s+='<path class="arc" d="'+arcPath(V,a1,a2,20)+'"/>';
  s+='<circle class="vd" cx="'+V[0]+'" cy="'+V[1]+'" r="4.5"/>';
  return '<svg class="fig ang" viewBox="0 0 160 152" role="img" aria-label="Een hoek">'+s+'</svg>'}
/* een hoek met de hoek van een vel papier (90°) ernaast om mee te vergelijken */
const PAPIER='<svg class="fig ang pap" viewBox="0 0 80 96" role="img" aria-label="De hoek van een vel papier is 90 graden"><rect x="10" y="8" width="60" height="62" rx="2" fill="#fff6d6" stroke="#b88600" stroke-width="2.5"/><path d="M10 56 L24 56 L24 70" fill="none" stroke="#d6336c" stroke-width="3" stroke-linejoin="round"/><text class="lt" x="40" y="86" text-anchor="middle" style="font-size:12px">vel papier</text><text class="lt" x="45" y="34" text-anchor="middle" style="font-size:13px">90°</text></svg>';
const polyR=svg=>'<div class="angpair">'+PAPIER+svg+'</div>';
const angR=(d,rot,o)=>'<div class="angpair">'+PAPIER+angleSvg(d,rot,o)+'</div>';
/* figuren */
const LIB={
 'scherpe driehoek':[[20,150],[180,150],[110,25]],
 'stompe driehoek':[[20,150],[180,150],[100,105]],
 'rechthoekige driehoek':[[30,160],[170,160],[30,40]],
 'rechthoek':[[30,50],[170,50],[170,150],[30,150]],
 'parallellogram':[[60,50],[190,50],[140,150],[10,150]],
 'trapezium':[[20,150],[180,150],[130,50],[20,50]],
 'huisje':[[40,150],[160,150],[160,105],[100,8],[40,105]],
 'zeshoek':[[100,30],[160.6,65],[160.6,135],[100,170],[39.4,135],[39.4,65]]
};
function polyData(name,rot){const base=LIB[name]||EXTRA[name],c=[100,100],r=rad(-rot);
  const pts=base.map(p=>{const x=p[0]-c[0],y=p[1]-c[1];return [c[0]+x*Math.cos(r)-y*Math.sin(r),c[1]+x*Math.sin(r)+y*Math.cos(r)]});
  const n=pts.length,info=pts.map((p,i)=>{const a=pts[(i+n-1)%n],b=pts[(i+1)%n],va=[a[0]-p[0],-(a[1]-p[1])],vb=[b[0]-p[0],-(b[1]-p[1])];
    const A=deg(Math.atan2(va[1],va[0])),B=deg(Math.atan2(vb[1],vb[0]));let d=Math.abs(A-B);if(d>180)d=360-d;return{p,a:A,b:B,d,c:cls(d)}});
  return{name,pts,info}}
const EXTRA={};
const LET='ABCDEF';
function polySvg(name,rot,o){o=o||{};const D=polyData(name,rot),cen=[D.pts.reduce((s,p)=>s+p[0],0)/D.pts.length,D.pts.reduce((s,p)=>s+p[1],0)/D.pts.length];let s='<polygon class="pg" points="'+D.pts.map(pp).join(' ')+'"/>';
  D.info.forEach((v,i)=>{if(o.mark===i)s+='<path class="arc" d="'+arcPath(v.p,v.a,v.b,18)+'"/>';if(o.sqs&&o.sqs.includes(i)&&v.c==='recht')s+='<path class="sgn" d="'+sqPath(v.p,v.a,v.b,13)+'"/>';
    if(o.labels!==false){const dx=v.p[0]-cen[0],dy=v.p[1]-cen[1],l=Math.hypot(dx,dy)||1;s+='<text class="lt" text-anchor="middle" dominant-baseline="middle" x="'+f1(v.p[0]+dx/l*14)+'" y="'+f1(v.p[1]+dy/l*14)+'">'+LET[i]+'</text>'}
    if(o.tap)s+='<circle class="vtx'+(o.sel===i?' sel':'')+'" data-v="'+i+'" cx="'+f1(v.p[0])+'" cy="'+f1(v.p[1])+'" r="9"/>'});
  return {svg:'<svg class="fig poly" viewBox="-10 -10 220 220" role="img" aria-label="Figuur '+esc(name)+'">'+s+'</svg>',D}}
function signSvg(k){const legs='<path d="M12 50 L52 50 M12 50 L12 10" stroke="#17324d" stroke-width="4" stroke-linecap="round" fill="none"/>';
  const m={sq:'<path d="M12 38 L24 38 L24 50" fill="none" stroke="#d6336c" stroke-width="3.5" stroke-linejoin="round"/>',arc:'<path d="M12 32 A18 18 0 0 1 30 50" fill="none" stroke="#e8870a" stroke-width="3.5"/>',cross:'<path d="M17 36 L27 46 M27 36 L17 46" stroke="#c0392b" stroke-width="3.5" stroke-linecap="round"/>',dot:'<circle cx="24" cy="38" r="4" fill="#2a6fdb"/><circle cx="32" cy="38" r="4" fill="#2a6fdb"/>'};
  return '<svg viewBox="0 0 64 60" aria-hidden="true">'+legs+m[k]+'</svg>'}
