/* ---------- knoppen om mee te spelen ---------- */
function bearingOf(svg,e){const r=svg.getBoundingClientRect(),x=e.clientX-(r.left+r.width/2),y=e.clientY-(r.top+r.height/2);return N360(Math.round(Math.atan2(x,-y)*180/Math.PI/5)*5)}
/* 1. getal bij de lijn */
function wLees(box,o){o=o||{};let b=o.start==null?50:o.start;
  const hint=()=>{if(!o.tick)return '';const base=Math.floor(b/30)*30,ex=Math.round((b-base)/5);return '<div class="say" id="rh">'+(ex?'Het laatste getal is '+base+'°. Dan nog '+ex+' streepje'+(ex>1?'s':'')+' van 5°: '+base+' + '+ex*5+' = <b>'+b+'°</b>.':'De lijn wijst precies naar het getal <b>'+b+'°</b>.')+'</div>'};
  const paint=()=>{$('#rs',box).innerHTML=roseSvg({legs:[{b:0,col:'#8aa3bd',w:3},{b:b}],hl:[{b,t:b+'°'}],dr:true,id:'rz',aria:'Kompasroos. Sleep de blauwe lijn.'});$('#rv',box).innerHTML='De blauwe lijn staat bij <span class="kw">'+b+'°</span>';if(o.tick)$('#rh',box).outerHTML=hint();$('#sl',box).value=b;$$('[data-g]',box).forEach(x=>x.classList.toggle('sel',+x.dataset.g===b));wireDrag()};
  function wireDrag(){const svg=$('#rz',box);let drag=0;svg.onpointerdown=e=>{drag=1;try{svg.setPointerCapture(e.pointerId)}catch(_){}b=bearingOf(svg,e);paint()};svg.onpointermove=e=>{if(drag){b=bearingOf(svg,e);paint()}};svg.onpointerup=svg.onpointercancel=()=>{drag=0}}
  box.innerHTML='<div id="rs"></div><div class="verd" id="rv"></div>'+(o.tick?'<div id="rh"></div>':'')+'<input class="slider" id="sl" type="range" min="0" max="355" step="5" value="'+b+'" aria-label="Draai de blauwe lijn"><p class="note center" style="margin:0">Sleep de lijn, of gebruik de schuifknop.</p>'+chipsH([0,90,180,270],-1,'data-g',x=>x+'°');
  $('#sl',box).oninput=e=>{b=+e.target.value;paint()};$$('[data-g]',box).forEach(x=>x.onclick=()=>{sfx('tap');b=+x.dataset.g;paint()});paint()}
/* 2. met de klok mee */
function wKlok(box){let b=0;
  const paint=()=>{box.innerHTML=roseSvg({legs:[{b:0,col:'#8aa3bd',w:3},{b:b}],hl:b?[{b,t:b+'°'}]:[],arc:b>0?[0,b]:null,aria:'Kompasroos. De lijn draait met de klok mee.'})+'<div class="verd">'+(b?'Je bent met de klok mee gedraaid tot <span class="kw">'+b+'°</span>':'Je begint bij 0° (noord).')+'</div><div class="row" style="justify-content:center"><button class="btn" id="kk" type="button">'+(b>=330?'Opnieuw beginnen':'Draai 30° met de klok mee ↻')+'</button></div>';$('#kk',box).onclick=()=>{sfx('tap');b=b>=330?0:b+30;paint()}};paint()}
/* 3. de 4 stappen */
const STAPT=['Stap 1. Kijk eerst: is de hoek recht, scherp of stomp?','Stap 2. Leg het midden van de kompasroos precies op het hoekpunt.','Stap 3. Leg de lijn van 0° (noord) op één been. Je meet met de klok mee naar het andere been.','Stap 4. Lees bij het andere been het aantal graden af.'];
const STAPB=['Stap 1: recht, scherp of stomp?','Stap 2: midden op het hoekpunt','Stap 3: 0° op één been','Stap 4: lees het getal af'];
const POOL=[{n:'A',b1:20,d:50},{n:'B',b1:290,d:35},{n:'C',b1:75,d:115},{n:'D',b1:200,d:70},{n:'E',b1:150,d:130},{n:'P',b1:330,d:95},{n:'Q',b1:240,d:60},{n:'R',b1:110,d:155}];
function wStap(box,o){o=o||{};const items=o.items||POOL;let hi=0,st=0,first=true;
  function figure(H){const rot=H.b1>180?H.b1-360:H.b1,right=Math.abs(H.d-90)<.5;
    return roseSvg({legs:[{b:H.b1},{b:H.b1+H.d}],arc:[H.b1,H.b1+H.d],right,name:'∠'+H.n,noRose:st<2,full:true,rot:st>=3?rot:0,rid:'rg',hl:st>=4?[{b:H.b1+H.d,t:H.d+'°'}]:[],aria:'Een hoek met een kompasroos'})}
  function msg(H){const c=cls(H.d);
    if(st===0)return 'Tik op de knop. Dan doe je stap 1.';
    if(st===1)return '∠'+H.n+' is een <b>'+ADJ[c]+' hoek</b>. '+(c==='scherp'?'Hij is kleiner dan 90°.':c==='stomp'?'Hij is groter dan 90°.':'Hij is precies 90°.');
    if(st===2)return 'Het midden van de kompasroos ligt precies op het hoekpunt.';
    if(st===3)return 'De 0° ligt op het ene been. Kijk nu met de klok mee naar het andere been.';
    return 'Aflezen geeft: <b>∠'+H.n+' = '+H.d+'°</b>. Klopt dat met '+ADJ[c]+'? '+(c==='scherp'?'Ja, 0° tot 90°.':c==='stomp'?'Ja, 90° tot 180°.':'Ja, precies 90°.')}
  function paint(anim){const H=items[hi];
    box.innerHTML=(items.length>1?'<p class="note center" style="margin:0">Kies een hoek</p>'+chipsH(items.map((x,i)=>i),hi,'data-h',i=>'∠'+items[i].n):'')+'<div id="sf">'+figure(H)+'</div><div class="say" id="sm">'+msg(H)+'</div><div class="row" style="justify-content:center"><button class="btn" id="sn" type="button">'+(st>=4?'Nog een keer':(STAPB[st]))+'</button></div>';
    if(anim&&st===3){const g=$('#rg',box),rot=H.b1>180?H.b1-360:H.b1;g.style.transition='none';g.style.transform='rotate(0deg)';g.getBoundingClientRect();g.style.transition='transform .9s';g.style.transform='rotate('+rot+'deg)'}
    $('#sn',box).onclick=()=>{sfx('tap');if(st>=4){st=0;if(items.length>1)hi=(hi+1)%items.length}else st++;paint(true)};
    $$('[data-h]',box).forEach(x=>x.onclick=()=>{sfx('tap');hi=+x.dataset.h;st=0;paint()})}
  paint()}
/* 4. kies het goede been */
function wBeen(box){let H,done=null;
  const nieuw=()=>{const L=shuffle(['P','Q']);H={b1:ri(0,23)*15,d:pick([40,50,60,70,80,100,110,120,130]),L1:L[0],L2:L[1]};done=null;paint()};
  function paint(){const rot=done===null?0:(done===1?H.b1:H.b1+H.d),other=done===null?null:(done===1?H.d:360-H.d),ob=done===1?H.b1+H.d:H.b1;
    box.innerHTML='<div id="bf">'+(done===null?roseSvg({noRose:true,legs:[{b:H.b1},{b:H.b1+H.d}],ends:[{b:H.b1,t:H.L1},{b:H.b1+H.d,t:H.L2}],arc:[H.b1,H.b1+H.d],max:260,full:true,aria:'Een hoek met twee benen'}):roseSvg({legs:[{b:H.b1},{b:H.b1+H.d}],ends:[{b:H.b1,t:H.L1},{b:H.b1+H.d,t:H.L2}],rot:rot>180?rot-360:rot,hl:[{b:ob,t:other+'°'}],max:260,aria:'Kompasroos op de hoek'}))+'</div>'
     +'<div class="say" id="bm">'+(done===null?'Op welk been leg je de lijn van 0° (noord)? Je moet daarna met de klok mee kunnen meten naar het andere been.':done===1?'<b>Goed!</b> Van '+H.L1+' naar '+H.L2+' ga je met de klok mee. Je leest <b>'+H.d+'°</b> af. Dat is de hoek.':'<b>Niet handig.</b> Je leest nu <b>'+(360-H.d)+'°</b> af. Dat is niet de hoek, want je gaat de lange kant om. Probeer het andere been.')+'</div>'
     +'<div class="row" style="justify-content:center">'+['1','2'].map(k=>'<button type="button" class="btn alt" data-l="'+k+'">Been naar '+(k==='1'?H.L1:H.L2)+'</button>').join('')+'<button type="button" class="btn alt small" id="bnw">Nieuwe hoek</button></div>';
    $$('[data-l]',box).forEach(x=>x.onclick=()=>{done=x.dataset.l==='1'?1:2;sfx(done===1?'ok':'no');paint()});$('#bnw',box).onclick=()=>{sfx('tap');nieuw()}}
  nieuw()}
/* 5. scherp, recht of stomp */
function wSoort(box){let d=60;
  const paint=()=>{const c=cls(d);$('#sf',box).innerHTML=roseSvg({noRose:true,legs:[{b:90,col:'#17324d'},{b:90-d}],arc:[90-d,90],right:c==='recht',max:260,aria:'Een hoek van '+d+' graden'});
    $('#sv',box).innerHTML='De hoek is <span class="kw">'+d+'°</span>. Dat is een <b>'+ADJ[c]+' hoek</b>.';$('#sx',box).textContent=c==='scherp'?'Kleiner dan 90°: tussen 0° en 90°.':c==='stomp'?'Groter dan 90°: tussen 90° en 180°.':'Precies 90°. Het teken is een vierkantje.';$('#sl',box).value=d;$$('[data-g]',box).forEach(x=>x.classList.toggle('sel',+x.dataset.g===d))};
  box.innerHTML='<div id="sf"></div><div class="verd" id="sv"></div><p class="note center" id="sx" style="margin:0"></p><input class="slider" id="sl" type="range" min="5" max="175" step="5" value="'+d+'" aria-label="Maak de hoek groter of kleiner">'+chipsH([45,90,135],-1,'data-g',x=>x+'°');
  $('#sl',box).oninput=e=>{d=+e.target.value;paint()};$$('[data-g]',box).forEach(x=>x.onclick=()=>{sfx('tap');d=+x.dataset.g;paint()});paint()}
/* 6. schat en meet */
function wKlopt(box){let H,g=null;
  const nieuw=()=>{const c=pick(['scherp','recht','stomp']);H={b1:ri(0,23)*15,d:c==='recht'?90:c==='scherp'?pick([25,35,45,55,65,75]):pick([105,115,125,135,145,155])};g=null;paint()};
  function paint(){const c=cls(H.d);
    box.innerHTML='<div id="kf">'+(g?FIGMEAS(H.b1,H.d,'').replace('>?<','>'+H.d+'°<'):FIGANG(H.b1,H.d,''))+'</div>'
     +(g?'<div class="say"><b>Jij dacht: '+g+'.</b> Je meet: <b>'+H.d+'°</b>. '+H.d+'° is '+(c==='scherp'?'kleiner dan 90°':c==='stomp'?'groter dan 90°':'precies 90°')+', dus de hoek is <b>'+c+'</b>.<br>'+(g===c?'✔ Het klopt!':'✘ Het klopt niet. Kijk de volgende keer nog beter naar de hoek.')+'</div><div class="row" style="justify-content:center"><button class="btn" id="kn" type="button">Nog een hoek</button></div>'
       :'<div class="say">Kijk naar de hoek. Wat denk je?</div><div class="chips">'+['scherp','recht','stomp'].map(k=>'<button type="button" class="c2" data-k="'+k+'">'+k[0].toUpperCase()+k.slice(1)+'</button>').join('')+'</div>');
    $$('[data-k]',box).forEach(x=>x.onclick=()=>{sfx('tap');g=x.dataset.k;paint()});if(g)$('#kn',box).onclick=()=>{sfx('tap');nieuw()}}
  nieuw()}
/* 7. benen verlengen */
function wVerleng(box,o){o=o||{};const H=o.H||{b1:30,d:65};let lang=false;
  function paint(){box.innerHTML=roseSvg({legs:[{b:H.b1,len:lang?124:40},{b:H.b1+H.d,len:lang?124:40}],rot:H.b1>180?H.b1-360:H.b1,hl:lang?[{b:H.b1+H.d,t:H.d+'°'}]:[],arc:[H.b1,H.b1+H.d],max:280,aria:'Een hoek met korte of lange benen'})+'<div class="say">'+(lang?'<b>Nu zie je het getal:</b> '+H.d+'°. De hoek is niet groter geworden. Alleen de benen zijn langer.':'<b>De benen zijn te kort.</b> Ze komen niet bij de getallen. Je kunt het getal niet zien.')+'</div><div class="row" style="justify-content:center"><button class="btn" id="vl" type="button">'+(lang?'Maak de benen weer kort':'Verleng de benen')+'</button></div>';$('#vl',box).onclick=()=>{sfx('tap');lang=!lang;paint()}}
  paint()}
/* 8. hoeken in een figuur */
function wFig(box){const SH={driehoek:{P:triPts(50,50,80),L:'ABC'},vierhoek:{P:QUAD,L:'ABCD'}};let sh='driehoek',seen={},sel=-1;
  const R5=a=>Math.round(a/5)*5;
  function paint(){const {P,L}=SH[sh];
    box.innerHTML=chipsH(['driehoek','vierhoek'],sh,'data-s',x=>x[0].toUpperCase()+x.slice(1))+'<div id="ff">'+polySvg(P,L,{tap:true,sel,marks:false})+'</div><div class="say" id="fm">'+(sel<0?'Tik op een letter. Dan zie je hoe groot de hoek is.':'<b>∠'+L[sel]+' = '+R5(polyAng(P,sel))+'°</b> · '+ADJ[cls(R5(polyAng(P,sel)))]+' hoek')+'</div><div class="note center">'+L.split('').map((x,i)=>seen[sh+i]?'∠'+x+' = '+R5(polyAng(P,i))+'°':'∠'+x+' = ?').join(' · ')+'</div>';
    $$('[data-s]',box).forEach(x=>x.onclick=()=>{sfx('tap');sh=x.dataset.s;sel=-1;paint()});
    $$('.vt',box).forEach(x=>x.onclick=()=>{sfx('tap');sel=+x.dataset.v;seen[sh+sel]=1;paint()})}
  paint()}
/* 9. twee hoeken samen */
function wSom(box){let T=80,e1=30;
  const paint=()=>{const e2=T-e1;$('#sf',box).innerHTML=roseSvg({noRose:true,legs:[{b:90,col:'#17324d'},{b:90-e1,col:'#e8870a'},{b:90-T}],arcs:[{a:[90-e1,90],r:34,col:'#e8870a',w:5},{a:[90-T,90-e1],r:48,col:'#2a6fdb',w:5}],max:260,ends:[{b:90-e1/2,t:'E₁'},{b:90-e1-e2/2,t:'E₂'}],aria:'Hoek E is verdeeld in twee hoeken'});
    $('#sv',box).innerHTML='∠E₁ = <span class="kw">'+e1+'°</span> en ∠E₂ = <span class="kw">'+e2+'°</span><br>'+e1+' + '+e2+' = <b>'+T+'°</b>';$('#sl',box).max=T-10;$('#sl',box).value=e1;$$('[data-t]',box).forEach(x=>x.classList.toggle('sel',+x.dataset.t===T))};
  box.innerHTML='<div id="sf"></div><div class="verd" id="sv"></div><input class="slider" id="sl" type="range" min="10" max="70" step="5" value="'+e1+'" aria-label="Verdeel de hoek"><p class="note center" style="margin:0">Schuif de oranje lijn. De hele hoek ∠E blijft even groot.</p>'+chipsH([60,80,100,120],T,'data-t',x=>'∠E = '+x+'°');
  $('#sl',box).oninput=e=>{e1=+e.target.value;paint()};$$('[data-t]',box).forEach(x=>x.onclick=()=>{sfx('tap');T=+x.dataset.t;e1=Math.min(e1,T-10);paint()});paint()}
/* 10. boekplaatje nabouwen: roos al op de hoek (opdracht 20 en O22) */
function wRoos(box,o){const items=o.items;let hi=0;
  const paint=()=>{const H=items[hi],c=cls(H.d);box.innerHTML=chipsH(items.map((x,i)=>i),hi,'data-h',i=>'∠'+items[i].n)+roseSvg({legs:[{b:0,col:'#8aa3bd',w:3},{b:H.d}],hl:[{b:H.d,t:'± '+H.d+'°'}],arc:[0,H.d],name:'∠'+H.n,right:c==='recht',aria:'Nagebouwd uit je boek'})+'<div class="say">∠'+H.n+' is een <b>'+ADJ[c]+' hoek</b>. Het getal bij het rechter been is ongeveer <b>'+H.d+'°</b>.</div><p class="note center" style="margin:0">Zo ziet het eruit. Meet zelf ook met je boek erbij.</p>';
    $$('[data-h]',box).forEach(x=>x.onclick=()=>{sfx('tap');hi=+x.dataset.h;paint()})};paint()}
const WID={lees:wLees,klok:wKlok,stap:wStap,been:wBeen,soort:wSoort,klopt:wKlopt,verleng:wVerleng,fig:wFig,som:wSom,roos:wRoos};
