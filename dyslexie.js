/* Dyslexie-stand voor de hele website.
   Een knop rechtsboven zet de stand aan of uit. De keuze wordt onthouden op dit apparaat
   en geldt voor alle pagina's. Aangepast: letter (Atkinson Hyperlegible), grotere letters,
   meer ruimte tussen letters, woorden en regels, rustige crème achtergrond, geen schuine letters. */
(function(){
  var KEY='dyslexie-stand',on=false,btn=null;
  try{on=localStorage.getItem(KEY)==='1'}catch(e){}
  var FONT='"Atkinson Hyperlegible","Verdana","Arial",sans-serif';
  var css=''
  +'html.dys:root{font-size:112.5%;--bg:#fbf4dc;--card:#fffdf3;--ink:#1f2a44;--muted:#444f66;--soft:#444f66;--line:#d8c9a3;color-scheme:light}'
  +'html.dys body{background:#fbf4dc!important;color:#1f2a44;font-size:20px!important;line-height:1.65!important}'
  +'html.dys body :not(svg):not(svg *){font-family:'+FONT+'!important;letter-spacing:.04em;word-spacing:.1em;overflow-wrap:break-word}'
  +'html.dys body p,html.dys body li,html.dys body .say,html.dys body .q,html.dys body .fb,html.dys body .where,html.dys body .note,html.dys body .verd{line-height:1.65!important;text-align:left!important;hyphens:none!important}'
  +'html.dys svg,html.dys svg *{letter-spacing:normal!important;word-spacing:normal!important}'
  +'html.dys em,html.dys i:not([style]),html.dys cite{font-style:normal!important;font-weight:700!important}'
  +'html.dys .card,html.dys .opt,html.dys .lvb,html.dys .stp,html.dys .acard,html.dys .c2,html.dys .lesson,html.dys #dag,html.dys .bd{background-color:#fffdf3}'
  +'html.dys .nav{background:linear-gradient(to top,#fffdf3 78%,rgba(255,253,243,0))}'
  +'html.dys .opt,html.dys .btn,html.dys button{padding-top:12px;padding-bottom:12px}'
  +'html.dys .lvb{flex-wrap:wrap}html.dys .lvb>span:not(.lvn):not(.st){flex:1 1 140px;min-width:0}html.dys .lvb .st{margin-left:56px;text-align:left;white-space:normal}'
  +'html.dys #lis .btn,html.dys .btn.alt.small{font-size:1.05rem;min-height:52px}'
  +'#dysbtn{position:fixed;bottom:max(14px,env(safe-area-inset-bottom,0px));right:max(10px,env(safe-area-inset-right,0px));z-index:200;display:inline-flex;align-items:center;justify-content:center;gap:6px;'
  +'font:700 14px/1.2 "Lexend",Verdana,Arial,sans-serif;letter-spacing:0;padding:8px 14px;min-height:44px;min-width:44px;border-radius:99px;border:2px solid #2a6fdb;background:#fff;color:#1d57b3;cursor:pointer;box-shadow:0 2px 6px rgba(0,0,0,.18)}'
  +'#dysbtn[aria-pressed="true"]{background:#2a6fdb;color:#fff;border-color:#1d57b3}'
  +'#dysbtn .aa{font-weight:800;font-size:16px}'
  +'#dysbtn.sm{padding:0;width:44px;height:44px}#dysbtn.sm .txt{display:none}'
  +'html.dys #dysbtn,html.dys #dysbtn *{font-family:"Lexend",Verdana,Arial,sans-serif!important;font-size:14px!important;letter-spacing:0!important;word-spacing:0!important;line-height:1.2!important}'
  +'html.dys #dysbtn .aa{font-size:16px!important}'
  +'body:has(.nav) #dysbtn{bottom:calc(96px + env(safe-area-inset-bottom,0px))}';
  function style(){var s=document.createElement('style');s.id='dys-css';s.textContent=css;(document.head||document.documentElement).appendChild(s)}
  function font(){if(document.getElementById('dys-font'))return;var l=document.createElement('link');l.id='dys-font';l.rel='stylesheet';
    l.href='https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&display=swap';(document.head||document.documentElement).appendChild(l)}
  function apply(){
    document.documentElement.classList.toggle('dys',on);
    if(on)font();
    if(btn){btn.setAttribute('aria-pressed',on?'true':'false');btn.innerHTML='<span class="aa" aria-hidden="true">Aa</span><span class="txt">Dyslexie: '+(on?'aan':'uit')+'</span>';btn.setAttribute('aria-label','Dyslexie-stand: '+(on?'aan':'uit'))}
  }
  function mk(){
    if(document.getElementById('dysbtn'))return;
    btn=document.createElement('button');btn.type='button';btn.id='dysbtn';
    btn.title='Maakt de letters en de pagina rustiger om te lezen';
    btn.onclick=function(){on=!on;try{localStorage.setItem(KEY,on?'1':'0')}catch(e){}apply();if(btn._flash)btn._flash()};
    document.body.insertBefore(btn,document.body.firstChild);apply();var held=false,tm=0;var small=function(){btn.classList.toggle('sm',held||(window.pageYOffset||document.documentElement.scrollTop||0)>40)};var later=function(ms){clearTimeout(tm);tm=setTimeout(function(){held=true;small()},ms)};window.addEventListener('scroll',small,{passive:true});btn._flash=function(){held=false;small();later(3000)};later(5000);
  }
  style();apply();
  if(document.body)mk();else document.addEventListener('DOMContentLoaded',mk);
})();
