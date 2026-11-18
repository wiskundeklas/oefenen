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
/* ---------- opdrachten uit het boek: stap voor stap met hulp ---------- */
/* stap = {t: wat je doet, z: zo doe je dat, p: plaatje (Laat zien), s: wat je opschrijft} */
const BOOK=[
 {id:'o1',page:10,nr:'1',title:'Klokken aflezen',
  doel:'Je leest de tijd af op twee klokken. Daarna draait een wijzer een halve slag.',need:['potlood'],steps:[
  {t:'a: Welke tijd geeft klok 1 aan?',z:'De korte wijzer wijst het uur aan. De lange wijzer wijst de minuten aan. Staat de lange wijzer op de 12? Dan is het een heel uur. Kijk dan alleen naar de korte wijzer.',p:'klok',s:'bijvoorbeeld: 4 uur'},
  {t:'b: Doe hetzelfde bij klok 2.',z:'Eerst: staat de lange wijzer op de 12? Dan kijk je naar het getal van de korte wijzer.'},
  {t:'c: Draai de korte wijzer van klok 2 een halve slag.',z:'Een halve slag is 6 uur verder. Tel 6 uur op bij de tijd van klok 2. Gaat het voorbij de 12? Dan begin je weer bij 1.',p:'klokslag',s:'hoe laat het dan is'}]},
 {id:'o2',page:10,nr:'2',title:'Klokken in de wereld',
  doel:'Je kijkt naar de hoek tussen de wijzers van vijf klokken. Je zoekt de kleinste en de grootste hoek.',need:['potlood'],steps:[
  {t:'a: Zoek de twee wijzers op elke klok.',z:'De hoek zit tussen de twee wijzers. Het hoekpunt is het midden van de klok, waar de wijzers aan vastzitten.'},
  {t:'a: Teken in elke klok een boogje tussen de wijzers.',z:'Zet je potlood bij de ene wijzer. Teken een klein boogje naar de andere wijzer. Het boogje komt in de kleine ruimte tussen de wijzers.',p:'klokhoek'},
  {t:'b: Bij welke klok is de hoek het kleinst?',z:'Staan de wijzers dicht bij elkaar? Dan is de hoek klein. Vergelijk de boogjes van de vijf klokken.',s:'bij de klok van …'},
  {t:'c: Bij welke klok is de hoek het grootst?',z:'Staan de wijzers ver uit elkaar? Dan is de hoek groot.',s:'bij de klok van …'}]},
 {id:'o3',page:11,nr:'3',title:'Twee keer zo groot',
  doel:'Het is 2 uur. Je zoekt een tijd waarop de hoek tussen de wijzers twee keer zo groot is.',need:['rood','potlood'],steps:[
  {t:'Kijk hoe groot de hoek bij 2 uur is.',z:'Tel de stappen van de 12 tot de korte wijzer: 12 → 1 → 2. Dat zijn 2 stappen.',p:'klokdubbel'},
  {t:'a: Maak de hoek twee keer zo groot.',z:'Twee keer zo groot is 2 × 2 = 4 stappen. Op welk uur staat de korte wijzer dan? Het mag ook de andere kant op: 4 stappen terug vanaf de 12.',s:'hoe laat het kan zijn'},
  {t:'Controleer je antwoord.',z:'Denk je de hoek van 2 uur twee keer achter elkaar. Past dat precies in jouw nieuwe hoek?'},
  {t:'b: Teken die tijd in de klok.',z:'De lange wijzer staat op de 12. De korte wijzer wijst naar het uur dat je hebt gevonden. Gebruik een rode pen of potlood.'}]},
 {id:'o4',page:11,nr:'4',title:'Beau en het horloge',
  doel:'Je vergelijkt een grote klok met een horloge. Je kijkt of langere wijzers een grotere hoek maken.',need:['potlood'],steps:[
  {t:'a: Is het op het horloge even laat als op de klok?',z:'Lees bij allebei de tijd af: eerst de korte wijzer, dan de lange wijzer. Zijn de tijden gelijk?',p:'klok',s:'ja of nee'},
  {t:'b: Zijn de wijzers van de klok langer of korter?',z:'Vergelijk de grote klok met het kleine horloge. Welke wijzers zijn het langst? Omcirkel het goede woord.'},
  {t:'c: Heeft Beau gelijk?',z:'Beau zegt: "Hoe langer de wijzers, hoe groter de hoek." Kijk naar de hoek tussen de wijzers van de klok en van het horloge. Zijn die even groot? Denk aan de uitleg: langere benen veranderen de hoek niet.',s:'ja of nee'}]},
 {id:'o5',page:11,nr:'5',title:'Hoekpunt en benen',
  doel:'Je zoekt het hoekpunt en de benen van een hoek. Daarna maak je de benen langer.',need:['rood','liniaal','potlood'],steps:[
  {t:'a: Zoek het hoekpunt en schrijf er de letter S bij.',z:'Het hoekpunt is het punt waar de twee benen elkaar raken.',p:'hoekpunt'},
  {t:'b: Kleur de twee benen van ∠S rood.',z:'De benen zijn de twee lijnen die in het hoekpunt beginnen. Pak je rode potlood.'},
  {t:'c: Maak de benen langer.',z:'Leg je liniaal langs een been. Trek de lijn door, voorbij het einde. Doe dat bij allebei de benen.',p:'verleng'},
  {t:'d: Is de grootte van ∠S veranderd?',z:'Kijk naar het boogje en naar de opening tussen de benen. Is die opening groter geworden, of is hij gelijk gebleven? Omcirkel "wel" of "niet".'}]},
 {id:'o6',page:12,nr:'6',title:'Hoeken vergelijken',
  doel:'Je vergelijkt hoeken met overtrekpapier. Je zoekt welke hoeken groter of kleiner zijn dan ∠A.',need:['overtrekpapier','potlood'],steps:[
  {t:'a: Trek ∠A over op overtrekpapier.',z:'Leg het overtrekpapier op ∠A. Trek de twee benen en het hoekpunt over met potlood.'},
  {t:'Leg het overtrekpapier op ∠B.',z:'Hoekpunt op hoekpunt. Eén been op één been. Kijk dan naar het andere been.',p:'overtrek'},
  {t:'b: Is ∠B groter of kleiner dan ∠A?',z:'Ligt het andere been van ∠B binnen ∠A (in het papier)? Dan is ∠B kleiner. Steekt het erbuiten? Dan is ∠B groter.',p:'overtrek',s:'groter of kleiner dan ∠A'},
  {t:'c en d: Doe hetzelfde bij ∠C, ∠D, ∠E en ∠F.',z:'Maak twee rijtjes: hoeken groter dan ∠A en hoeken kleiner dan ∠A. Zet elke letter in één rijtje.',s:'groter: ∠… ; kleiner: ∠…'}]},
 {id:'o7',page:12,nr:'7',title:'Het hek',
  doel:'Je vergelijkt hoeken op een foto van een hek. Daarna zet je ze op volgorde.',need:['overtrekpapier','potlood'],steps:[
  {t:'a: Zoek ∠P en ∠T op de foto.',z:'Bij elke letter zie je witte lijnen. Dat zijn de benen van die hoek. Welke hoek is kleiner?',s:'de letter van de kleinste hoek'},
  {t:'Twijfel je? Gebruik overtrekpapier.',z:'Trek ∠P over en leg hem op ∠T: hoekpunt op hoekpunt, één been op één been. Kijk naar het andere been.',p:'overtrek'},
  {t:'b: Welke hoeken zijn kleiner dan ∠Q?',z:'Vergelijk elke andere hoek met ∠Q. Maak twee rijtjes: kleiner dan ∠Q en groter dan ∠Q.',s:'de letters met ∠ ervoor'},
  {t:'c: Zet alle hoeken op volgorde van klein naar groot.',z:'Zoek eerst de kleinste hoek. Zet hem vooraan. Zoek dan de kleinste van de rest. Ga zo door tot de grootste.',s:'∠… , ∠… , ∠… , ∠… , ∠…'}]},
 {id:'oL8',page:12,nr:'L8',title:'Heb je het geleerd?',
  doel:'Test jezelf: ken je hoekpunt, benen en het teken voor hoek? Kun je hoeken vergelijken?',need:['rood','overtrekpapier','potlood'],steps:[
  {t:'a: Zoek het hoekpunt en schrijf er de letter V bij.',z:'Het hoekpunt is het punt waar de benen elkaar raken. Kleur dan de twee benen rood.',p:'hoekpunt'},
  {t:'b: Welk teken schrijf je voor het woord hoek?',z:'Kijk bij vraag c. Voor de letters A, B en C staat een teken. Dat teken betekent "hoek".'},
  {t:'c: Vergelijk ∠B met ∠A.',z:'Trek ∠A over op overtrekpapier en leg hem op ∠B. Ligt het andere been van ∠B in het papier? Dan is ∠B kleiner. Steekt het eruit? Dan is ∠B groter.',p:'overtrek'},
  {t:'Vergelijk ∠A met ∠C.',z:'Let op de volgorde! Je schrijft: ∠A is … ∠C. Is ∠C groter dan ∠A? Dan is ∠A kleiner dan ∠C.'},
  {t:'Zet bij elk onderdeel een vinkje.',z:'Ging het goed? Vink "goed" aan. Nog niet goed? Doe de opdracht waar de pijl naar wijst (E1, E2 of E3).'}]},
 {id:'oO4',page:13,nr:'O4',title:'De passers',
  doel:'Je vergelijkt de hoek van een bordpasser met de hoek van een gewone passer.',need:['overtrekpapier','potlood'],steps:[
  {t:'a: Trek de hoek van de bordpasser over.',z:'Leg het overtrekpapier op de foto. Trek de twee benen van de bordpasser over. Het hoekpunt is bovenaan, waar de benen draaien.',p:'overtrek'},
  {t:'b: Leg het overtrekpapier op de gewone passer.',z:'Leg hoekpunt op hoekpunt. Leg één been op één been.'},
  {t:'c: Zijn de hoeken even groot?',z:'Ligt het andere been ook precies op het been van de passer? Dan zijn de hoeken even groot. De passers zelf zijn niet even groot, maar de hoek kan toch gelijk zijn.',s:'ja of nee'}]},
 {id:'oO7',page:13,nr:'O7',title:'Het hek (extra hulp)',
  doel:'Je vergelijkt de hoeken van het hek met ∠A. Je gebruikt overtrekpapier.',need:['overtrekpapier','potlood'],steps:[
  {t:'a: Trek ∠A over op overtrekpapier.',z:'Leg het overtrekpapier op ∠A. Trek de twee benen en het hoekpunt over. Dit is je "meethoek".',p:'overtrek'},
  {t:'b: Leg ∠A op ∠B. Is ∠B groter of kleiner?',z:'Hoekpunt op hoekpunt. Eén been op één been. Ligt het andere been van ∠B in het papier? Dan is ∠B kleiner. Steekt het eruit? Dan is ∠B groter.',s:'groter of kleiner dan ∠A'},
  {t:'c: Doe hetzelfde bij ∠D.',z:'Leg ∠A op ∠D, net als bij ∠B.'},
  {t:'d: Welke hoeken zijn groter dan ∠A?',z:'Doe ook ∠C en ∠E. Maak twee rijtjes: groter dan ∠A en kleiner dan ∠A.',s:'de letters met ∠ ervoor'},
  {t:'e: Welke hoek is groter, ∠D of ∠E?',z:'Trek ∠D over en leg hem op ∠E. Welke hoek steekt buiten de andere uit? Die is groter.'},
  {t:'f: Zet alle hoeken op volgorde van klein naar groot.',z:'Gebruik je rijtjes en je vergelijkingen. Begin bij de kleinste hoek.',s:'∠… , ∠… , ∠… , ∠… , ∠…'}]}
];
