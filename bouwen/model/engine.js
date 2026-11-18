/* ---------- onderkant: Menu, Vorige, Volgende ---------- */
function navHtml(){return '<div class="nav"><button class="btn alt" id="bMenu" type="button">Menu</button><button class="btn alt" id="bPrev" type="button">← Vorige</button><button class="btn" id="bMain" type="button">Volgende →</button></div>'}
function setMain(label,fn,off,good){const x=$('#bMain');x.textContent=label;x.disabled=!!off;x.className='btn'+(good?' good':'');x.onclick=off?null:fn}
function wireNav(prev,ask){const m=$('#bMenu'),p=$('#bPrev');p.disabled=!prev;p.onclick=prev?()=>{sfx('tap');prev()}:null;
  m.onclick=()=>{if(ask&&ask()&&!m.dataset.arm){m.dataset.arm='1';m.textContent='Zeker weten?';setTimeout(()=>{if(m.isConnected){delete m.dataset.arm;m.textContent='Menu'}},3500);return}menu()}}
const inQ=()=>S.mode==='quiz'||S.mode==='toets';
const askMenu=()=>inQ()&&S.log.length>0&&!S.fin;
function leaveQ(){if(inQ()&&S.locked&&S.snap&&$('#ans')){S.snap[S.i]=stage.innerHTML}}
function qNext(){leaveQ();S.i<S.qs.length-1?(S.i++,showQ()):(S.mode==='toets'?toetsDone():finish())}
function qPrev(){leaveQ();if(S.i>0){S.i--;showQ()}else if(S.mode==='toets')toetsIntro();else explain(S.lv,LV[S.lv].steps.length-1)}
const KNOP_OK=['Goed zo!','Super!','Knap gedaan!','Helemaal goed!'];
/* ---------- schermen ---------- */
function nameScreen(){topbar(false);setProg(null);
  stage.innerHTML='<div class="card"><h1>'+META.title+'</h1><p>'+META.intro+'</p><label for="nmi"><b>Schrijf hier je naam</b></label><div class="row"><input class="nm" id="nmi" maxlength="30" autocomplete="off"></div><div class="row"><button class="btn" id="go" type="button">Beginnen</button></div><p class="note" id="er" hidden>Schrijf eerst je naam.</p></div>';
  const go=()=>{const v=$('#nmi').value.trim();if(v.length<2){$('#er').hidden=false;return}DB.name=v;save();menu()};
  $('#go').onclick=go;$('#nmi').onkeydown=e=>{if(e.key==='Enter')go()}}
function menu(){S.lv=null;S.mode='';S.keep=false;S.fin=false;stopSpeech();topbar(true);setProg(null);window.scrollTo(0,0);
  const done=LV.every((_,i)=>DB.lv[i]&&DB.lv[i].done),T=DB.toets;
  let h='<div class="card"><h1>Hoi '+esc(DB.name)+'!</h1><p>Kies een onderdeel. Eerst speel je met de uitleg. Dan maak je vragen.</p>'+(done?'<div class="fb ok">Alle onderdelen klaar! '+totalPts()+' van '+NQ+' punten.</div>':'')+'<div class="lv">';
  LV.forEach((l,i)=>{const r=DB.lv[i];h+='<button class="lvb'+(r&&r.done?' done':'')+'" data-i="'+i+'" type="button"><span class="lvn">'+(i+1)+'</span><span><b>'+l.t+'</b><small>'+l.sub+'</small></span><span class="st">'+(r&&r.done?starTxt(starsOf(r.pts,l.n||5))+'<small>'+r.pts+' van '+(l.n||5)+'</small>':'')+'</span></button>'});
  const nb=Object.keys(DB.book).length;
  h+='<button class="lvb bk" id="bk" type="button"><span class="lvn">\u{1F4D6}</span><span><b>Opdrachten uit je boek</b><small>Stap voor stap · '+nb+' van '+BOOK.length+' klaar</small></span></button>';
  h+='<button class="lvb tt'+(T?' done':'')+'" id="tt" type="button"><span class="lvn">\u{26A1}</span><span><b>Snelle toets</b><small>Hoeveel procent weet jij?'+(T?' · laatste: '+T.last+'%':'')+'</small></span><span class="st">'+(T?T.best+'%':'')+'</span></button></div>';
  h+='<div class="row"><button class="btn alt small" id="rs" type="button">Opnieuw beginnen</button><span class="note" id="rsn"></span></div></div>';
  stage.innerHTML=h;$$('.lvb[data-i]').forEach(b=>b.onclick=()=>explain(+b.dataset.i,0));$('#bk').onclick=bookMenu;$('#tt').onclick=toetsIntro;
  let armed=0;$('#rs').onclick=function(){if(!armed){armed=1;$('#rsn').textContent='Zeker weten? Tik nog een keer. Je punten en je naam worden gewist.';setTimeout(()=>{armed=0;$('#rsn').textContent=''},4000)}else{DB={name:'',lv:{},book:{},toets:null,voice:DB.voice,sound:DB.sound,rate:DB.rate,voiceName:DB.voiceName};save();nameScreen()}}}
function explain(i,k){S.lv=i;S.mode='';stopSpeech();topbar(true);setProg(null);const L=LV[i],st=L.steps[k];
  const paras=st.txt.split('\n').map(p=>'<div class="say">'+p+'</div>').join('');
  stage.innerHTML='<div class="card"><div class="qhead"><span>Onderdeel '+(i+1)+': '+L.t+'</span><span>'+(k+1)+' van '+L.steps.length+'</span></div><h2>'+st.h+'</h2>'+paras+(st.fig?'<div>'+st.fig()+'</div>':'')+(st.w?'<div class="wd" id="wd"></div>':'')+'<div class="row"><span id="lis"></span></div>'+navHtml()+'</div>';
  if(st.w)WID[st.w]($('#wd'),st.o);
  $('#lis').appendChild(listenBtn(say(st.h+'. '+st.txt.replace(/\n/g,' '))));
  wireNav(k?()=>explain(i,k-1):null,null);
  setMain(k<L.steps.length-1?'Volgende →':'Naar de vragen →',()=>{if(k<L.steps.length-1)explain(i,k+1);else if(S.keep&&S.lv===i&&!S.fin){showQ()}else startQuiz(i)});
  window.scrollTo(0,0)}
/* ----- vragen ----- */
function startQuiz(i){S={lv:i,i:0,tries:0,pts:0,qs:LV[i].gen(),locked:false,log:[],mode:'quiz',t0:0,seq:[],snap:[],keep:true,saved:false,fin:false,one:false};showQ()}
function progress(){const L=S.qs.length;let h='';for(let i=0;i<L;i++){h+='<i style="display:inline-block;width:20px;height:20px;margin:0 2px;border-radius:50%;border:3px solid '+(i<S.log.length?(S.log[i].pts?'#4aa83a':'#e8883a'):(i===S.i?'#2a6fdb':'#c4dcf2'))+';background:'+(i<S.log.length?(S.log[i].pts?'#7ed36a':'#ffb066'):'#fff')+'"></i>'}return '<div class="center" style="margin:4px 0 10px">'+h+'</div>'}
function showQ(){stopSpeech();window.scrollTo(0,0);S.fin=false;topbar(true);const q=S.qs[S.i],n=S.qs.length,tt=S.mode==='toets';setProg(S.i/n*100);
  const lastLab=S.i===n-1?'Klaar ▶':'Volgende →';
  if(S.snap[S.i]){stage.innerHTML=S.snap[S.i];S.locked=true;$('#lis').innerHTML='';$('#lis').appendChild(listenBtn(q.say||say(q.text)));wireNav(qPrev,askMenu);setMain(lastLab,qNext,false,true);return}
  S.t0=Date.now();S.tries=0;S.locked=false;S.seq=[];
  let h='<div class="card"><div class="qhead"><span>'+(tt?'⚡ Snelle toets':LV[S.lv].t)+'</span><span>Vraag '+(S.i+1)+' van '+n+'</span></div>'+progress();
  if(q.fig)h+=q.fig;
  h+='<div class="q">'+q.text+'</div><div id="ans">';
  if(q.type==='mc')h+='<div class="opts'+(q.two?' two':'')+(q.four?' four':'')+'">'+q.opts.map(o=>'<button class="opt" type="button" data-v="'+esc(o.v)+'">'+o.h+'</button>').join('')+'</div>';
  else if(q.type==='order'){const cs=shuffle(q.cards.map((c,i)=>i));h+='<div class="opts'+(q.cols?' c3':'')+'" id="ord">'+cs.map(i=>'<button class="opt" type="button" data-v="'+i+'">'+q.cards[i].h+'<span class="nb" hidden></span></button>').join('')+'</div>'}
  else if(q.type==='custom')h+='<div id="cq"></div>';
  h+='</div><div id="fbk" role="status" aria-live="polite"></div><div class="row"><span id="lis"></span></div>'+navHtml()+'</div>';
  stage.innerHTML=h;$('#lis').appendChild(listenBtn(q.say||say(q.text)));
  wireNav(qPrev,askMenu);setMain(lastLab,qNext,true);
  if(q.type==='mc')$$('.opt').forEach(b=>b.onclick=()=>judge(b.dataset.v===q.ans,b));
  else if(q.type==='custom')q.mount($('#cq'),(ok,msg)=>judge(ok,null,msg));
  else if(q.type==='order')$$('#ord > button').forEach(b=>b.onclick=()=>{if(S.locked||S.seq.includes(+b.dataset.v))return;sfx('tap');S.seq.push(+b.dataset.v);const nb=$('.nb',b);nb.hidden=false;nb.textContent=S.seq.length;b.classList.add('sel');
    if(S.seq.length===q.cards.length){const ok=S.seq.every((v,i)=>q.cards[v].r===i);if(ok)judge(true);else{judge(false,null,'Nog niet goed. De volgorde klopt niet.'+(S.one?'':' Begin opnieuw.'));if(!S.locked){S.seq=[];$$('#ord > button').forEach(x=>{x.classList.remove('sel');$('.nb',x).hidden=true})}}}})}
function fb(k,t){$('#fbk').innerHTML='<div class="fb '+k+'">'+t+'</div>'}
function judge(ok,btn,msg){if(S.locked)return;const q=S.qs[S.i];
  if(ok){S.locked=true;sfx('ok');const aw=S.tries===0?1:0,sec=Math.round((Date.now()-S.t0)/1000);S.pts+=aw;S.log.push({pts:aw,sec,part:q.part});topbar(true);if(btn)btn.classList.add('ok');
    fb('ok',pick(KNOP_OK)+(S.one?'':' '+(aw?'+1 punt':'Geen punt, want het was niet de eerste keer goed.')));endQ()}
  else{if(S.one)S.tries=2;S.tries++;sfx('no');if(btn){btn.classList.add('no');btn.disabled=true}
    if(S.tries===1)fb('no',msg||'Nog niet goed. Probeer het nog een keer.');
    else if(S.tries===2)$('#fbk').innerHTML='<div class="fb no">'+(msg||'Nog niet goed.')+'</div><div class="fb tip">'+q.tip+'</div>';
    else{S.locked=true;const sec=Math.round((Date.now()-S.t0)/1000);S.log.push({pts:0,sec,part:q.part});
      if(q.type==='mc')$$('.opt').forEach(b=>{if(b.dataset.v===q.ans)b.classList.add('ok')});
      if(q.type==='order'){const o=q.cards.map((c,i)=>i).sort((a,b)=>q.cards[a].r-q.cards[b].r);$$('#ord > button').forEach(b=>{const nb=$('.nb',b);nb.hidden=false;nb.textContent=o.indexOf(+b.dataset.v)+1})}
      if(q.reveal)q.reveal($('#cq'));
      $('#fbk').innerHTML='<div class="fb no">Het goede antwoord is: '+q.show+'</div>'+(S.one?'':'<div class="fb tip">'+q.tip+'</div>');endQ()}}}
function endQ(){$$('.opt').forEach(b=>b.disabled=true);setMain(S.i===S.qs.length-1?'Klaar ▶':'Volgende →',qNext,false,true);$('#bMain').focus()}
function finish(){setProg(100);window.scrollTo(0,0);const i=S.lv,p=S.pts,n=S.qs.length,old=DB.lv[i]||{};
  const tot=S.log.reduce((a,x)=>a+x.sec,0);
  if(!S.saved){S.saved=true;DB.lv[i]={done:true,pts:Math.max(old.pts||0,p),last:p,time:tot,n:(old.n||0)+1};save()}
  S.mode='';S.fin=true;topbar(true);sfx('win');
  const s=starsOf(p,n),r=p/n,all=LV.every((_,j)=>DB.lv[j]&&DB.lv[j].done);
  let h='<div class="card center"><h1>Onderdeel '+(i+1)+' klaar!</h1><div class="stars">'+starTxt(s)+'</div><p class="big">'+p+' van '+n+' meteen goed</p><p>'+(r>=.9?'Fantastisch!':r>=.7?'Heel goed gedaan!':r>=.5?'Goed bezig. Probeer nog een keer voor meer sterren.':'Blijf oefenen, dan wordt het steeds makkelijker.')+'</p>';
  if(all)h+='<div class="fb ok">Alle '+LV.length+' onderdelen klaar! '+totalPts()+' van '+NQ+' punten.</div>';
  h+='<div class="row" style="justify-content:center"><button class="btn alt" id="ag" type="button">Nog een keer</button></div>'+navHtml()+'</div>';
  stage.innerHTML=h;$('#ag').onclick=()=>startQuiz(i);
  wireNav(()=>{S.i=n-1;S.mode='quiz';showQ()},null);
  if(i<LV.length-1)setMain('Volgende →',()=>explain(i+1,0));else setMain('Naar het boek ▶',bookMenu)}
/* ----- opdrachten uit het boek: alleen stappen ----- */
function bookMenu(){S.mode='';S.keep=false;S.fin=false;stopSpeech();topbar(true);setProg(null);window.scrollTo(0,0);
  const pages=[...new Set(BOOK.map(b=>b.page))];
  let h='<div class="card"><h1>Opdrachten uit je boek</h1><div class="where">Pak je boek. Zoek <b>'+PAD+'</b>. Kies de opdracht waar je mee bezig bent.</div>';
  pages.forEach(pg=>{h+='<h3>Bladzijde '+pg+'</h3><div class="lv">'+BOOK.filter(b=>b.page===pg).map(b=>'<button class="lvb bk" data-id="'+b.id+'" type="button"><span class="lvn" style="font-size:.95rem">'+b.nr+'</span><span><b>Opdracht '+b.nr+'</b><small>'+b.title+'</small></span><span class="st">'+(DB.book[b.id]?'✓':'')+'</span></button>').join('')+'</div>'});
  h+=navHtml()+'</div>';
  stage.innerHTML=h;$$('.lvb[data-id]').forEach(b=>b.onclick=()=>bookEx(b.dataset.id));
  wireNav(()=>{S.lv=LV.length-1;explain(LV.length-1,LV[LV.length-1].steps.length-1)},null);setMain('Eerste opdracht →',()=>bookEx(BOOK[0].id))}
function bookEx(id){stopSpeech();topbar(true);setProg(null);S.mode='';const B=BOOK.find(x=>x.id===id),ix=BOOK.indexOf(B),isL=ix===BOOK.length-1,file='boek/p'+B.page+'-opdracht-'+B.nr+'.png';
  stage.innerHTML='<div class="card"><div class="badges"><span class="badge">Bladzijde '+B.page+'</span><span class="badge o">Opdracht '+B.nr+'</span></div><h2>'+B.title+'</h2>'
   +'<div class="where">Pak je boek. Sla open <b>bladzijde '+B.page+'</b> en zoek <b>opdracht '+B.nr+'</b>.</div>'
   +'<a href="'+file+'" target="_blank" rel="noopener"><img class="bk" src="'+file+'" alt="Opdracht '+B.nr+' uit je boek, bladzijde '+B.page+'"></a><p class="note center" style="margin:0">Tik op de afbeelding om groter te zien.</p>'
   +'<h3>Wat moet je doen?</h3><p class="note" style="margin:0 0 6px">Tik een stap aan als je hem gedaan hebt.</p><div id="sts">'+B.steps.map((t,i)=>'<div class="stp" role="button" tabindex="0" data-k="'+i+'"><span class="n">'+(i+1)+'</span><span>'+t+'</span></div>').join('')+'</div><div id="sd"></div>'
   +'<div class="row"><span id="lis"></span></div>'+navHtml()+'</div>';
  $('#lis').appendChild(listenBtn(say('Opdracht '+B.nr+'. '+B.title+'. Wat moet je doen? '+B.steps.map((t,i)=>'Stap '+(i+1)+'. '+t).join(' '))));
  const upd=()=>{const n=$$('#sts .stp.done').length;$('#sd').innerHTML=n===B.steps.length?'<div class="fb ok">Opdracht '+B.nr+' klaar! Goed gedaan.</div>':'';if(n===B.steps.length&&!DB.book[B.id]){DB.book[B.id]=1;save();sfx('win')}};
  $$('#sts .stp').forEach(el=>{const tg=()=>{sfx('tap');el.classList.toggle('done');const sp=$('.n',el);sp.textContent=el.classList.contains('done')?'✓':(+el.dataset.k+1);upd()};el.onclick=tg;el.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();tg()}}});
  wireNav(()=>ix>0?bookEx(BOOK[ix-1].id):bookMenu(),null);
  setMain(isL?'Naar de toets ▶':'Volgende opdracht →',()=>{if(!DB.book[B.id]){DB.book[B.id]=1;save()}isL?toetsIntro():bookEx(BOOK[ix+1].id)},false,isL);
  window.scrollTo(0,0)}
/* ----- snelle toets ----- */
function toetsIntro(){S.mode='';S.keep=false;S.fin=false;stopSpeech();topbar(true);setProg(null);window.scrollTo(0,0);const T=DB.toets;
  stage.innerHTML='<div class="card center"><h1>⚡ Snelle toets</h1><p class="big">10 vragen</p><p>Je hebt 1 kans per vraag. Aan het eind zie je hoeveel procent je weet van deze les.</p>'+(T?'<div class="fb ok">Laatste keer: <b>'+T.last+'%</b> · Beste: <b>'+T.best+'%</b></div>':'')+navHtml()+'</div>';
  wireNav(()=>bookEx(BOOK[BOOK.length-1].id),null);setMain(T?'Toets opnieuw ▶':'Start de toets ▶',startToets,false,true)}
function startToets(){S={lv:null,i:0,tries:0,pts:0,qs:TOETS(),locked:false,log:[],mode:'toets',t0:0,seq:[],snap:[],keep:false,saved:false,fin:false,one:true};showQ()}
function toetsDone(){setProg(100);window.scrollTo(0,0);const n=S.qs.length,p=S.pts,pct=Math.round(p/n*100),old=DB.toets||{};
  if(!S.saved){S.saved=true;DB.toets={last:pct,best:Math.max(old.best||0,pct),n:(old.n||0)+1};save()}
  S.mode='';S.fin=true;topbar(true);sfx('win');
  const kl=pct>=90?'good':pct>=60?'mid':'low',msg=pct>=90?'Wauw! Je weet bijna alles van deze les.':pct>=70?'Goed! Je weet de meeste dingen.':pct>=50?'Je bent op weg. Oefen de onderdelen hieronder nog een keer.':'Nog even oefenen. Doe de onderdelen hieronder nog een keer.';
  const miss={};S.log.forEach(x=>{if(x.part!=null&&!x.pts)miss[x.part]=(miss[x.part]||0)+1});
  const weak=Object.keys(miss).map(Number).sort((a,b)=>a-b);
  let h='<div class="card center"><h1>Jouw resultaat</h1><div class="pct '+kl+'">'+pct+'%</div><p class="big">'+p+' van '+n+' goed</p><p>'+msg+'</p>';
  if(weak.length)h+='<div style="text-align:left"><h3>Oefen nog een keer</h3><div class="lv">'+weak.map(j=>'<button class="lvb" data-w="'+j+'" type="button"><span class="lvn">'+(j+1)+'</span><span><b>'+LV[j].t+'</b><small>'+miss[j]+' fout</small></span></button>').join('')+'</div></div>';
  else h+='<div class="fb ok">Alles goed! Je hoeft niets meer te oefenen.</div>';
  h+='<div class="row" style="justify-content:center"><button class="btn alt" id="ag" type="button">Toets opnieuw</button></div>'+navHtml()+'</div>';
  stage.innerHTML=h;$('#ag').onclick=startToets;$$('[data-w]').forEach(b=>b.onclick=()=>explain(+b.dataset.w,0));
  wireNav(()=>{S.i=n-1;S.mode='toets';showQ()},null);setMain('Naar het menu ▶',menu,false,true)}
window.BR={S:()=>S,LV,BOOK,M,WID,TOETS};
if(DB.name)menu();else nameScreen();
