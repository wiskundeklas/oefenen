/* Dyslexie-stand voor de hele website.
   Een knop rechtsonder zet de stand aan of uit. De keuze wordt onthouden op dit apparaat
   en geldt voor alle pagina's. Aangepast: letter (Atkinson Hyperlegible), grotere letters,
   meer ruimte tussen letters, woorden en regels, rustige crème achtergrond, geen schuine letters.

   LEESLINIAAL (alleen in de dyslexie-stand): een doorzichtige gekleurde balk over één regel.
   - Kleur kiezen, letters onder de liniaal groter maken (gewoon / groter / nog groter).
   - Zelf schuiven: pijltjes omhoog/omlaag, muis, tikken op een regel of het handvat rechts slepen.
   - Of automatisch laten lopen: langzaam, normaal of snel (met start/pauze).
   De instellingen worden onthouden op dit apparaat (localStorage 'dyslexie-liniaal'). */
(function(){
  var KEY='dyslexie-stand',RKEY='dyslexie-liniaal',on=false,btn=null;
  try{on=localStorage.getItem(KEY)==='1'}catch(e){}
  var FONT='"Atkinson Hyperlegible","Verdana","Arial",sans-serif';
  var UIB='"Lexend",Verdana,Arial,sans-serif';
  var css=''
  +'html.dys:root{font-size:112.5%;--bg:#fbf4dc;--card:#fffdf3;--ink:#1f2a44;--muted:#444f66;--soft:#444f66;--line:#d8c9a3;color-scheme:light}'
  +'html.dys body{background:#fbf4dc!important;color:#1f2a44;font-size:20px!important;line-height:1.65!important}'
  +'html.dys body :not(svg):not(svg *){font-family:'+FONT+'!important;letter-spacing:.04em;word-spacing:.1em;overflow-wrap:break-word}'
  +'html.dys body p,html.dys body li,html.dys body .say,html.dys body .q,html.dys body .fb,html.dys body .where,html.dys body .note,html.dys body .verd{line-height:1.65!important;text-align:left!important;hyphens:none!important}'
  +'html.dys svg,html.dys svg *{letter-spacing:normal!important;word-spacing:normal!important}'
  +'html.dys em,html.dys i:not([style]),html.dys cite{font-style:normal!important;font-weight:700!important}'
  +'html.dys :where(.card,.opt,.lvb,.stp,.acard,.c2,.lesson,#dag,.bd,.pic){background-color:#fffdf3}'
  +'html.dys :where(.bstp){background-color:#f6efd6}html.dys :where(.bstp .bd){background-color:transparent}'
  +'html.dys .nav{background:linear-gradient(to top,#fffdf3 78%,rgba(255,253,243,0))}'
  +'html.dys .opt,html.dys .btn,html.dys button{padding-top:12px;padding-bottom:12px}'
  +'html.dys .lvb{flex-wrap:wrap}html.dys .lvb>span:not(.lvn):not(.st){flex:1 1 140px;min-width:0}html.dys .lvb .st{margin-left:56px;text-align:left;white-space:normal}'
  +'html.dys #lis .btn,html.dys .btn.alt.small{font-size:1.05rem;min-height:52px}'
  +'html.dys body:not(:has(.nav)){margin-bottom:112px}'
  /* knop Aa */
  +'#dysbtn{position:fixed;bottom:max(var(--dys-b,14px),env(safe-area-inset-bottom,0px));right:max(10px,env(safe-area-inset-right,0px));z-index:200;display:inline-flex;align-items:center;justify-content:center;gap:6px;'
  +'font:700 14px/1.2 '+UIB+';letter-spacing:0;padding:8px 14px;min-height:44px;min-width:44px;border-radius:99px;border:2px solid #2a6fdb;background:#fff;color:#1d57b3;cursor:pointer;box-shadow:0 2px 6px rgba(0,0,0,.18)}'
  +'#dysbtn[aria-pressed="true"]{background:#2a6fdb;color:#fff;border-color:#1d57b3}'
  +'#dysbtn .aa{font-weight:800;font-size:16px}'
  +'#dysbtn.sm{padding:0;width:44px;height:44px}#dysbtn.sm .txt{display:none}'
  +'html.dys #dysbtn,html.dys #dysbtn *{font-family:'+UIB+'!important;font-size:14px!important;letter-spacing:0!important;word-spacing:0!important;line-height:1.2!important}'
  +'html.dys #dysbtn .aa{font-size:16px!important}'
  /* leesliniaal: balk (kleurt mee met de pagina), lens (vergrote tekst), handvat, knoppen, paneel */
  +'#dysband{position:fixed;left:0;top:0;width:100%;height:30px;z-index:70;pointer-events:none;mix-blend-mode:multiply;box-sizing:border-box;border-top:1px solid rgba(0,0,0,.28);border-bottom:1px solid rgba(0,0,0,.28);display:none;transition:top .12s ease,height .12s ease,background-color .15s}'
  +'#dyslens{position:fixed;left:0;top:0;z-index:80;pointer-events:none;box-sizing:border-box;border-radius:10px;border:2px solid rgba(0,0,0,.22);box-shadow:0 3px 10px rgba(0,0,0,.25);padding:3px 12px;color:#1f2a44;line-height:1.3;white-space:nowrap;display:none;overflow:hidden}'
  +'#dyslens span{display:inline}'
  +'#dysgrip{position:fixed;right:0;top:0;z-index:90;width:30px;height:84px;display:none;flex-direction:column;border-radius:12px 0 0 12px;overflow:hidden;background:#2a6fdb;box-shadow:0 2px 8px rgba(0,0,0,.3);touch-action:none;-webkit-user-select:none;user-select:none;cursor:grab}'
  +'#dysgrip div{display:grid;place-items:center;color:#fff;flex:0 0 34px;touch-action:none}#dysgrip .gp{flex:0 0 16px;background:rgba(0,0,0,.16)}'
  +'#dysgrip svg{display:block;pointer-events:none}'
  +'#dysdock{position:fixed;z-index:200;right:max(10px,env(safe-area-inset-right,0px));bottom:calc(max(var(--dys-b,14px),env(safe-area-inset-bottom,0px)) + 52px);display:none;flex-direction:column;gap:8px;align-items:flex-end}'
  +'html.dys #dysdock{display:flex}'
  +'#dysdock button{width:44px;height:44px;border-radius:50%;border:2px solid #2a6fdb;background:#fff;cursor:pointer;display:grid;place-items:center;padding:0!important;margin:0;box-shadow:0 2px 6px rgba(0,0,0,.18);min-height:0;color:#1d57b3}'
  +'#dysdock button[aria-pressed="true"]{background:#2a6fdb;color:#fff;border-color:#1d57b3}'
  +'#dysdock [hidden]{display:none!important}#dysdock svg{display:block;pointer-events:none}'
  +'#dysdock #dysrulbtn:not(.sm){width:auto;min-width:44px;padding:0 14px 0 10px!important;border-radius:99px;display:inline-flex;align-items:center;justify-content:center;gap:6px}'
  +'#dysdock #dysrulbtn .txt{font:700 14px/1.2 '+UIB+'}#dysdock #dysrulbtn.sm .txt{display:none}'
  +'html.dys #dysrulbtn .txt{font-family:'+UIB+'!important;font-size:14px!important;letter-spacing:0!important;word-spacing:0!important;line-height:1.2!important}'
  +'#dyspanel{position:fixed;z-index:210;right:max(10px,env(safe-area-inset-right,0px));bottom:max(10px,env(safe-area-inset-bottom,0px));width:min(344px,calc(100vw - 20px));max-height:calc(100vh - 20px);overflow:hidden;box-sizing:border-box;'
  +'background:#fffdf3;color:#1f2a44;border:2px solid #2a6fdb;border-radius:16px;padding:0;box-shadow:0 8px 28px rgba(0,0,0,.32);font-size:16px;line-height:1.35;display:none}'
  +'#dyspanel[data-open="1"]{display:flex;flex-direction:column}'
  +'#dyspanel .t{display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:18px;font-weight:800;padding:10px 14px 4px;flex:0 0 auto}'
  +'#dyspanel .bd2{padding:0 14px 6px;overflow:auto;flex:1 1 auto;min-height:0;-webkit-overflow-scrolling:touch}'
  +'#dyspanel .ft{display:flex;gap:8px;padding:8px 14px 12px;flex:0 0 auto;border-top:2px solid rgba(0,0,0,.08);background:#fffdf3}'
  +'#dyspanel .t button{width:40px;height:40px;border-radius:50%;border:2px solid #2a6fdb;background:#fff;color:#1d57b3;font-size:18px;font-weight:800;cursor:pointer;padding:0!important;line-height:1}'
  +'#dyspanel .lb{margin:12px 0 6px;font-weight:700;font-size:15px;color:#444f66}'
  +'#dyspanel .sw{display:flex;width:100%;align-items:center;justify-content:space-between;gap:10px;min-height:48px;padding:6px 14px!important;border-radius:12px;border:2px solid #2a6fdb;background:#fff;color:#1d57b3;font-size:16px;font-weight:800;cursor:pointer}'
  +'#dyspanel .sw[aria-pressed="true"]{background:#2a6fdb;color:#fff}'
  +'#dyspanel .sw i{font-style:normal!important;border-radius:99px;padding:2px 12px;background:rgba(0,0,0,.12);font-size:15px}'
  +'#dyspanel .cols{display:flex;gap:6px;justify-content:space-between}'
  +'#dyspanel .col{flex:0 1 42px;min-width:0;width:auto;height:auto;aspect-ratio:1/1;border-radius:50%;border:3px solid #fffdf3;outline:2px solid #9aa4b8;cursor:pointer;padding:0!important;position:relative}'
  +'#dyspanel .col[aria-checked="true"]{outline:4px solid #2a6fdb}'
  +'#dyspanel .col[aria-checked="true"]::after{content:"\\2713";position:absolute;inset:0;display:grid;place-items:center;font-size:22px;font-weight:800;color:#1f2a44}'
  +'#dyspanel .seg{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px}#dyspanel .seg.q{grid-template-columns:repeat(2,minmax(0,1fr))}'
  +'#dyspanel .seg button{min-width:0;min-height:46px;padding:4px 6px!important;border:2px solid #2a6fdb;background:#fff;color:#1d57b3;border-radius:10px;font-size:15px;font-weight:700;line-height:1.15;cursor:pointer}'
  +'#dyspanel .seg button[aria-pressed="true"]{background:#2a6fdb;color:#fff}'
  +'#dyspanel .pv{margin:12px 0 2px;border-radius:10px;padding:5px 12px;border:2px solid rgba(0,0,0,.2);font-weight:600;line-height:1.3}'
  +'#dyspanel .hint{font-size:14px;line-height:1.4;color:#444f66;margin-top:8px}'
  +'#dyspanel .go{display:flex;flex:1 1 0;min-width:0;justify-content:center;align-items:center;gap:8px;min-height:50px;margin:0;padding:6px 14px!important;border-radius:12px;border:2px solid #1d57b3;background:#2a6fdb;color:#fff;font-size:17px;font-weight:800;cursor:pointer}'
  +'#dyspanel .go.ghost{background:#fff;color:#1d57b3}'
  +'#dyspanel [hidden]{display:none!important}';
  function style(){var s=document.createElement('style');s.id='dys-css';s.textContent=css;(document.head||document.documentElement).appendChild(s)}
  function font(){if(document.getElementById('dys-font'))return;var l=document.createElement('link');l.id='dys-font';l.rel='stylesheet';
    l.href='https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&display=swap';(document.head||document.documentElement).appendChild(l)}
  function apply(){
    document.documentElement.classList.toggle('dys',on);
    if(on)font();
    if(btn){btn.setAttribute('aria-pressed',on?'true':'false');btn.innerHTML='<span class="aa" aria-hidden="true">Aa</span><span class="txt">Dyslexie: '+(on?'aan':'uit')+'</span>';btn.setAttribute('aria-label','Dyslexie-stand: '+(on?'aan':'uit'))}
    try{if(rulerSync)rulerSync()}catch(e){}
  }
  function mk(){
    if(document.getElementById('dysbtn'))return;
    btn=document.createElement('button');btn.type='button';btn.id='dysbtn';
    btn.title='Maakt de letters en de pagina rustiger om te lezen';
    btn.onclick=function(){on=!on;try{localStorage.setItem(KEY,on?'1':'0')}catch(e){}apply();if(btn._flash)btn._flash()};
    document.body.insertBefore(btn,document.body.firstChild);apply();var held=false,tm=0;var small=function(){var s=held||(window.pageYOffset||document.documentElement.scrollTop||0)>40;btn.classList.toggle('sm',s);if(rulBtn)rulBtn.classList.toggle('sm',s)};var later=function(ms){clearTimeout(tm);tm=setTimeout(function(){held=true;small()},ms)};window.addEventListener('scroll',small,{passive:true});btn._flash=function(){held=false;small();later(3000)};later(5000);
  }

  /* ================= Leesliniaal ================= */
  var COL={geel:[255,236,128],groen:[183,238,190],blauw:[176,214,255],roze:[255,196,222],oranje:[255,208,150],paars:[220,198,255]};
  var KLN=['geel','groen','blauw','roze','oranje','paars'];
  var KNAAM={geel:'Geel',groen:'Groen',blauw:'Blauw',roze:'Roze',oranje:'Oranje',paars:'Paars'};
  var SCALE=[1,1.25,1.5],WPM=[0,60,100,150],PAD=4,GH=84,GW=30;
  var R={aan:false,kleur:'geel',groter:0,tempo:0};
  try{var sv=JSON.parse(localStorage.getItem(RKEY)||'null');
    if(sv&&typeof sv==='object'){if(sv.aan===true)R.aan=true;if(COL[sv.kleur])R.kleur=sv.kleur;if(sv.groter===1||sv.groter===2)R.groter=sv.groter;if(sv.tempo>=1&&sv.tempo<=3)R.tempo=sv.tempo|0}}catch(e){}
  function saveR(){try{localStorage.setItem(RKEY,JSON.stringify(R))}catch(e){}}
  var band,lens,grip,dock,rulBtn,playBtn,panel,pv;
  var rows=[],dirty=true,lastBuild=0,ys=null,cur=-1,lastH=32,free=false,rafId=0,animId=0,pend=-1,stTimer=0,atimer=0,auto=false,panelOpen=false,drag=null,mo=null,watching=false,lastB=14,dockRaf=0,rebuildT=0;
  var reduce=false;try{reduce=!!(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)}catch(e){}
  function act(){return !!(on&&R.aan&&band)}
  function scrollTop(){return window.pageYOffset||document.documentElement.scrollTop||0}
  function scrollLeft(){return window.pageXOffset||document.documentElement.scrollLeft||0}
  function maxScroll(){return Math.max(0,document.documentElement.scrollHeight-window.innerHeight)}
  function rgb(c){return 'rgb('+c[0]+','+c[1]+','+c[2]+')'}
  function solid(c){return 'rgb('+c[0]+','+Math.round(c[1]*253/255)+','+Math.round(c[2]*243/255)+')'}
  function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;')}
  function el(t,id){var e=document.createElement(t);e.id=id;return e}
  var ICON='<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path d="M4 5h16M4 19h16" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><rect x="2.5" y="9" width="19" height="6.5" rx="1.6" fill="#ffd84a" stroke="currentColor" stroke-width="1.8"/></svg>';
  var PLAY='<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg>';
  var PAUSE='<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z" fill="currentColor"/></svg>';
  var UP='<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M5 15l7-7 7 7" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var DOWN='<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M5 9l7 7 7-7" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function mkRuler(){
    if(band||!document.body)return;
    band=el('div','dysband');lens=el('div','dyslens');grip=el('div','dysgrip');dock=el('div','dysdock');panel=el('div','dyspanel');
    band.setAttribute('aria-hidden','true');lens.setAttribute('aria-hidden','true');grip.setAttribute('aria-hidden','true');
    grip.innerHTML='<div data-g="u" style="cursor:pointer">'+UP+'</div><div class="gp"><svg viewBox="0 0 16 6" width="16" height="6"><circle cx="3" cy="3" r="1.4" fill="#fff"/><circle cx="8" cy="3" r="1.4" fill="#fff"/><circle cx="13" cy="3" r="1.4" fill="#fff"/></svg></div><div data-g="d" style="cursor:pointer">'+DOWN+'</div>';
    dock.innerHTML='<button type="button" id="dysplay" hidden></button><button type="button" id="dysrulbtn" aria-haspopup="dialog" aria-expanded="false" title="Leesliniaal">'+ICON+'<span class="txt">Liniaal</span></button>';
    var h='<div class="t"><span>Leesliniaal</span><button type="button" data-a="klaar" aria-label="Sluiten">✕</button></div>';
    h+='<div class="bd2"><button type="button" class="sw" data-a="aan" aria-pressed="false"><span>Liniaal</span><i></i></button>';
    h+='<div class="lb">Kleur</div><div class="cols" role="group" aria-label="Kleur van de liniaal">';
    for(var i=0;i<KLN.length;i++)h+='<button type="button" class="col" data-a="kleur" data-v="'+KLN[i]+'" role="radio" aria-checked="false" aria-label="'+KNAAM[KLN[i]]+'" title="'+KNAAM[KLN[i]]+'" style="background:'+rgb(COL[KLN[i]])+'"></button>';
    h+='</div><div class="lb">Letters onder de liniaal</div><div class="seg" role="group" aria-label="Grootte van de letters onder de liniaal">'
      +'<button type="button" data-a="groter" data-v="0">Gewoon</button><button type="button" data-a="groter" data-v="1">Groter</button><button type="button" data-a="groter" data-v="2">Nog groter</button></div>';
    h+='<div class="lb">Snelheid</div><div class="seg q" role="group" aria-label="Snelheid van de liniaal">'
      +'<button type="button" data-a="tempo" data-v="0">Zelf</button><button type="button" data-a="tempo" data-v="1">Langzaam</button><button type="button" data-a="tempo" data-v="2">Normaal</button><button type="button" data-a="tempo" data-v="3">Snel</button></div>';
    h+='<div class="pv" id="dyspv">Zo ziet het eruit.</div>';
    h+='<div class="hint" id="dyshint"></div></div><div class="ft"><button type="button" class="go" data-a="start" hidden></button><button type="button" class="go ghost" data-a="klaar">Klaar</button></div>';
    panel.setAttribute('role','dialog');panel.setAttribute('aria-label','Leesliniaal');panel.innerHTML=h;
    var b=document.body,f=b.firstChild;
    [band,lens,grip,dock,panel].forEach(function(n){b.insertBefore(n,f)});
    rulBtn=dock.querySelector('#dysrulbtn');playBtn=dock.querySelector('#dysplay');pv=panel.querySelector('#dyspv');
    wire();
  }

  /* ---- regels zoeken: alle tekstregels van de pagina, van boven naar beneden ---- */
  function usable(el,memo){
    var m=memo.get(el);if(m!==undefined)return m;
    var ok=true,cs;
    try{cs=getComputedStyle(el)}catch(e){memo.set(el,false);return false}
    var tn=el.tagName;
    if(cs.display==='none'||cs.visibility==='hidden'||cs.position==='fixed'||cs.position==='sticky'||parseFloat(cs.opacity)===0)ok=false;
    else if(tn==='SCRIPT'||tn==='STYLE'||tn==='NOSCRIPT'||tn==='TEXTAREA'||tn==='SELECT'||tn==='OPTION'||tn==='svg'||tn==='SVG'||el.namespaceURI==='http://www.w3.org/2000/svg')ok=false;
    else if(el.getAttribute&&(el.getAttribute('aria-hidden')==='true'||/^dys/.test(el.id||'')))ok=false;
    else if(el!==document.body&&el.parentElement)ok=usable(el.parentElement,memo);
    memo.set(el,ok);return ok;
  }
  function build(){
    dirty=false;lastBuild=Date.now();rows=[];
    if(!document.body)return;
    var fr=[],st=scrollTop(),sl=scrollLeft(),memo=new Map(),rg=document.createRange(),tw,n;
    try{
      tw=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,null);
      while((n=tw.nextNode())){
        var s=n.nodeValue;if(!s||!/\S/.test(s))continue;
        var p=n.parentElement;if(!p||!usable(p,memo))continue;
        rg.selectNodeContents(n);var rs=rg.getClientRects(),k=rs.length,i;
        for(i=0;i<k;i++){var r=rs[i];if(r.width<2||r.height<5)continue;
          fr.push({n:n,k:k,l:r.left+sl,r:r.right+sl,t:r.top+st,b:r.bottom+st})}
      }
    }catch(e){}
    fr.sort(function(a,b){return (a.t+a.b)-(b.t+b.b)||a.l-b.l});
    var out=[],row=null,i2;
    for(i2=0;i2<fr.length;i2++){
      var f=fr[i2],cy=(f.t+f.b)/2,h=f.b-f.t;
      if(row&&Math.abs(cy-row.sc)<=0.45*Math.max(h,row.sh)){
        row.f.push(f);if(f.t<row.top)row.top=f.t;if(f.b>row.bottom)row.bottom=f.b;if(f.l<row.left)row.left=f.l;if(f.r>row.right)row.right=f.r;
        if(h>row.sh){row.sh=h;row.sc=cy}
      }else{row={f:[f],top:f.t,bottom:f.b,left:f.l,right:f.r,sc:cy,sh:h};out.push(row)}
    }
    for(i2=0;i2<out.length;i2++){var o=out[i2];o.cy=(o.top+o.bottom)/2;o.h=o.bottom-o.top}
    out.sort(function(a,b){return a.cy-b.cy});
    rows=out;
  }
  function nearIdx(y,dir){
    var lo=0,hi=rows.length-1,m;
    if(!rows.length)return -1;
    while(lo<=hi){m=(lo+hi)>>1;if(rows[m].cy<y)lo=m+1;else hi=m-1}
    if(dir>0)return lo<rows.length?lo:rows.length-1;
    if(dir<0)return lo>0?lo-1:0;
    if(lo<=0)return 0;if(lo>=rows.length)return rows.length-1;
    return (y-rows[lo-1].cy<=rows[lo].cy-y)?lo-1:lo;
  }
  function rowIdx(y){
    var i=nearIdx(y,0);if(i<0)return -1;
    var r=rows[i];return Math.abs(y-r.cy)>Math.max(r.h*0.8,16)?-1:i;
  }
  /* tekst van één regel (voor de lens en voor het tellen van woorden) */
  function fragText(f){
    var s=f.n.nodeValue;
    if(f.k===1)return s.replace(/\s+/g,' ');
    var rg=document.createRange(),out='',st=scrollTop(),inl=false,i,ln=s.length;
    for(i=0;i<ln;i++){
      var ch=s.charAt(i);
      rg.setStart(f.n,i);rg.setEnd(f.n,i+1);
      var rs=rg.getClientRects();
      if(!rs.length){if(inl)out+=ch;continue}
      var cy=(rs[0].top+rs[0].bottom)/2+st;
      if(cy>=f.t-1&&cy<=f.b+1){out+=ch;inl=true}
      else if(inl&&cy>f.b)break;
    }
    return out.replace(/\s+/g,' ');
  }
  function rowParts(row){
    if(row.parts)return row.parts;
    var fs=row.f.slice().sort(function(a,b){return a.l-b.l}),parts=[],prev=null,i;
    for(i=0;i<fs.length;i++){
      var f=fs[i],t=fragText(f);if(!/\S/.test(t))continue;
      var cs=null,fz=20,bold=false;
      try{cs=getComputedStyle(f.n.parentElement);fz=parseFloat(cs.fontSize)||20;bold=(parseInt(cs.fontWeight,10)||400)>=600}catch(e){}
      if(prev&&f.l-prev.r>fz*0.2&&!/\s$/.test(prev.t)&&!/^\s/.test(t))t=' '+t;
      var p={t:t,fz:fz,b:bold};parts.push(p);prev={r:f.r,t:t};
    }
    if(parts.length){parts[0].t=parts[0].t.replace(/^\s+/,'');parts[parts.length-1].t=parts[parts.length-1].t.replace(/\s+$/,'')}
    row.parts=parts;return parts;
  }
  function rowWords(row){
    var p=rowParts(row),t='',i;for(i=0;i<p.length;i++)t+=p[i].t;
    var m=t.match(/\S+/g);return m?m.length:1;
  }
  function navReserve(){
    var n=document.querySelector('.nav'),vh=window.innerHeight;
    if(!n)return 0;
    var r=n.getBoundingClientRect();
    return (r.height>0&&r.top<vh&&r.bottom>0)?Math.max(0,vh-r.top):0;
  }

  /* ---- tekenen ---- */
  function req(){if(!rafId)rafId=requestAnimationFrame(draw)}
  function hideAll(){if(!band)return;band.style.display='none';lens.style.display='none';grip.style.display='none'}
  function draw(){
    rafId=0;
    if(!band)return;
    if(!act()){hideAll();return}
    var vh=window.innerHeight,vw=document.documentElement.clientWidth,st=scrollTop();
    if(ys===null)ys=Math.round(vh*0.4);
    if(dirty){if(Date.now()-lastBuild>=140)build();else{clearTimeout(rebuildT);rebuildT=setTimeout(req,160)}}
    ys=Math.max(8,Math.min(vh-8,ys));
    var row=null,i=-1;
    if(!free&&rows.length){i=rowIdx(ys+st);if(i>=0)row=rows[i]}
    cur=i;
    var top,h;
    if(row){h=Math.round(row.h)+2*PAD;top=Math.round(row.top-st)-PAD;ys=top+h/2;lastH=h}
    else{h=lastH;top=Math.round(ys-h/2)}
    band.style.display='block';band.style.top=top+'px';band.style.height=h+'px';band.style.backgroundColor=rgb(COL[R.kleur]);
    var cy=top+h/2,lc=null;
    if(row&&R.groter>0)lc=showLens(row,cy,vw,vh);
    if(lc===null)lens.style.display='none';
    var gc=lc!==null?lc:cy,gt=Math.max(4,Math.min(vh-GH-4,Math.round(gc-GH/2)));
    grip.style.display='flex';grip.style.top=gt+'px';
  }
  function showLens(row,cy,vw,vh){
    var parts=rowParts(row);
    if(!parts.length)return null;
    var S=SCALE[R.groter];
    var key=R.groter+'|'+R.kleur;
    if(lens._row!==row||lens._key!==key){
      var h='',i;
      for(i=0;i<parts.length;i++){var p=parts[i];h+='<span style="font-size:'+(p.fz*S).toFixed(1)+'px'+(p.b?';font-weight:700':'')+'">'+esc(p.t)+'</span>'}
      lens.innerHTML=h;lens._row=row;lens._key=key;lens.style.backgroundColor=solid(COL[R.kleur]);
    }
    lens.style.display='block';lens.style.whiteSpace='nowrap';lens.style.width='auto';lens.style.left='0px';lens.style.top='0px';
    var L0=4,R0=vw-GW-6,maxW=R0-L0,natW=Math.ceil(lens.getBoundingClientRect().width)+1,left,w;
    var rl=row.left-scrollLeft()-14;
    if(natW<=maxW){w=natW;left=Math.max(L0,Math.min(rl,R0-natW));lens.style.whiteSpace='nowrap'}
    else{w=maxW;left=L0;lens.style.whiteSpace='normal'}
    lens.style.width=w+'px';lens.style.left=Math.round(left)+'px';
    var hh=lens.getBoundingClientRect().height,res=navReserve();
    var top=Math.round(cy-hh/2);top=Math.max(4,Math.min(vh-res-hh-6,top));
    lens.style.top=top+'px';
    return top+hh/2;
  }

  /* ---- bewegen ---- */
  function animScroll(to,done){
    if(animId){cancelAnimationFrame(animId);animId=0}
    var from=scrollTop(),d=to-from;
    if(Math.abs(d)<2||reduce){window.scrollTo(0,to);done();return}
    var t0=null,dur=Math.min(420,170+Math.abs(d)*0.35);
    function f(ts){
      if(t0===null)t0=ts;
      var p=Math.min(1,(ts-t0)/dur),e=p<0.5?2*p*p:1-Math.pow(-2*p+2,2)/2;
      window.scrollTo(0,from+d*e);
      if(p<1)animId=requestAnimationFrame(f);else{animId=0;done()}
    }
    animId=requestAnimationFrame(f);
  }
  function goRow(j){
    if(j<0||j>=rows.length)return;
    var row=rows[j],vh=window.innerHeight,res=navReserve(),st=scrollTop();
    var cy=row.cy-st,zt=vh*0.12,zb=vh-res-Math.max(48,vh*0.1);
    if(animId){cancelAnimationFrame(animId);animId=0}
    if(cy>=zt&&cy<=zb){pend=-1;free=false;ys=cy;req();return}
    var anchor=Math.min(vh*0.4,zb),target=Math.max(0,Math.min(maxScroll(),row.cy-anchor));
    pend=j;ys=row.cy-target;free=true;req();
    animScroll(target,function(){pend=-1;free=false;ys=row.cy-scrollTop();req()});
  }
  function step(dir){
    if(dirty){build();cur=free?-1:rowIdx(ys+scrollTop())}
    if(!rows.length)return;
    var i=pend>=0?pend:cur;
    if(i<0)i=nearIdx(ys+scrollTop(),dir);else i=Math.max(0,Math.min(rows.length-1,i+dir));
    goRow(i);
  }
  function setAuto(v){
    auto=!!v;clearTimeout(atimer);
    if(auto)schedule();
    syncUI();
  }
  function schedule(){
    clearTimeout(atimer);
    if(!auto||!R.tempo)return;
    var i=cur>=0?cur:nearIdx(ys+scrollTop(),0),row=i>=0?rows[i]:null,w=row?rowWords(row):4;
    var ms=Math.max(1100,Math.round(w*60000/WPM[R.tempo]))+250;
    atimer=setTimeout(function(){
      if(!auto)return;
      if(dirty)build();
      var j=cur>=0?cur:nearIdx(ys+scrollTop(),0);
      if(j<0||j>=rows.length-1){setAuto(false);return}
      goRow(j+1);schedule();
    },ms);
  }

  /* ---- paneel en knoppen ---- */
  function openPanel(){panelOpen=true;setAuto(false);panel.setAttribute('data-open','1');rulBtn.setAttribute('aria-expanded','true');syncUI();
    var f=panel.querySelector('.sw');if(f)try{f.focus({preventScroll:true})}catch(e){}}
  function closePanel(){var was=panelOpen;panelOpen=false;if(!panel)return;panel.removeAttribute('data-open');if(rulBtn)rulBtn.setAttribute('aria-expanded','false');if(was)syncUI()}
  function syncUI(){
    if(!band)return;
    var on2=on&&R.aan;
    rulBtn.setAttribute('aria-pressed',on2?'true':'false');
    rulBtn.setAttribute('aria-label','Leesliniaal: '+(on2?'aan':'uit')+'. Instellingen openen');
    var showPlay=on2&&R.tempo>0;
    playBtn.hidden=!(showPlay&&!panelOpen);
    playBtn.innerHTML=auto?PAUSE:PLAY;playBtn.setAttribute('aria-label',auto?'Liniaal pauzeren':'Liniaal automatisch laten lopen');playBtn.title=auto?'Pauze':'Start';
    playBtn.setAttribute('aria-pressed',auto?'true':'false');
    var sw=panel.querySelector('.sw');sw.setAttribute('aria-pressed',R.aan?'true':'false');sw.querySelector('i').textContent=R.aan?'aan':'uit';
    var q,i;
    q=panel.querySelectorAll('.col');for(i=0;i<q.length;i++)q[i].setAttribute('aria-checked',q[i].getAttribute('data-v')===R.kleur?'true':'false');
    q=panel.querySelectorAll('[data-a="groter"]');for(i=0;i<q.length;i++)q[i].setAttribute('aria-pressed',(+q[i].getAttribute('data-v'))===R.groter?'true':'false');
    q=panel.querySelectorAll('[data-a="tempo"]');for(i=0;i<q.length;i++)q[i].setAttribute('aria-pressed',(+q[i].getAttribute('data-v'))===R.tempo?'true':'false');
    pv.style.backgroundColor=solid(COL[R.kleur]);pv.style.fontSize=(16*SCALE[R.groter]).toFixed(1)+'px';
    var go=panel.querySelector('.go'),hint=panel.querySelector('#dyshint');
    if(R.tempo>0){go.hidden=false;go.innerHTML=(auto?PAUSE+' Pauze':PLAY+' Start');go.setAttribute('data-a','start');
      hint.textContent='De liniaal loopt vanzelf. Je kunt altijd pauzeren met de knop met de driehoek.'}
    else{go.hidden=true;hint.textContent='Jij bepaalt het tempo: tik op een regel, gebruik de pijltjes aan de rechterkant (of op je toetsenbord) of sleep de liniaal.'}
    placeDock();
  }
  function placeDock(){
    var b=14;
    try{
      var n=document.querySelector('.nav'),vh=window.innerHeight;
      if(n){var r=n.getBoundingClientRect();
        if(r.height>0&&r.bottom>0&&r.top<vh){
          var stack=44+(on?52:0)+(on&&R.aan&&R.tempo>0?52:0);
          if(r.bottom>vh-14-stack)b=Math.max(b,Math.round(vh-r.top+8));
        }}
    }catch(e){}
    if(b!==lastB){lastB=b;document.documentElement.style.setProperty('--dys-b',b+'px')}
  }
  function placeDockSoon(){if(!dockRaf)dockRaf=requestAnimationFrame(function(){dockRaf=0;placeDock()})}
  function interactive(t){
    try{return !!(t&&t.closest&&t.closest('button,a,input,select,textarea,label,summary,[role="button"],[role="radio"],#dysbtn,#dysdock,#dyspanel,#dysgrip,.nav'))}catch(e){return false}
  }
  function changed(){dirty=true;if(act())req()}

  function wire(){
    dock.addEventListener('click',function(e){
      var t=e.target.closest?e.target.closest('button'):null;if(!t)return;
      if(t.id==='dysrulbtn'){if(panelOpen)closePanel();else openPanel()}
      else if(t.id==='dysplay'){setAuto(!auto)}
    });
    panel.addEventListener('click',function(e){
      var t=e.target.closest?e.target.closest('button'):null;if(!t)return;
      var a=t.getAttribute('data-a'),v=t.getAttribute('data-v');
      if(a==='klaar'){closePanel();try{rulBtn.focus({preventScroll:true})}catch(x){}return}
      if(a==='aan'){R.aan=!R.aan;if(!R.aan)setAuto(false)}
      else if(a==='kleur'&&COL[v]){R.kleur=v;R.aan=true}
      else if(a==='groter'){R.groter=(+v)|0;R.aan=true;lens._row=null}
      else if(a==='tempo'){R.tempo=(+v)|0;R.aan=true;if(!R.tempo)setAuto(false)}
      else if(a==='start'){if(auto)setAuto(false);else{R.aan=true;closePanel();setAuto(true)}}
      saveR();activate();syncUI();req();
    });
    document.addEventListener('pointerdown',function(e){
      if(!panelOpen)return;
      var t=e.target;if(panel.contains(t)||dock.contains(t))return;
      closePanel();
    },true);
    document.addEventListener('keydown',function(e){
      if(!band)return;
      if(e.key==='Escape'&&panelOpen){closePanel();try{rulBtn.focus({preventScroll:true})}catch(x){}return}
      if(!act()||e.defaultPrevented||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey)return;
      var k=e.key;if(k!=='ArrowDown'&&k!=='ArrowUp')return;
      var t=e.target,tn=t&&t.tagName;
      if(tn==='INPUT'||tn==='TEXTAREA'||tn==='SELECT'||(t&&t.isContentEditable))return;
      if(panelOpen)return;
      e.preventDefault();setAuto(false);step(k==='ArrowDown'?1:-1);
    });
    /* muis: de liniaal volgt de muis (niet boven knoppen) */
    document.addEventListener('pointermove',function(e){
      if(!act()||e.pointerType!=='mouse'||panelOpen||drag||R.tempo>0&&auto)return;
      if(e.buttons)return;
      if(interactive(e.target))return;
      if(Math.abs(e.clientY-(ys===null?-99:ys))<2)return;
      pend=-1;free=false;ys=e.clientY;req();
    },{passive:true});
    /* tikken op tekst: de liniaal gaat naar die regel */
    document.addEventListener('click',function(e){
      if(act()&&!panelOpen&&e.isTrusted&&!interactive(e.target)){setAuto(false);pend=-1;free=false;ys=e.clientY;req()}
      if(act())setTimeout(changed,220);
      setTimeout(placeDockSoon,260);
    },true);
    /* handvat: tik boven/onder of sleep */
    grip.addEventListener('pointerdown',function(e){
      if(!act())return;
      e.preventDefault();setAuto(false);
      var t=e.target.closest?e.target.closest('[data-g]'):null;
      drag={id:e.pointerId,y0:e.clientY,off:e.clientY-(ys===null?e.clientY:ys),moved:false,part:t?t.getAttribute('data-g'):'',st:scrollTop()};
      try{grip.setPointerCapture(e.pointerId)}catch(x){}
    });
    grip.addEventListener('pointermove',function(e){
      if(!drag||e.pointerId!==drag.id)return;
      if(!drag.moved&&Math.abs(e.clientY-drag.y0)>6)drag.moved=true;
      if(drag.moved){pend=-1;free=false;ys=e.clientY-drag.off;req()}
    });
    function end(e){
      if(!drag||e.pointerId!==drag.id)return;
      var d=drag;drag=null;
      try{grip.releasePointerCapture(e.pointerId)}catch(x){}
      if(!d.moved&&e.type==='pointerup'){if(d.part==='u')step(-1);else if(d.part==='d')step(1)}
    }
    grip.addEventListener('pointerup',end);grip.addEventListener('pointercancel',end);
    window.addEventListener('scroll',function(){
      placeDockSoon();
      if(!act())return;
      if(!drag){free=true;clearTimeout(stTimer);stTimer=setTimeout(function(){if(animId)return;free=false;req()},140)}
      req();
    },{passive:true});
    window.addEventListener('resize',function(){dirty=true;placeDockSoon();if(act())req()});
    window.addEventListener('load',function(){dirty=true;if(act())req();placeDock()});
    document.addEventListener('visibilitychange',function(){if(document.hidden)setAuto(false)});
    setInterval(function(){if(!document.hidden)placeDock()},700);
    ['transitionend','animationend','input','change'].forEach(function(n){document.addEventListener(n,function(){if(act())changed()},true)});
    try{if(document.fonts&&document.fonts.addEventListener)document.fonts.addEventListener('loadingdone',function(){dirty=true;if(act())req()})}catch(e){}
  }
  function activate(){
    var a=act();
    if(a&&!watching){
      watching=true;dirty=true;
      try{
        mo=new MutationObserver(function(recs){
          var i,t;
          for(i=0;i<recs.length;i++){
            t=recs[i].target;if(t&&t.nodeType===3)t=t.parentNode;
            if(!t||!t.closest)continue;
            if(t.closest('#dysband,#dyslens,#dysgrip,#dysdock,#dyspanel,#dysbtn,svg'))continue;
            dirty=true;req();placeDockSoon();return;
          }
        });
        mo.observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['class','hidden']});
      }catch(e){}
    }else if(!a&&watching){
      watching=false;try{mo&&mo.disconnect()}catch(e){}mo=null;setAuto(false);
    }
    req();
  }
  var rulerSync=function(){
    if(!document.body)return;
    mkRuler();
    if(!on){closePanel();setAuto(false)}
    syncUI();activate();
    placeDock();
  };
  try{if(window.__dysDebug)window.__dysRows=function(){return rows.map(function(r){return {top:Math.round(r.top),bottom:Math.round(r.bottom),left:Math.round(r.left),parts:rowParts(r).map(function(p){return p.t}),f:r.f.map(function(f){return [Math.round(f.t),Math.round(f.b),Math.round(f.l),Math.round(f.r),f.k,f.n.nodeValue.slice(0,40)]})}})}}catch(e){}
  style();apply();
  if(document.body)mk();else document.addEventListener('DOMContentLoaded',mk);
})();
