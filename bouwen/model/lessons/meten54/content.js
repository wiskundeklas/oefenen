/* ---------- de les ---------- */
const META={title:'5.4 Hoeken meten',intro:'Meet hoeken met de kompasroos. Speel eerst met de knoppen. Maak daarna de opdrachten uit je boek stap voor stap. Aan het eind doe je een snelle toets.'};
const PAD='Hoofdstuk 5 Hoeken · 5.4 Hoeken meten';
const LV=[
 {t:'De kompasroos lezen',sub:'Graden aflezen',n:5,gen:mk(['rd','rd','rd2','dirq','cls1']),steps:[
  {h:'Een kompasroos meet hoeken',txt:'Een kompasroos meet hoeken in graden. Een graad schrijf je zo: 1°.\nBovenaan staat 0°.\nSleep de blauwe lijn en kijk.',w:'lees'},
  {h:'Met de klok mee',txt:'Je telt met de klok mee.\nVan 0° ga je naar rechts: 30°, 60°, 90°.\nTik op de knop en kijk.',w:'klok'},
  {h:'Tel de streepjes',txt:'Een klein streepje is 5°. Een langer streepje is 10°.\nTel de streepjes na het laatste getal.\nSleep de blauwe lijn.',w:'lees',o:{tick:true,start:40}}]},
 {t:'Een hoek meten',sub:'De 4 stappen',n:5,gen:mk(['ms','ms','leg','stp','stp1']),steps:[
  {h:'Hoe meet je een hoek?',txt:'Een hoek meet je in 4 stappen.\nTik steeds op de knop en kijk.',w:'stap'},
  {h:'Kies het goede been',txt:'Je meet met de klok mee.\nLeg 0° op het been waar je met de klok mee naar het andere been draait.\nTik op het goede been.',w:'been'},
  {h:'Zo staat het in je boek',txt:'Zo staan de stappen in je boek. Je weet het al!',fig:IMGB('p24-theorie.png','Zo staat het in je boek (bladzijde 24).')}]},
 {t:'Eerst schatten, dan meten',sub:'Scherp, recht of stomp?',n:5,gen:mk(['sch','kz','nm','nm','bet']),steps:[
  {h:'Kijk eerst naar de hoek',txt:'Scherp: kleiner dan 90°. Recht: precies 90°. Stomp: groter dan 90°.\nSchuif en kijk.',w:'soort'},
  {h:'Past het getal?',txt:'Kies eerst scherp, recht of stomp.\nDan zie je de graden. Past het getal bij je keuze?',w:'klopt'}]},
 {t:'Meer hoeken',sub:'Benen verlengen en optellen',n:5,gen:mk(['vl2','tri','polyQ','som','som2']),steps:[
  {h:'Verleng de benen',txt:'Zijn de benen te kort? Verleng ze met je liniaal.\nDe hoek zelf blijft even groot.',w:'verleng'},
  {h:'Hoeken in een figuur',txt:'Een driehoek heeft 3 hoeken. Een vierhoek heeft 4 hoeken.\nTik op een letter en kijk.',w:'fig'},
  {h:'Twee hoeken samen',txt:'Soms is één hoek verdeeld in ∠E₁ en ∠E₂.\nTel de twee getallen op: ∠E₁ + ∠E₂ = ∠E.\nSchuif en kijk.',w:'som'}]}
];
const NQ=LV.reduce((a,l)=>a+(l.n||5),0);
/* snelle toets: 10 vragen door elkaar uit alle onderdelen */
const TPLAN=[[0,'rd'],[0,'cls1'],[1,'ms'],[1,'leg'],[1,'stp1'],[2,'sch'],[2,'nm'],[2,'kz'],[3,'tri'],[3,'som2']];
const TOETS=()=>build(TPLAN,e=>{const q=M[e[1]]();if(q)q.part=e[0];return q});
/* ---------- opdrachten uit het boek: stap voor stap met hulp ---------- */
/* stap = {t: wat je doet, z: zo doe je dat, p: plaatje (Laat zien), s: wat je opschrijft} */
const BOOK=[
 {id:'20',page:24,nr:'20',title:'Hoeken aflezen op de kompasroos',
  doel:'Je kijkt naar drie kompasrozen. Je zegt welke soort hoek het is en je leest het getal af.',need:['potlood'],steps:[
  {t:'Zoek de twee benen van ∠P op kompasroos ❶.',z:'De twee blauwe lijnen zijn de benen. Eén blauwe lijn wijst recht omhoog: dat is 0°. De andere blauwe lijn wijst naar een getal op de rand.'},
  {t:'a: Is ∠P scherp, recht of stomp?',z:'Kijk naar de lijn die naar rechts wijst: daar staat de O (90°). Ligt het been <b>boven</b> die lijn? Dan is de hoek scherp. Precies <b>op</b> die lijn? Recht. <b>Onder</b> die lijn? Stomp.',p:'roos90'},
  {t:'b: Welk getal staat bij het rechter been?',z:'Volg het blauwe been tot de rand. Lees het getal bij de lijn. Zit de lijn tussen twee getallen? Tel de streepjes vanaf het laatste getal.',p:'lees',s:'het getal met een gradenteken, bijvoorbeeld 25°'},
  {t:'c en d: Doe hetzelfde bij ∠Q en ∠R.',z:'Eerst scherp, recht of stomp. Dan het getal. Past je getal bij je antwoord? Scherp is kleiner dan 90°. Stomp is groter dan 90°.',p:'lijn180'}]},
 {id:'21',page:25,nr:'21',title:'Hoek B meten',
  doel:'Je meet ∠B met je kompasroos. Dat doe je in vier stappen.',need:['kompasroos','geodriehoek','potlood'],steps:[
  {t:'a: Is ∠B recht, scherp of stomp?',z:'Leg de rechte hoek van je geodriehoek in de hoek. Past hij precies? Recht. Past de hoek erin? Scherp. Steekt de hoek eruit? Stomp.',p:'pap',s:'∠B is een … hoek.'},
  {t:'b: Leg het midden van je kompasroos op hoekpunt B.',z:'Hoekpunt B is het punt waar de twee benen elkaar raken. Zie je het hoekpunt door de kompasroos heen? Dan ligt hij goed.'},
  {t:'Leg de lijn van 0° op één been.',z:'Draai de kompasroos tot 0° precies op een been ligt. Bij ∠B leg je 0° op het been dat naar links loopt. Dan draai je met de klok mee naar het andere been.',p:'meet4'},
  {t:'c: Lees het getal af bij het andere been.',z:'Het getal bij dat been is de grootte van de hoek. Staat het been tussen twee getallen? Tel de streepjes vanaf het laatste getal.',s:'∠B = …°'},
  {t:'d: Klopt dit getal met je antwoord bij a?',z:'Scherp is kleiner dan 90°. Recht is precies 90°. Stomp is groter dan 90°. Past het niet? Meet nog een keer. Staat er een getal boven 180°? Dan lag 0° op het verkeerde been.',p:'lijn180',s:'ja of nee'}]},
 {id:'22',page:25,nr:'22',title:'Drie hoeken meten',
  doel:'Je meet ∠A, ∠B en ∠C met je kompasroos en schrijft de graden op.',need:['kompasroos','geodriehoek','potlood'],steps:[
  {t:'Schat eerst: is de hoek scherp, recht of stomp?',z:'Leg de rechte hoek van je geodriehoek in de hoek. Zo weet je al ongeveer of het getal kleiner of groter dan 90° wordt.',p:'pap'},
  {t:'Leg het midden van de kompasroos op het hoekpunt.',z:'Het hoekpunt is het punt waar de letter bij staat.'},
  {t:'Leg de lijn van 0° op één been.',z:'Draai met de klok mee naar het andere been. Staat dat been bij een getal boven 180°? Draai de roos om en leg 0° op het andere been.',p:'meet4'},
  {t:'Lees het getal af en schrijf het op.',z:'Past het getal bij je schatting? Zo niet, meet nog een keer.',s:'∠A is …°'},
  {t:'Doe dit ook bij ∠B en ∠C.',z:'Kies bij elke hoek opnieuw welk been 0° krijgt.'}]},
 {id:'23',page:25,nr:'23',title:'De benen verlengen',
  doel:'Je ontdekt waarom je de benen eerst langer maakt. Daarna meet je de hoeken van driehoek ABC.',need:['liniaal','kompasroos','potlood'],steps:[
  {t:'a: Waarom maak je de benen eerst langer?',z:'De getallen staan aan de rand van je kompasroos, ver van het midden. Zijn de benen korter dan de kompasroos? Dan kom je niet bij de getallen.',p:'verleng',s:'Als de benen te kort zijn, dan kan ik …'},
  {t:'b: Maak de benen van de driehoek langer.',z:'Zie je stippellijnen in je boek? Trek ze over met je liniaal. Zijn de benen dan nog te kort? Trek ze verder door.'},
  {t:'Meet ∠A met de vier stappen.',z:'Midden op hoekpunt A. 0° op één been. Met de klok mee naar het andere been. Lees het getal af.',p:'meet4'},
  {t:'Meet ook ∠B en ∠C.',z:'Schrijf het getal in de driehoek, bij het boogje.'}]},
 {id:'24',page:25,nr:'24',title:'Een vierhoek meten',
  doel:'Je kijkt eerst naar de hoeken van vierhoek ABCD. Daarna meet je ze.',need:['geodriehoek','liniaal','kompasroos'],steps:[
  {t:'a: Zijn de hoeken scherp, recht of stomp?',z:'Kijk naar de hoek <b>binnen</b> de vierhoek. Leg de rechte hoek van je geodriehoek in de hoek. Past erin = scherp. Past precies = recht. Steekt eruit = stomp.',p:'pap',s:'∠A is …, ∠B is …, ∠C is …, ∠D is …'},
  {t:'b: Maak de benen langer als ze te kort zijn.',z:'Kom je met het been niet bij de getallen van je kompasroos? Dan is het been te kort. Verleng het met je liniaal.',p:'verleng'},
  {t:'Meet ∠A met de vier stappen.',z:'Midden op hoekpunt A. 0° op één been. Met de klok mee naar het andere been. Lees het getal af. Staat er een getal boven 180°? Dan lag 0° op het verkeerde been.',p:'meet4'},
  {t:'Meet ook ∠B, ∠C en ∠D.',z:'Past het getal bij wat je bij a opschreef? Scherp is kleiner dan 90°. Stomp is groter dan 90°.',p:'lijn180',s:'het getal in de hoek, bijvoorbeeld 80°'}]},
 {id:'25',page:26,nr:'25',title:'Hoeken in bouwkranen',
  doel:'Je meet de hoeken bij de bouwkranen en schrijft de grootte op.',need:['liniaal','kompasroos','potlood'],steps:[
  {t:'Zoek de twee benen bij ∠A.',z:'Zoek het rode boogje bij de letter A. De twee delen van de kraan die daar samenkomen zijn de benen. Het punt waar ze samenkomen is het hoekpunt.',p:'hoekpunt'},
  {t:'Zijn de benen te kort? Maak ze langer.',z:'Leg je liniaal langs het been. Trek met potlood een lijn door, tot voorbij de rand van je kompasroos.',p:'verleng'},
  {t:'Meet ∠A met de vier stappen.',z:'Midden op het hoekpunt. 0° op één been. Met de klok mee. Lees het getal af. Staat er een getal boven 180°? Dan lag 0° op het verkeerde been.',p:'meet4',s:'∠A = …°'},
  {t:'Doe hetzelfde bij ∠B, ∠C, ∠D en ∠E.',z:'Schat eerst: scherp, recht of stomp? Past je getal bij je schatting?',p:'lijn180'}]},
 {id:'26',page:26,nr:'26',title:'Hoek E is verdeeld',
  doel:'Hoek E is verdeeld in twee kleinere hoeken. Je meet allebei en telt ze op.',need:['geodriehoek','kompasroos','potlood'],steps:[
  {t:'a: Is ∠E₁ recht, scherp of stomp? En ∠E₂?',z:'Kijk naar elke hoek apart: de hoek met het cijfer 1 en de hoek met het cijfer 2. Leg de rechte hoek van je geodriehoek in de hoek.',p:'pap',s:'∠E₁ is …, ∠E₂ is …'},
  {t:'b: Meet ∠E₁.',z:'Midden op het hoekpunt. 0° op één been van ∠E₁. Met de klok mee naar het andere been van ∠E₁. Lees het getal af.',p:'meet4',s:'∠E₁ = …°'},
  {t:'Meet ∠E₂.',z:'Dezelfde vier stappen. Je meet nu alleen de hoek met het cijfer 2.',s:'∠E₂ = …°'},
  {t:'c: Hoe groot zijn ∠E₁ en ∠E₂ samen?',z:'Tel de twee getallen op.',p:'som',s:'∠E₁ + ∠E₂ = …° + …° = …°'}]},
 {id:'L27',page:26,nr:'L27',title:'Vierhoek KLMN meten',
  doel:'Je meet de vier hoeken van vierhoek KLMN. Kun je het al zelf?',need:['liniaal','kompasroos','potlood'],steps:[
  {t:'Zijn de benen te kort? Maak ze langer.',z:'Is een been korter dan je kompasroos? Verleng het met je liniaal.',p:'verleng'},
  {t:'Meet ∠K met de vier stappen.',z:'Midden op het hoekpunt. 0° op één been. Met de klok mee naar het andere been. Lees het getal af.',p:'meet4',s:'het getal op de stippellijn'},
  {t:'Meet ook ∠L, ∠M en ∠N.',z:'Schat eerst: scherp, recht of stomp? Past je getal bij je schatting?',p:'lijn180'},
  {t:'Zet een vinkje.',z:'Ging het goed? Zet een vinkje bij "goed". Lukte het nog niet? Doe opdracht E8 uit je boek.'}]},
 {id:'O22',page:27,nr:'O22',title:'Hoeken meten (extra hulp)',
  doel:'Eerst lees je een hoek af die al goed gemeten staat. Daarna meet je zelf twee hoeken.',need:['kompasroos','liniaal','potlood'],steps:[
  {t:'a: Lees ∠M af op de kompasroos.',z:'De kompasroos ligt al goed op ∠M. Eén been wijst recht omhoog: dat is 0°. Lees het getal bij het blauwe been aan de rechterkant.',p:'lees',s:'∠M = …°'},
  {t:'b: Meet ∠N.',z:'Nu leg je de kompasroos zelf. Midden op hoekpunt N. 0° op één been. Met de klok mee naar het andere been. Lees het getal af.',p:'meet4',s:'∠N is …°'},
  {t:'Meet ∠O.',z:'Dezelfde vier stappen. Zijn de benen te kort? Maak ze eerst langer met je liniaal.',p:'verleng',s:'∠O is …°'}]},
 {id:'O24',page:27,nr:'O24',title:'De hoeken van een huis (extra hulp)',
  doel:'In het huis staan zes hoeken. Je zegt wat voor hoek het is en je meet hem. Alles komt in de tabel.',need:['geodriehoek','liniaal','kompasroos'],steps:[
  {t:'a: Zoek de zes hoeken in het huis.',z:'Bij elke letter, van A tot en met F, staat een boogje. Dat is de hoek.'},
  {t:'Controleer elke hoek met je geodriehoek.',z:'Leg de rechte hoek van je geodriehoek in de hoek. Past precies = recht. Past erin = scherp. Steekt eruit = stomp.',p:'pap',s:'in de tabel: recht, scherp of stomp'},
  {t:'b: Maak de benen van ∠A langer.',z:'Zijn de benen te kort? Verleng ze met je liniaal.',p:'verleng'},
  {t:'Meet ∠A met de vier stappen.',z:'Midden op het hoekpunt. 0° op één been. Met de klok mee. Lees het getal af.',p:'meet4',s:'de grootte van ∠A in de tabel'},
  {t:'Meet ook ∠B tot en met ∠F.',z:'Past je getal bij wat je bij a invulde? Scherp is kleiner dan 90°. Stomp is groter dan 90°.',p:'lijn180'}]}
];
