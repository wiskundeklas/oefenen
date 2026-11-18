/* ---------- gedeelde hulpjes ---------- */
const O=(v,h)=>({v,h:h==null?v:h});
const chipsH=(list,sel,att,f)=>'<div class="chips">'+list.map(x=>'<button type="button" class="c2'+(String(sel)===String(x)?' sel':'')+'" '+att+'="'+x+'">'+(f?f(x):x)+'</button>').join('')+'</div>';
function build(plan,make){const seen=new Set(),out=[];let t=0;plan=shuffle(plan);
  while(out.length<plan.length&&t<800){t++;const q=make(plan[out.length]);if(!q||seen.has(q.key))continue;seen.add(q.key);out.push(q)}
  return out}
const IMGB=(f,t)=>()=>'<img class="bk" src="boek/'+f+'" alt="'+t+'"><p class="note center">'+t+'</p>';
