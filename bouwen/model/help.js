/* ---------- hulpplaatjes bij de boekopdrachten ("Laat zien") ----------
   Elke functie geeft een stukje HTML met een plaatje en korte uitleg.
   Gebruik in een boekstap:  {t:'...', z:'...', p:'pap'}  */
const HP=(()=>{
  const INK='#17324d',BLUE='#2a6fdb',OR='#e8870a',RO='#d6336c',SOFT='#4b6580',YEL='#c99a00';
  const rd=d=>d*Math.PI/180,F=n=>(+n).toFixed(1);
  /* punt vanuit c, hoek a (graden, tegen de klok in vanaf rechts), afstand r */
  const pt=(c,a,r)=>[c[0]+r*Math.cos(rd(a)),c[1]-r*Math.sin(rd(a))];
  /* punt op een kompasroos: b = graden met de klok mee vanaf boven */
  const pb=(c,b,r)=>[c[0]+r*Math.sin(rd(b)),c[1]-r*Math.cos(rd(b))];
  const ln=(p,q,st,w,ex)=>'<line x1="'+F(p[0])+'" y1="'+F(p[1])+'" x2="'+F(q[0])+'" y2="'+F(q[1])+'" stroke="'+st+'" stroke-width="'+(w||3)+'" stroke-linecap="round"'+(ex||'')+'/>';
  const tx=(p,t,c,an)=>'<text class="'+(c||'hp-t')+'" x="'+F(p[0])+'" y="'+F(p[1])+'" text-anchor="'+(an||'middle')+'" dominant-baseline="middle">'+t+'</text>';
  const dot=(p,r,fill,st)=>'<circle cx="'+F(p[0])+'" cy="'+F(p[1])+'" r="'+r+'" fill="'+fill+'"'+(st?' stroke="'+st+'" stroke-width="2"':'')+'/>';
  /* boogje tussen twee richtingen (tegen de klok in, a1<a2) */
  const arc=(c,a1,a2,r,st,w)=>{const p=pt(c,a1,r),q=pt(c,a2,r);return '<path d="M'+F(p[0])+','+F(p[1])+' A'+r+' '+r+' 0 '+(Math.abs(a2-a1)>180?1:0)+' 0 '+F(q[0])+','+F(q[1])+'" fill="none" stroke="'+st+'" stroke-width="'+(w||3)+'" stroke-linecap="round"/>'};
  /* hoekje voor een rechte hoek */
  const sq=(c,a1,a2,s,st)=>{const p=pt(c,a1,s),q=pt(c,a2,s),m=[p[0]+q[0]-c[0],p[1]+q[1]-c[1]];return '<path d="M'+F(p[0])+','+F(p[1])+' L'+F(m[0])+','+F(m[1])+' L'+F(q[0])+','+F(q[1])+'" fill="none" stroke="'+(st||RO)+'" stroke-width="2.5" stroke-linejoin="round"/>'};
  const svg=(vb,body,alt,mw)=>'<svg class="fig" viewBox="'+vb+'" style="max-width:'+(mw||280)+'px" role="img" aria-label="'+alt+'">'+body+'</svg>';
  const num=(p,n)=>'<circle cx="'+F(p[0])+'" cy="'+F(p[1])+'" r="11" fill="'+OR+'" stroke="#fff" stroke-width="2"/>'+tx([p[0],p[1]+.5],n,'hp-n');
  const row=(s,t)=>'<div class="hrow"><div class="hsv">'+s+'</div><div class="htx">'+t+'</div></div>';
  const W=(c,t)=>'<span class="hw hw-'+c+'">'+t+'</span>';

  /* pijl met de klok mee (van b1 naar b2, kompasroos-graden) */
  function arc2(c,b1,b2,r){const p=pb(c,b1,r),q=pb(c,b2,r),t=rd(b2),u=[Math.cos(t),Math.sin(t)];
    const a1=[q[0]-u[0]*10-u[1]*5,q[1]-u[1]*10+u[0]*5],a2=[q[0]-u[0]*10+u[1]*5,q[1]-u[1]*10-u[0]*5];
    return '<path d="M'+F(p[0])+','+F(p[1])+' A'+r+' '+r+' 0 0 1 '+F(q[0])+','+F(q[1])+'" fill="none" stroke="'+OR+'" stroke-width="3" stroke-linecap="round"/><path d="M'+F(a1[0])+','+F(a1[1])+' L'+F(q[0])+','+F(q[1])+' L'+F(a2[0])+','+F(a2[1])+'" fill="none" stroke="'+OR+'" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>'}

  /* ---- kompasroos (eenvoudig) ---- */
  function rose(c,R){let s='<circle cx="'+c[0]+'" cy="'+c[1]+'" r="'+R+'" fill="rgba(238,246,255,.7)" stroke="'+INK+'" stroke-width="2"/>';
    for(let a=0;a<360;a+=10){const L=a%30===0?11:6;s+=ln(pb(c,a,R),pb(c,a,R-L),INK,a%30===0?1.5:.8)}
    for(let a=0;a<360;a+=30)s+=tx(pb(c,a,R-23),a,'hp-s');
    return s}

  /* ---- klok ---- */
  function clock(c,R,h,m,on){let s='<circle cx="'+c[0]+'" cy="'+c[1]+'" r="'+R+'" fill="#fff" stroke="'+INK+'" stroke-width="3"/>';
    for(let i=1;i<=12;i++)s+=tx(pb(c,i*30,R-15),i,'hp-s');
    const ha=(h%12)*30+m*.5,ma=m*6;
    if(on){const d=((ma-ha)+360)%360,st=d<=180?ha:ma,sp=d<=180?d:360-d,p=pb(c,st,28),q=pb(c,st+sp,28);
      s+='<path d="M'+F(p[0])+','+F(p[1])+' A28 28 0 0 1 '+F(q[0])+','+F(q[1])+'" fill="none" stroke="'+OR+'" stroke-width="4" stroke-linecap="round"/>'}
    return s+ln(c,pb(c,ha,R*.5),BLUE,6)+ln(c,pb(c,ma,R*.76),RO,3.5)+dot(c,4.5,INK)}
  const CK=(h,m,on,alt)=>svg('0 0 200 200',clock([100,100],92,h,m,on),alt,150);

  const P={};

  /* hoek vergelijken met de rechte hoek van je geodriehoek of papier */
  P.pap=()=>{const V=[52,124];
    const one=(th,title,res,cls)=>{
      const tri='<polygon points="'+V+' '+(V[0]+122)+','+V[1]+' '+V[0]+','+(V[1]-118)+'" fill="rgba(255,197,51,.34)" stroke="'+YEL+'" stroke-width="2" stroke-dasharray="6 4"/>';
      const b=tri+sq(V,0,90,15)+ln(V,[V[0]+128,V[1]],BLUE,4)+ln(V,pt(V,th,76),BLUE,4)+arc(V,0,th,34,OR,3)+dot(V,4.5,INK);
      return row(svg('0 0 190 140',b,'Een hoek en een geodriehoek',190),'<b>'+title+'</b><br>De hoek is '+W(cls,res)+'.')};
    return '<p class="hcap">De gele driehoek is je geodriehoek. Een papiertje met een hoek mag ook. Leg de <b>rechte hoek</b> van je geodriehoek in de hoek, <b>hoekpunt op hoekpunt</b>.</p>'
      +one(90,'Past precies','recht','r')+one(52,'Past erin (kleiner)','scherp','s')+one(128,'Steekt eruit (groter)','stomp','t')};

  /* een hoek meten in 4 stappen */
  P.meet4=()=>{const c=[150,148],R=104;
    let s=rose(c,R)+ln(c,pb(c,0,R+6),BLUE,5)+ln(c,pb(c,40,R+6),BLUE,5)+arc2(c,4,36,52)+dot(c,5,RO,'#fff')+dot(pb(c,40,R-3),6,'#ffc533','#b35f00')
      +num([c[0]+24,c[1]+26],1)+num(pb(c,-24,64),2)+num(pb(c,20,52),3)+num(pb(c,40,R+26),4);
    return svg('0 0 300 290',s,'Een kompasroos op een hoek, met vier stappen',300)
      +'<ol class="h4"><li>Het <b>midden</b> van de roos komt op het <b>hoekpunt</b>.</li><li>De lijn van <b>0°</b> ligt op één been.</li><li>Draai <b>met de klok mee</b> naar het andere been.</li><li><b>Lees</b> het getal af bij het andere been.</li></ol>'
      +'<p class="hcap">Staat het andere been bij een getal <b>boven 180°</b>? Dan lag 0° op het verkeerde been. Draai de roos om en leg 0° op het andere been.</p>'};

  /* getal aflezen */
  P.lees=()=>{const c=[150,140],R=104;
    const s=rose(c,R)+ln(c,pb(c,0,R+6),'#8aa3bd',4)+ln(c,pb(c,110,R+6),BLUE,5)+dot(c,5,RO,'#fff')+dot(pb(c,110,R-3),6,'#ffc533','#b35f00')+tx(pb(c,110,R+24),'?','hp-q');
    return svg('0 0 300 280',s,'Kompasroos: de blauwe lijn wijst naar een getal',300)
      +'<ol class="h4"><li>Volg het been tot de <b>rand</b> van de kompasroos.</li><li>Lees het <b>getal</b> bij de lijn.</li><li>Zit het been tussen twee getallen? <b>Tel de streepjes</b> vanaf het laatste getal.</li></ol>'};

  /* de O (90°) als grens tussen scherp en stomp */
  P.roos90=()=>{const c=[150,140],R=104;
    const s=rose(c,R)
      +'<path d="M'+c+' L'+pb(c,0,R)+' A'+R+' '+R+' 0 0 1 '+pb(c,90,R)+' Z" fill="rgba(255,197,51,.4)"/>'
      +'<path d="M'+c+' L'+pb(c,90,R)+' A'+R+' '+R+' 0 0 1 '+pb(c,180,R)+' Z" fill="rgba(42,111,219,.22)"/>'
      +ln(c,pb(c,0,R),INK,3)+ln(c,pb(c,90,R),RO,3,' stroke-dasharray="7 5"')+dot(c,5,RO,'#fff')
      +tx(pb(c,45,50),'scherp','hp-t')+tx(pb(c,135,50),'stomp','hp-t')+tx(pb(c,90,R+17),'90°','hp-t');
    return svg('0 0 300 280',s,'Kompasroos met scherp en stomp',300)
      +'<p class="hcap">Het been ligt <b>boven</b> de lijn naar 90°? Dan is de hoek <b>scherp</b>.<br>Precies <b>op</b> die lijn? Dan is de hoek <b>recht</b>.<br><b>Onder</b> die lijn? Dan is de hoek <b>stomp</b>.</p>'};

  /* benen verlengen */
  P.verleng=()=>{const V=[30,128],e=pt(V,100,112);
    const s='<path d="M'+(V[0]+112)+','+V[1]+' A112 112 0 0 0 '+F(e[0])+','+F(e[1])+'" fill="none" stroke="'+SOFT+'" stroke-width="2" stroke-dasharray="3 4"/>'
      +ln(V,pt(V,0,176),OR,4,' stroke-dasharray="7 6"')+ln(V,pt(V,50,160),OR,4,' stroke-dasharray="7 6"')
      +ln(V,pt(V,0,60),BLUE,5)+ln(V,pt(V,50,60),BLUE,5)+arc(V,0,50,26,RO,3)+dot(V,4.5,INK)
      +tx([150,24],'rand van de kompasroos','hp-s','start');
    return svg('0 0 280 150',s,'Een hoek met korte benen en verlengde benen',280)
      +'<p class="hcap"><b style="color:'+BLUE+'">Blauw</b>: de benen uit je boek (te kort).<br>De stippellijn is de rand van je kompasroos.<br><b style="color:'+OR+'">Oranje</b>: wat je er met je liniaal bij tekent.<br>De hoek blijft <b>even groot</b>.</p>'};

  /* scherp / recht / stomp op een lijn van 0° tot 180° */
  P.lijn180=()=>{const x0=24,x1=276,k=(x1-x0)/180,X=a=>x0+a*k,y=100;
    const ic=(cx,th,sg)=>{const V=[cx+(th>90?16:-16),y-12];return ln(V,pt(V,0,40),BLUE,3.5)+ln(V,pt(V,th,40),BLUE,3.5)+(sg?sq(V,0,90,12):arc(V,0,th,16,OR,2.5))+dot(V,3.5,INK)};
    const s='<rect x="'+X(0)+'" y="'+y+'" width="'+(90*k)+'" height="28" fill="rgba(255,197,51,.5)"/><rect x="'+X(90)+'" y="'+y+'" width="'+(90*k)+'" height="28" fill="rgba(42,111,219,.28)"/>'
      +[0,90,180].map(a=>ln([X(a),y-3],[X(a),y+34],INK,2.5)+tx([X(a),y+48],a+'°','hp-t')).join('')
      +tx([X(45),y+14],'scherp','hp-t')+tx([X(135),y+14],'stomp','hp-t')+tx([X(90),y+66],'recht','hp-t')
      +ic(X(45),50)+ic(X(90),90,1)+ic(X(135),128);
    return svg('0 0 300 176',s,'Scherp, recht en stomp op een lijn van 0 tot 180 graden',300)
      +'<p class="hcap"><b>Scherp</b>: tussen 0° en 90°.<br><b>Recht</b>: precies 90°.<br><b>Stomp</b>: tussen 90° en 180°.</p>'};

  /* windroos met alleen letters */
  P.windroos=()=>{const c=[140,128],R=84;let s='<circle cx="'+c[0]+'" cy="'+c[1]+'" r="'+R+'" fill="rgba(238,246,255,.7)" stroke="'+INK+'" stroke-width="2"/>';
    ['N','NO','O','ZO','Z','ZW','W','NW'].forEach((n,i)=>{const a=i*45,main=i%2===0;s+=ln(c,pb(c,a,R),main?INK:'#8aa3bd',main?2.5:1.5)+tx(pb(c,a,R+17),n,main?'hp-t':'hp-s')});
    s+=arc2(c,8,82,40)+dot(c,4.5,RO,'#fff');
    return svg('0 0 280 256',s,'Een windroos met N, NO, O, ZO, Z, ZW, W en NW',280)
      +'<p class="hcap">Je draait <b>met de klok mee</b>: N, NO, O, ZO, Z, ZW, W, NW.<br>Van N naar O is een <b>kwart slag</b>. NO ligt precies <b>halverwege</b> N en O.</p>'};

  /* hoekpunt en benen */
  P.hoekpunt=()=>{const V=[56,118];
    const s=ln(V,pt(V,0,190),BLUE,5)+ln(V,pt(V,42,170),BLUE,5)+arc(V,0,42,40,OR,3)+dot(V,7,RO,'#fff')
      +tx([V[0]-8,V[1]+22],'hoekpunt','hp-t','start')+tx([V[0]+150,V[1]+18],'been','hp-t')+tx([V[0]+146,V[1]-96],'been','hp-t')+tx([V[0]+50,V[1]-12],'boogje','hp-s','start');
    return svg('0 0 260 150',s,'Een hoek met hoekpunt, twee benen en een boogje',260)
      +'<p class="hcap">Het <b>hoekpunt</b> is het punt waar de twee <b>benen</b> elkaar raken. Het <b>boogje</b> laat zien welke hoek bedoeld is.</p>'};

  /* klokken */
  P.klok=()=>CK(4,0,0,'Een klok op vier uur')
    +'<p class="hcap"><b style="color:'+BLUE+'">Blauw</b>: de korte wijzer wijst het <b>uur</b> aan.<br><b style="color:'+RO+'">Rood</b>: de lange wijzer wijst de <b>minuten</b> aan.<br>Staat de lange wijzer op de 12? Dan is het een <b>heel uur</b>.</p>';
  P.klokslag=()=>'<div class="h2c">'+CK(2,0,0,'Klok op twee uur')+CK(8,0,0,'Klok op acht uur')+'</div>'
    +'<p class="hcap">Voorbeeld: de korte wijzer draait een <b>halve slag</b> van 2 naar 8.<br>Een halve slag is <b>6 uur</b> verder. Een hele slag is 12 uur.<br>Gaat het voorbij de 12? Dan begin je weer bij 1.</p>';
  P.klokhoek=()=>'<div class="h2c">'+CK(4,0,1,'Klok met een boogje tussen de wijzers')+CK(10,10,1,'Klok met een boogje tussen de wijzers')+'</div>'
    +'<p class="hcap">Het <b>boogje</b> zit tussen de twee wijzers. Dat is de hoek.<br>Staan de wijzers <b>dicht bij elkaar</b>? Dan is de hoek klein.<br>Staan ze <b>ver uit elkaar</b>? Dan is de hoek groot.</p>';
  P.klokdubbel=()=>'<div class="h2c">'+CK(1,0,1,'Klok op één uur')+CK(2,0,1,'Klok op twee uur')+'</div>'
    +'<p class="hcap">Voorbeeld: bij <b>1 uur</b> zit er <b>1 stap</b> tussen de wijzers (12 → 1).<br>Twee keer zo groot is <b>2 stappen</b>: dan staat de korte wijzer op de 2.<br>Tel zo ook bij jouw klok de stappen van de 12 tot de korte wijzer.</p>';

  /* overtrekpapier */
  P.overtrek=()=>{const V=[40,124];
    const one=(tA,tB,title,res,cls)=>{
      const A='<path d="M'+V+' L'+pt(V,0,122)+' A122 122 0 0 0 '+pt(V,tA,122)+' Z" fill="rgba(255,197,51,.36)" stroke="'+YEL+'" stroke-width="2" stroke-dasharray="6 4"/>';
      const b=A+ln(V,pt(V,0,130),BLUE,4)+ln(V,pt(V,tB,104),BLUE,4)+dot(V,4.5,INK);
      return row(svg('0 0 190 140',b,'Een hoek en een stuk overtrekpapier',190),'<b>'+title+'</b><br>∠B is '+W(cls,res)+' dan ∠A.')};
    return '<ol class="h4"><li>Trek ∠A over op overtrekpapier (het gele stuk).</li><li>Leg het op ∠B: <b>hoekpunt op hoekpunt</b>, <b>één been op één been</b>.</li><li>Kijk naar het <b>andere been</b> van ∠B.</li></ol>'
      +one(72,40,'Ligt in het papier','kleiner','s')+one(50,100,'Steekt eruit','groter','t')};

  /* tekentje voor een rechte hoek */
  P.teken=()=>{const A=[34,100],B=[206,28];
    const s=ln(A,pt(A,0,70),BLUE,4)+ln(A,pt(A,90,70),BLUE,4)+sq(A,0,90,18)+dot(A,4,INK)
      +ln(B,pt(B,180,70),BLUE,4)+ln(B,pt(B,270,70),BLUE,4)+sq(B,180,270,18)+dot(B,4,INK);
    return svg('0 0 260 120',s,'Twee rechte hoeken met het tekentje',260)
      +'<p class="hcap">Het tekentje is een klein hoekje <b>in de hoek</b>, tegen het hoekpunt aan.<br><span class="sg">⌞</span> de benen gaan naar boven en naar rechts.<br><span class="sg">⌝</span> de benen gaan naar beneden en naar links.</p>'};

  /* loodrecht */
  P.loodrecht=()=>{const c=[120,64];
    const s=ln([20,c[1]],[220,c[1]],BLUE,4)+ln([c[0],6],[c[0],122],BLUE,4)+sq(c,0,90,16);
    return svg('0 0 240 128',s,'Twee loodrechte lijnen',240)
      +'<p class="hcap"><b>Loodrecht</b> betekent: de lijnen maken een <b>rechte hoek</b> (90°), net als de hoek van een bladzijde.</p>'};

  /* hoek verdeeld in twee hoeken */
  P.som=()=>{const V=[40,124];
    const s=ln(V,pt(V,0,180),BLUE,4)+ln(V,pt(V,34,140),INK,3,' stroke-dasharray="6 5"')+ln(V,pt(V,78,108),BLUE,4)+arc(V,0,34,56,OR,3)+arc(V,34,78,56,RO,3)+arc(V,0,78,92,INK,2.5)+dot(V,4.5,INK)
      +tx(pt(V,17,76),'E₁','hp-t')+tx(pt(V,56,76),'E₂','hp-t')+tx(pt(V,40,114),'E','hp-t');
    return svg('0 0 260 140',s,'Hoek E is verdeeld in hoek E1 en hoek E2',260)
      +'<p class="hcap">∠E₁ en ∠E₂ zijn samen één grote hoek ∠E.<br>Meet <b>allebei</b> en <b>tel op</b>:<br>∠E₁ + ∠E₂ = ∠E</p>'};

  return P})();
