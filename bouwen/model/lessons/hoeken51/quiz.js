/* ---------- vragen ---------- */
const LETS='ABCDEFPQRST'.split('');
const hrs=(ans,cand)=>{const s=[ans];shuffle(cand.filter(x=>x>=1&&x<=11&&x!==ans)).forEach(x=>{if(s.length<4&&!s.includes(x))s.push(x)});return shuffle(s).map(v=>O(String(v),v+' uur'))};
const ROT=()=>ri(-25,25);
function dist3(){ // drie verschillende hoeken, de grootste krijgt soms de kortste benen
  const ds=shuffle([25,35,45,55,65,75,90,105,120,135,150]);let a=[];for(const d of ds){if(a.every(x=>Math.abs(x-d)>=18))a.push(d);if(a.length===3)break}return a}
const lensFor=(ds,tricky)=>{const L=shuffle([32,40,46]);if(!tricky)return ds.map((d,i)=>L[i]);const o=ds.map((d,i)=>i).sort((i,j)=>ds[i]-ds[j]),len=[];const asc=[32,40,46];o.forEach((ix,r)=>len[ix]=asc[2-r]);return len};
const gl=(ids)=>shuffle(LETS).slice(0,ids);
const M={
 /* onderdeel 1: de klok */
 tijd:()=>{const h=pick(UREN);return{key:'tijd'+h,type:'mc',text:'Hoe laat is het op de klok?',fig:clockSvg(h,200),opts:hrs(h,[h+1,h-1,h+2,h-2,h+3]),ans:String(h),tip:'De korte, dikke wijzer is de uurwijzer. Hij laat het uur zien. De lange wijzer staat op de 12.',show:h+' uur'}},
 groot:()=>{const hs=[];while(hs.length<3){const h=pick(UREN);if(hs.every(x=>uurD(x)!==uurD(h)))hs.push(h)}const L=['A','B','C'],big=hs.indexOf(hs.slice().sort((a,b)=>uurD(a)-uurD(b))[2]);
  return{key:'gr'+hs.join('-'),type:'mc',text:'Bij welke klok is de hoek tussen de wijzers het grootst?',fig:clocksRow(hs,L.map(x=>'Klok '+x)),opts:L.map(x=>O(x,'Klok '+x)),ans:L[big],tip:'Kijk naar het roze boogje. Het grootste boogje hoort bij de grootste hoek.',show:'Klok '+L[big]}},
 klein:()=>{const hs=[];while(hs.length<3){const h=pick(UREN);if(hs.every(x=>uurD(x)!==uurD(h)))hs.push(h)}const L=['A','B','C'],sm=hs.indexOf(hs.slice().sort((a,b)=>uurD(a)-uurD(b))[0]);
  return{key:'kl'+hs.join('-'),type:'mc',text:'Bij welke klok is de hoek tussen de wijzers het kleinst?',fig:clocksRow(hs,L.map(x=>'Klok '+x)),opts:L.map(x=>O(x,'Klok '+x)),ans:L[sm],tip:'Kijk naar het roze boogje. Het kleinste boogje hoort bij de kleinste hoek.',show:'Klok '+L[sm]}},
 dubbel:()=>{const [a,b]=pick(DUB);return{key:'db'+a,type:'mc',text:'Het is '+a+' uur. De hoek tussen de wijzers wordt twee keer zo groot. Hoe laat kan het dan zijn?',say:'Het is '+a+' uur. De hoek tussen de wijzers wordt twee keer zo groot. Hoe laat kan het dan zijn?',fig:clockSvg(a,170),opts:hrs(b,[a+1,b+1,b-1,a-1,b+2].filter(x=>uurD(x)!==uurD(b))),ans:String(b),tip:'Om '+a+' uur is de hoek '+uurD(a)/30+' uren groot. Twee keer zo groot is '+uurD(b)/30+' uren. Dus '+b+' uur.',show:b+' uur'}},
 half:()=>{const h=pick(UREN),t=(h+5)%12+1;return{key:'half'+h,type:'mc',text:'Het is '+h+' uur. De kleine wijzer draait een halve slag verder. Hoe laat is het dan?',fig:clockSvg(h,170),opts:hrs(t,[t+1,t-1,h,h+1,t+2]),ans:String(t),tip:'Een halve slag is een halve cirkel. Dat is 6 uur verder. '+h+' uur en dan 6 uur verder.',show:t+' uur'}},
 /* onderdeel 2: delen van een hoek */
 deel:()=>{const p=pick(['hoekpunt','been','boogje']);return{key:'deel'+p+ri(0,3),type:'mc',text:'Wat is het gekleurde deel van de hoek?',fig:angBig({d:pick([40,50,60]),hi:p}),opts:shuffle([O('hoekpunt','Het hoekpunt'),O('been','Een been'),O('boogje','Het boogje')]),ans:p,tip:'Het hoekpunt is het punt waar de benen elkaar raken. De benen zijn de lijnen. Het boogje staat tussen de benen.',show:p==='hoekpunt'?'Het hoekpunt':p==='been'?'Een been':'Het boogje'}},
 letter:()=>{const L=shuffle(['A','B','C']);return{key:'let'+L.join(''),type:'mc',text:'Bij welke letter ligt het hoekpunt?',fig:ang3(0,L),opts:['A','B','C'].map(x=>O(x,'Letter '+x)),ans:L[0],tip:'Het hoekpunt is het punt waar de twee benen elkaar raken.',show:'Letter '+L[0]}},
 teken:()=>{const L=pick(LETS);return{key:'tek'+L,type:'mc',text:'Hoe schrijf je "hoek '+L+'"?',say:'Hoe schrijf je hoek '+L+'?',opts:shuffle([O('goed','∠'+L),O('f1',L+'°'),O('f2','∟'+L),O('f3',L+'∠')]),ans:'goed',tip:'Voor het woord hoek schrijf je het teken ∠. Daarachter komt de letter.',show:'∠'+L}},
 langer:()=>{const v=ri(0,1);if(v)return{key:'lg1',type:'mc',two:true,text:'Beau zegt: "Hoe langer de benen, hoe groter de hoek." Heeft Beau gelijk?',opts:[O('nee','Nee'),O('ja','Ja')],ans:'nee',tip:'De benen langer maken verandert de hoek niet. Het boogje blijft even groot.',show:'Nee'};
   return{key:'lg0',type:'mc',text:'Je maakt de benen van een hoek langer. Wat gebeurt er met de hoek?',opts:shuffle([O('zelfde','De hoek blijft even groot'),O('groter','De hoek wordt groter'),O('kleiner','De hoek wordt kleiner')]),ans:'zelfde',tip:'De benen langer maken verandert de hoek niet. Het boogje blijft even groot.',show:'De hoek blijft even groot'}},
 benen:()=>{const k=pick([['Hoeveel benen heeft een hoek?',2,[1,2,3,4]],['Hoeveel hoekpunten heeft een hoek?',1,[1,2,3,4]]]);return{key:'ben'+k[1],type:'mc',text:k[0],opts:k[2].map(x=>O(String(x),String(x))),ans:String(k[1]),tip:'Een hoek heeft 1 hoekpunt en 2 benen.',show:String(k[1])}},
 /* onderdeel 3: hoeken vergelijken */
 vgl2:()=>{const ds=dist3().slice(0,2),L=shuffle(['A','B']),len=lensFor(ds,Math.random()<.6),w=pick(['groter','kleiner']);
  const want=w==='groter'?(ds[0]>ds[1]?0:1):(ds[0]<ds[1]?0:1);
  return{key:'v2'+ds.join('-')+w,type:'mc',two:true,text:'Welke hoek is '+w+'?',fig:angRow(ds.map((d,i)=>({d,len:len[i],rot:ROT(),lab:L[i]}))),opts:L.map(x=>O(x,'∠'+x)),ans:L[want],tip:'Kijk niet naar de lengte van de benen. Kijk naar de opening tussen de benen. Of leg de ene hoek op de andere.',show:'∠'+L[want]}},
 vgl3:()=>{const ds=dist3(),L=gl(3),len=lensFor(ds,Math.random()<.5),w=pick(['grootst','kleinst']),idx=ds.map((d,i)=>i).sort((a,b)=>ds[a]-ds[b]),want=w==='grootst'?idx[2]:idx[0];
  return{key:'v3'+ds.join('-')+w,type:'mc',text:'Welke hoek is het '+w+'?',fig:angRow(ds.map((d,i)=>({d,len:len[i],rot:ROT(),lab:L[i]}))),opts:L.map(x=>O(x,'∠'+x)),ans:L[want],tip:'Kijk niet naar de lengte van de benen. Kijk naar de opening tussen de benen.',show:'∠'+L[want]}},
 zin:()=>{const ds=dist3().slice(0,2),len=lensFor(ds,Math.random()<.5),big=ds[1]>ds[0];
  return{key:'zin'+ds.join('-'),type:'mc',two:true,text:'Vul in: ∠B is ... ∠A.',fig:angRow([{d:ds[0],len:len[0],rot:ROT(),lab:'A'},{d:ds[1],len:len[1],rot:ROT(),lab:'B'}]),opts:shuffle([O('gr','groter dan'),O('kl','kleiner dan')]),ans:big?'gr':'kl',tip:'Kijk naar de opening. Is de opening van ∠B groter dan die van ∠A?',show:big?'groter dan':'kleiner dan'}},
 sorteer:()=>{const ds=dist3().sort((a,b)=>a-b),L=gl(3),len=lensFor(ds,Math.random()<.5),it=ds.map((d,i)=>({d,lab:L[i],len:len[i],rot:ROT(),r:i}));
  return{key:'so'+ds.join('-'),type:'order',text:'Tik de hoeken aan van klein naar groot.',say:'Tik de hoeken aan. Begin bij de kleinste hoek.',cards:shuffle(it).map(x=>({h:'<span style="display:block;width:100%">'+angCard(x)+'</span>',r:x.r})),tip:'Begin bij de kleinste hoek. Kijk naar de opening tussen de benen.',show:it.map(x=>'∠'+x.lab).join(', ')}},
 overtrek:()=>{const v=pick(['in','uit','even']);
  const T={in:['Je legt ∠B op ∠A. ∠B ligt helemaal binnen ∠A. Welke hoek is groter?','A','∠A is groter. ∠B past erin.'],uit:['Je legt ∠B op ∠A. ∠B steekt buiten ∠A uit. Welke hoek is groter?','B','∠B is groter. Hij steekt eruit.'],even:['Je legt ∠B op ∠A. De benen liggen precies op elkaar. Wat weet je dan?','even','Even groot. De benen vallen precies op elkaar.']}[v];
  return{key:'ov'+v,type:'mc',text:T[0],opts:v==='even'?shuffle([O('even','De hoeken zijn even groot'),O('A','∠A is groter'),O('B','∠B is groter')]):shuffle([O('A','∠A'),O('B','∠B'),O('even','Even groot')]),ans:T[1],tip:'Ligt de hoek binnen de andere hoek? Dan is hij kleiner. Steekt hij eruit? Dan is hij groter.',show:T[2]}}
};
const mk=plan=>()=>build(plan,t=>M[t]());
