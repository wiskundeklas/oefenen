const mascot=()=>'<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="44" fill="#ffc533" stroke="#c98f00" stroke-width="4"/><path d="M28 72 L28 30 L72 72 Z" fill="#fff" stroke="#17324d" stroke-width="4" stroke-linejoin="round"/><path d="M28 60 L40 60 L40 72" fill="none" stroke="#d6336c" stroke-width="3.5"/></svg>';
function totalPts(){return Object.values(DB.lv).reduce((a,v)=>a+(v.pts||0),0)}
function topbar(show){$('#bar').hidden=!show;if(!show)return;$('#av').innerHTML=mascot();$('#nm').textContent=DB.name;
  $('#pt').textContent=S.mode==='toets'?('Toets: '+S.pts+' van '+S.qs.length):S.mode==='quiz'?('Punten: '+S.pts+' van '+S.qs.length):(totalPts()+' van '+NQ+' punten');
  $('#ts').textContent=DB.sound?'\u{1F3B5} Geluid aan':'\u{1F515} Geluid uit'}
function renderVP(){const box=$('#vp');loadVoices();const cur=bestVoice();let h='<h2>Kies een stem</h2>';
  if(!VOICES.length)h+='<div class="say">Op dit apparaat is geen Nederlandse stem gevonden. Daarom wordt er niet voorgelezen. Installeer een Nederlandse stem in de instellingen van je apparaat (bij Spraak), of gebruik Microsoft Edge of Google Chrome.</div>';
  else{h+='<p class="note">Tik op een stem om hem te horen. De stem die je kiest blijft bewaard.</p><div class="opts">'+VOICES.slice().sort((a,b)=>vScore(b)-vScore(a)).map((v,i)=>'<button class="opt'+(cur&&cur.name===v.name?' ok':'')+'" type="button" data-vn="'+esc(v.name)+'">'+esc(v.name)+' ('+esc(v.lang)+')'+(i===0?' · aanbevolen':'')+'</button>').join('')+'</div><p><b>Snelheid</b></p><div class="chips">'+[['Langzaam',.75],['Normaal',.9],['Snel',1.05]].map(x=>'<button type="button" class="c2'+((DB.rate||.9)===x[1]?' sel':'')+'" data-rt="'+x[1]+'">'+x[0]+'</button>').join('')+'</div>'}
  h+='<div class="row"><button class="btn alt small" id="vc" type="button">Sluiten</button></div>';box.innerHTML=h;
  $$('[data-vn]',box).forEach(b=>b.onclick=()=>{DB.voiceName=b.dataset.vn;save();speak('Hallo '+DB.name+'. Dit is de stem die je kiest.');renderVP()});
  $$('[data-rt]',box).forEach(b=>b.onclick=()=>{DB.rate=+b.dataset.rt;save();speak('Dit is de snelheid die je kiest.');renderVP()});
  $('#vc').onclick=()=>{box.hidden=true}}
$('#tp').onclick=()=>{const v=$('#vp');v.hidden=!v.hidden;if(!v.hidden)renderVP()};
$('#ts').onclick=()=>{DB.sound=!DB.sound;save();topbar(true)};
function setProg(p){const g=$('#pg');g.hidden=p==null;if(p!=null)$('i',g).style.width=p+'%'}
const fmtT=t=>Math.floor(t/60)+':'+String(t%60).padStart(2,'0')+' min';
const starsOf=(p,n)=>{const r=p/(n||5);return r>=.9?3:r>=.7?2:r>=.5?1:0};
const starTxt=n=>'★'.repeat(n)+'☆'.repeat(3-n);

