/* ---------- de les ---------- */
const META={title:'5.1 Hoeken',intro:'Wat is een hoek? Speel met klokken en hoeken. Maak daarna de opdrachten uit je boek stap voor stap. Aan het eind doe je een snelle toets.'};
const PAD='Hoofdstuk 5 Hoeken · 5.1 Hoeken';
const LV=[
 {t:'De hoek op de klok',sub:'Wijzers maken een hoek',n:6,gen:mk(['tijd','tijd','groot','klein','dubbel','half']),steps:[
  {h:'Wijzers maken een hoek',txt:'De wijzers van een klok maken een hoek.\nHet roze boogje laat de hoek zien.\nTik op een tijd en kijk.',w:'klok'},
  {h:'Welke hoek is groter?',txt:'Kijk naar het roze boogje.\nHoe groter het boogje, hoe groter de hoek.\nTik op de goede klok.',w:'groot'},
  {h:'Twee keer zo groot',txt:'Om 2 uur is de hoek 2 uren groot.\nTwee keer zo groot is 4 uren. Dan is het 4 uur.\nKies een tijd en kijk.',w:'dubbel'},
  {h:'Zo staat het in je boek',txt:'Dit staat in je boek. Je weet het al!',fig:IMGB('p10-theorie.png','Zo staat het in je boek (bladzijde 10).')}]},
 {t:'Hoekpunt en benen',sub:'De delen van een hoek',n:6,gen:mk(['deel','deel','letter','teken','langer','benen']),steps:[
  {h:'De delen van een hoek',txt:'Een hoek heeft een hoekpunt, twee benen en een boogje.\nTik op een knop en kijk.',w:'delen'},
  {h:'Hoek P schrijf je ∠P',txt:'Bij wiskunde schrijf je het teken ∠ voor het woord hoek.\nDe letter staat bij het hoekpunt.\nKies een letter.',w:'teken'},
  {h:'Langere benen',txt:'Maak de benen langer of korter.\nVerandert de hoek dan?\nSchuif en kijk.',w:'langer'},
  {h:'Zo staat het in je boek',txt:'Dit staat in je boek. Je weet het al!',fig:IMGB('p11-theorie.png','Zo staat het in je boek (bladzijde 11).')}]},
 {t:'Hoeken vergelijken',sub:'Welke hoek is groter?',n:6,gen:mk(['vgl2','vgl2','vgl3','zin','sorteer','overtrek']),steps:[
  {h:'Leg hoek op hoek',txt:'Zo vergelijk je twee hoeken.\nLeg het hoekpunt op het hoekpunt. Leg één been op één been.\nLigt de hoek er binnen? Dan is hij kleiner.',w:'leg'},
  {h:'Van klein naar groot',txt:'Zet de hoeken op volgorde.\nTik eerst op de kleinste hoek.\nKijk niet naar de lengte van de benen!',w:'sorteer'}]}
];
const NQ=LV.reduce((a,l)=>a+(l.n||5),0);
M.sorteer0=M.sorteer;M.sorteer=()=>{const q=M.sorteer0();q.cols=true;return q};
/* snelle toets: 10 vragen door elkaar uit alle onderdelen */
const TPLAN=[[0,'tijd'],[0,'groot'],[0,'dubbel'],[1,'deel'],[1,'teken'],[1,'langer'],[2,'vgl2'],[2,'vgl3'],[2,'sorteer'],[2,'overtrek']];
const TOETS=()=>build(TPLAN,e=>{const q=M[e[1]]();if(q)q.part=e[0];return q});
/* ---------- opdrachten uit het boek: alleen stappen ---------- */
const BOOK=[
 {id:'o1',page:10,nr:'1',title:'Klokken aflezen',steps:[
  'a: Kijk naar klok 1. Welke tijd geeft de klok aan? Schrijf het op.',
  'b: Kijk naar klok 2. Schrijf de tijd op.',
  'c: Stel je voor: de kleine wijzer van klok 2 draait een halve slag verder. Een halve slag is 6 uur verder. Hoe laat is het dan? Schrijf het op.']},
 {id:'o2',page:10,nr:'2',title:'Klokken in de wereld',steps:[
  'Kijk naar de 5 klokken: Tokio, New York, Londen, Moskou en Peking.',
  'a: Pak je potlood. Teken bij elke klok een boogje tussen de twee wijzers.',
  'b: Zoek de klok met de kleinste hoek. Schrijf op: "bij de klok van …".',
  'c: Zoek de klok met de grootste hoek. Schrijf op: "bij de klok van …".']},
 {id:'o3',page:11,nr:'3',title:'Twee keer zo groot',steps:[
  'a: Het is 2 uur. Maak de hoek tussen de wijzers twee keer zo groot. Tel eerst de uren van de hoek en verdubbel dat getal.',
  'Schrijf op hoe laat het dan kan zijn.',
  'b: Pak een rode pen of potlood. Teken in de klok die tijd. De lange wijzer staat op de 12. De korte wijzer wijst naar het uur.']},
 {id:'o4',page:11,nr:'4',title:'Beau en het horloge',steps:[
  'a: Kijk naar de klok en naar het horloge. Is het horloge even laat als de klok? Schrijf ja of nee.',
  'b: Kijk naar de wijzers. Zijn de wijzers van de klok langer of korter dan van het horloge? Omcirkel het goede woord.',
  'c: Beau zegt: "Hoe langer de wijzers, hoe groter de hoek." Denk aan de langere benen die je net hebt geprobeerd. Heeft Beau gelijk? Schrijf ja of nee.']},
 {id:'o5',page:11,nr:'5',title:'Hoekpunt en benen',steps:[
  'a: Zoek het hoekpunt van de hoek. Dat is het punt waar de twee benen elkaar raken. Schrijf de letter S erbij.',
  'b: Pak een rood potlood. Kleur de twee benen van ∠S rood.',
  'c: Pak je liniaal. Maak de twee benen langer.',
  'd: Kijk naar het boogje. Omcirkel het goede woord: wel of niet veranderd.']},
 {id:'o6',page:12,nr:'6',title:'Hoeken vergelijken',steps:[
  'a: Pak overtrekpapier en een potlood. Trek ∠A over.',
  'Leg het overtrekpapier op ∠B. Hoekpunt op hoekpunt. Één been op één been.',
  'b: Ligt ∠B binnen ∠A of steekt hij eruit? Schrijf op: groter of kleiner dan ∠A.',
  'c: Doe hetzelfde bij ∠C, ∠D, ∠E en ∠F. Welke hoeken zijn groter dan ∠A? Schrijf de letters op.',
  'd: Welke hoeken zijn kleiner dan ∠A? Schrijf de letters op.']},
 {id:'o7',page:12,nr:'7',title:'Het hek',steps:[
  'a: Kijk naar ∠P en ∠T op de foto. Welke hoek is kleiner? Schrijf de letter op.',
  'b: Kijk naar ∠Q. Welke hoeken zijn kleiner dan ∠Q? Schrijf de letters op.',
  'c: Zet alle hoeken op volgorde van klein naar groot. Begin bij de kleinste hoek. Schrijf de letters op, met ∠ ervoor.',
  'Is het moeilijk? Gebruik overtrekpapier.']},
 {id:'oL8',page:12,nr:'L8',title:'Heb je het geleerd?',steps:[
  'a: Zoek het hoekpunt van de hoek. Schrijf de letter V erbij. Kleur de benen rood.',
  'b: Welk teken schrijf je in de wiskunde voor het woord hoek? Schrijf het teken op.',
  'c: Kijk naar ∠B, ∠A en ∠C. Vul in: groter dan of kleiner dan. Vergelijk ∠B met ∠A. Vergelijk ∠A met ∠C.',
  'Zet bij elk onderdeel een vinkje: goed of nog niet goed.']},
 {id:'oO4',page:13,nr:'O4',title:'De passers',steps:[
  'a: Pak overtrekpapier. Trek de hoek van de bordpasser over.',
  'b: Leg het overtrekpapier precies op de hoek van de gewone passer.',
  'c: Zijn de hoeken even groot? Schrijf ja of nee.']},
 {id:'oO7',page:13,nr:'O7',title:'Het hek (extra hulp)',steps:[
  'a: Pak overtrekpapier. Trek ∠A over.',
  'b: Leg ∠A op ∠B. Is ∠B groter of kleiner dan ∠A? Schrijf het op.',
  'c: Leg ∠A op ∠D. Is ∠D groter of kleiner dan ∠A? Schrijf het op.',
  'd: Welke hoeken zijn groter dan ∠A? Leg ∠A ook op ∠C en ∠E. Schrijf de letters op.',
  'e: Welke hoek is groter: ∠D of ∠E? Leg ∠D op ∠E.',
  'f: Zet alle hoeken op volgorde van klein naar groot. Schrijf de letters op.']}
];
