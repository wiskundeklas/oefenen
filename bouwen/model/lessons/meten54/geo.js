/* ---------- meetkunde: kompasroos en hoeken ---------- */
const rad=d=>d*Math.PI/180;
const f1=n=>(+n).toFixed(1);
const N360=b=>((b%360)+360)%360;
const RC=[130,130],RR=100;
const PB=(C,b,r)=>[C[0]+r*Math.sin(rad(b)),C[1]-r*Math.cos(rad(b))];
const cls=d=>Math.abs(d-90)<.5?'recht':d<90?'scherp':'stomp';
const ADJ={recht:'rechte',scherp:'scherpe',stomp:'stompe'};
const O3=()=>[O('recht','Recht'),O('scherp','Scherp'),O('stomp','Stomp')];
function roseInner(){const C=RC,R=RR;let s='<circle cx="130" cy="130" r="100" fill="rgba(238,246,255,.55)" stroke="#17324d" stroke-width="2"/><circle cx="130" cy="130" r="72" fill="rgba(255,255,255,.35)" stroke="#9fbbd6" stroke-width="1"/>';
  s+='<line x1="130" y1="58" x2="130" y2="202" stroke="#c4dcf2" stroke-width="1"/><line x1="58" y1="130" x2="202" y2="130" stroke="#c4dcf2" stroke-width="1"/>';
  for(let a=0;a<360;a+=5){const L=a%30===0?14:a%10===0?9:5,p=PB(C,a,R),q=PB(C,a,R-L);s+='<line x1="'+f1(p[0])+'" y1="'+f1(p[1])+'" x2="'+f1(q[0])+'" y2="'+f1(q[1])+'" stroke="#17324d" stroke-width="'+(a%10===0?1.4:.8)+'"/>'}
  for(let a=0;a<360;a+=30){const p=PB(C,a,R-23);s+='<text class="rn" text-anchor="middle" dominant-baseline="middle" x="'+f1(p[0])+'" y="'+f1(p[1])+'">'+a+'</text>'}
  [['N',0],['O',90],['Z',180],['W',270]].forEach(x=>{const p=PB(C,x[1],R-47);s+='<text class="rl" text-anchor="middle" dominant-baseline="middle" x="'+f1(p[0])+'" y="'+f1(p[1])+'">'+x[0]+'</text>'});
  return s}
function arcD(b1,b2,r){let d=N360(b2-b1);const p=PB(RC,b1,r),q=PB(RC,b2,r);return 'M'+f1(p[0])+','+f1(p[1])+' A'+r+' '+r+' 0 '+(d>180?1:0)+' 1 '+f1(q[0])+','+f1(q[1])}
function sqD(b1,b2,s){const p=PB(RC,b1,s),q=PB(RC,b2,s),m=[p[0]+q[0]-RC[0],p[1]+q[1]-RC[1]];return 'M'+f1(p[0])+','+f1(p[1])+' L'+f1(m[0])+','+f1(m[1])+' L'+f1(q[0])+','+f1(q[1])}
/* o: legs [{b,col,w,len}], rot (graden), noRose, hl [{b,t}], arc [b1,b2], arcs [{a:[b1,b2],r,col}], right (vierkantje), name (hoekletter), max, id, rid, aria, ends [{b,t}], full (vaste kijkdoos) */
function roseSvg(o){o=o||{};const nr=!!o.noRose;
  let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;const add=(x,y,m)=>{m=m||0;x0=Math.min(x0,x-m);y0=Math.min(y0,y-m);x1=Math.max(x1,x+m);y1=Math.max(y1,y+m)};
  add(130,130,4);
  let s='';
  if(!nr)s+='<g'+(o.rid?' id="'+o.rid+'"':'')+' style="transform-origin:130px 130px;transform:rotate('+(o.rot||0)+'deg)">'+roseInner()+'</g>';
  (o.legs||[]).forEach(l=>{const L=l.len||(nr?112:120),q=PB(RC,l.b,L);add(q[0],q[1],4);s+='<line x1="130" y1="130" x2="'+f1(q[0])+'" y2="'+f1(q[1])+'" stroke="'+(l.col||'#2a6fdb')+'" stroke-width="'+(l.w||4)+'" stroke-linecap="round"/>'});
  const AR=(a,r,col,w)=>{[a[0],a[1],a[0]+N360(a[1]-a[0])/2].forEach(b=>{const p=PB(RC,b,r);add(p[0],p[1],3)});return '<path d="'+arcD(a[0],a[1],r)+'" fill="none" stroke="'+(col||'#d6336c')+'" stroke-width="'+(w||3)+'"/>'};
  if(o.arc){if(o.right){[o.arc[0],o.arc[1]].forEach(b=>{const p=PB(RC,b,22);add(p[0],p[1],3)});s+='<path d="'+sqD(o.arc[0],o.arc[1],22)+'" fill="none" stroke="#d6336c" stroke-width="3" stroke-linejoin="round"/>'}else s+=AR(o.arc,nr?30:20)}
  (o.arcs||[]).forEach(a=>{s+=AR(a.a,a.r,a.col,a.w)});
  (o.ends||[]).forEach(e=>{const p=PB(RC,e.b,nr?126:126);add(p[0],p[1],10);s+='<text class="bub" text-anchor="middle" dominant-baseline="middle" x="'+f1(p[0])+'" y="'+f1(p[1])+'" style="fill:#17324d">'+e.t+'</text>'});
  (o.hl||[]).forEach(h=>{const p=PB(RC,h.b,RR-4),q=PB(RC,h.b,RR+16);add(q[0],q[1],14);s+='<circle cx="'+f1(p[0])+'" cy="'+f1(p[1])+'" r="6" fill="#ffc533" stroke="#b35f00" stroke-width="2"/><text class="bub" text-anchor="middle" dominant-baseline="middle" x="'+f1(q[0])+'" y="'+f1(q[1])+'">'+h.t+'</text>'});
  if(o.name){const bis=(o.arc?o.arc[0]+N360(o.arc[1]-o.arc[0])/2:0)+180,p=PB(RC,bis,nr?22:34);add(p[0],p[1],8);s+='<text class="lt" text-anchor="middle" dominant-baseline="middle" x="'+f1(p[0])+'" y="'+f1(p[1])+'">'+o.name+'</text>'}
  s+='<circle cx="130" cy="130" r="4.5" fill="#d6336c" stroke="#fff" stroke-width="1.5"/>';
  let vb;
  if(!nr||o.full){vb='-10 -10 280 280'}
  else{x0-=14;y0-=14;x1+=14;y1+=14;let w=x1-x0,h=y1-y0,cx=(x0+x1)/2,cy=(y0+y1)/2;w=Math.max(w,150);h=Math.max(h,110);if(w/h>2)h=w/2;if(h/w>1.25)w=h/1.25;vb=f1(cx-w/2)+' '+f1(cy-h/2)+' '+f1(w)+' '+f1(h)}
  return '<svg class="fig'+(o.dr?' dr':'')+'"'+(o.id?' id="'+o.id+'"':'')+' viewBox="'+vb+'" style="max-width:'+(o.max||300)+'px;max-height:'+(nr?230:320)+'px" role="img" aria-label="'+(o.aria||'Kompasroos met een hoek')+'">'+s+'</svg>'}
const FIGC=svg=>'<div class="center">'+svg+'</div>';
/* aflezen: 0°-lijn (grijs) en blauwe lijn */
const FIGREAD=X=>FIGC(roseSvg({legs:[{b:0,col:'#8aa3bd',w:3},{b:X}],hl:[{b:X,t:'?'}],aria:'Kompasroos. De blauwe lijn wijst naar een getal.'}));
/* meten: roos met 0° op het eerste been */
const FIGMEAS=(b1,d,nm)=>FIGC(roseSvg({legs:[{b:b1},{b:b1+d}],rot:b1,hl:[{b:b1+d,t:'?'}],arc:[b1,b1+d],name:nm,aria:'Kompasroos op een hoek. De 0° ligt op een been.'}));
/* alleen een hoek */
const FIGANG=(b1,d,nm)=>FIGC(roseSvg({noRose:true,legs:[{b:b1},{b:b1+d}],arc:[b1,b1+d],right:Math.abs(d-90)<.5,name:nm,max:240,aria:'Een hoek'}));
const FIGLEG=(b1,d,L1,L2)=>FIGC(roseSvg({noRose:true,legs:[{b:b1},{b:b1+d}],ends:[{b:b1,t:L1},{b:b1+d,t:L2}],arc:[b1,b1+d],max:240,aria:'Een hoek met twee benen'}));
/* veelhoeken */
function polyAng(P,i){const n=P.length,a=P[(i+n-1)%n],b=P[i],c=P[(i+1)%n],u=[a[0]-b[0],a[1]-b[1]],v=[c[0]-b[0],c[1]-b[1]];return Math.acos((u[0]*v[0]+u[1]*v[1])/Math.hypot(...u)/Math.hypot(...v))*180/Math.PI}
function triPts(A,B,C){const base=150,g=180-A-B,b=base*Math.sin(rad(B))/Math.sin(rad(g)),P=[[0,0],[base,0],[b*Math.cos(rad(A)),-b*Math.sin(rad(A))]];
  const xs=P.map(p=>p[0]),ys=P.map(p=>p[1]),w=Math.max(...xs)-Math.min(...xs),h=Math.max(...ys)-Math.min(...ys),k=Math.min(190/w,120/h,1.3);
  return P.map(p=>[(p[0]-Math.min(...xs))*k+15,(p[1]-Math.min(...ys))*k+20])}
const QUAD=[[16,98],[92,118],[185,84],[66,14]];
function polySvg(P,letters,o){o=o||{};let s='<svg class="fig poly" viewBox="-16 -16 252 192" style="max-width:300px" role="img" aria-label="'+(o.aria||'Een figuur met hoeken')+'"><polygon class="pg" points="'+P.map(p=>f1(p[0])+','+f1(p[1])).join(' ')+'"/>';
  const cen=[P.reduce((a,p)=>a+p[0],0)/P.length,P.reduce((a,p)=>a+p[1],0)/P.length];
  P.forEach((p,i)=>{const an=polyAng(P,i),dx=p[0]-cen[0],dy=p[1]-cen[1],L=Math.hypot(dx,dy)||1,tx=p[0]+dx/L*13,ty=p[1]+dy/L*13;
    const sel=o.sel===i;
    if(Math.abs(an-90)<1.5&&o.marks!==false){const n=P.length,a=P[(i+n-1)%n],c=P[(i+1)%n],u=[a[0]-p[0],a[1]-p[1]],v=[c[0]-p[0],c[1]-p[1]],lu=Math.hypot(...u),lv=Math.hypot(...v),s0=9,p1=[p[0]+u[0]/lu*s0,p[1]+u[1]/lu*s0],p3=[p[0]+v[0]/lv*s0,p[1]+v[1]/lv*s0],p2=[p1[0]+p3[0]-p[0],p1[1]+p3[1]-p[1]];s+='<path class="sgn" d="M'+f1(p1[0])+','+f1(p1[1])+' L'+f1(p2[0])+','+f1(p2[1])+' L'+f1(p3[0])+','+f1(p3[1])+'"/>'}
    if(o.tap)s+='<g class="vt" data-v="'+i+'" style="cursor:pointer"><circle class="vtx'+(sel?' sel':'')+'" cx="'+f1(p[0])+'" cy="'+f1(p[1])+'" r="8"/></g>';
    s+='<text class="lt" text-anchor="middle" dominant-baseline="middle" x="'+f1(tx)+'" y="'+f1(ty)+'">'+letters[i]+'</text>'});
  return s+'</svg>'}
