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
/* ---------- opdrachten uit het boek: alleen stappen ---------- */
const BOOK=[
 {id:'20',page:24,nr:'20',title:'Hoeken aflezen op de kompasroos',steps:[
  'a: Kijk naar ∠P. Is de hoek scherp, recht of stomp? Schrijf het op.',
  'b: Kijk bij welk getal het rechter been staat. Schrijf dat getal op.',
  'c en d: Doe hetzelfde bij ∠Q en ∠R.']},
 {id:'21',page:25,nr:'21',title:'Hoek B meten',steps:[
  'a: Kijk naar ∠B. Is de hoek recht, scherp of stomp? Schrijf het op.',
  'b: Leg het midden van je kompasroos op hoekpunt B.',
  'Leg de lijn van 0° op één been. Je meet met de klok mee naar het andere been.',
  'c: Lees het getal af. Schrijf het op.',
  'd: Past het getal bij je antwoord van a? Scherp is kleiner dan 90°. Stomp is groter dan 90°. Schrijf ja of nee.']},
 {id:'22',page:25,nr:'22',title:'Drie hoeken meten',steps:[
  'Begin bij ∠A. Is de hoek scherp, recht of stomp? Schrijf het op.',
  'Leg het midden van je kompasroos op het hoekpunt.',
  'Leg de lijn van 0° op één been. Meet met de klok mee.',
  'Lees het getal af. Schrijf het op de stippellijn: ∠A is …°',
  'Doe hetzelfde bij ∠B en ∠C.']},
 {id:'23',page:25,nr:'23',title:'De benen verlengen',steps:[
  'a: Zijn de benen te kort? Dan komen ze niet bij de getallen. Daarom verleng je ze.',
  'b: Pak je liniaal. Verleng de benen van ∠A, ∠B en ∠C.',
  'Meet ∠A: midden op het hoekpunt, 0° op één been, met de klok mee aflezen.',
  'Schrijf het aantal graden op. Meet ook ∠B en ∠C.']},
 {id:'24',page:25,nr:'24',title:'Een vierhoek meten',steps:[
  'a: Kijk naar ∠A, ∠B, ∠C en ∠D. Is elke hoek scherp, recht of stomp? Schrijf het op.',
  'b: Verleng de benen met je liniaal als ze te kort zijn.',
  'Meet ∠A: midden op het hoekpunt, 0° op één been, met de klok mee aflezen.',
  'Schrijf het aantal graden op. Meet ook ∠B, ∠C en ∠D.']},
 {id:'25',page:26,nr:'25',title:'Hoeken in bouwkranen',steps:[
  'Zoek de letters bij de rode boogjes: A, B, C, D en E.',
  'Leg het midden van je kompasroos op het hoekpunt van ∠A.',
  'Leg de lijn van 0° op één been. Meet met de klok mee.',
  'Schrijf op: ∠A = …°',
  'Doe hetzelfde bij ∠B, ∠C, ∠D en ∠E.']},
 {id:'26',page:26,nr:'26',title:'Hoek E is verdeeld',steps:[
  'a: Kijk naar ∠E₁ en ∠E₂. Is elke hoek recht, scherp of stomp? Schrijf het op.',
  'b: Meet ∠E₁ met de 4 stappen. Schrijf het getal op.',
  'Meet ook ∠E₂. Schrijf het getal op.',
  'c: Tel de twee getallen op. Schrijf op hoe groot ∠E₁ en ∠E₂ samen zijn.']},
 {id:'L27',page:26,nr:'L27',title:'Vierhoek KLMN meten',steps:[
  'Meet ∠K: midden op het hoekpunt, 0° op één been, met de klok mee aflezen.',
  'Zijn de benen te kort? Verleng ze met je liniaal.',
  'Schrijf het getal op de stippellijn.',
  'Meet ook ∠L, ∠M en ∠N.']},
 {id:'O22',page:27,nr:'O22',title:'Hoeken meten (extra hulp)',steps:[
  'a: Bij ∠M staat de kompasroos al op de hoek. Lees het getal af bij het rechter been. Schrijf het op.',
  'b: Meet ∠N met de 4 stappen. Schrijf het getal op.',
  'Meet ∠O op dezelfde manier. Verleng de benen als dat nodig is.']},
 {id:'O24',page:27,nr:'O24',title:'De hoeken van een huis (extra hulp)',steps:[
  'a: Pak je geodriehoek. Is ∠A recht, scherp of stomp? Vul het in de tabel in.',
  'Doe hetzelfde bij ∠B, ∠C, ∠D, ∠E en ∠F.',
  'b: Meet ∠A met je kompasroos. Verleng de benen als ze te kort zijn.',
  'Vul de grootte van ∠A in de tabel in.',
  'Meet ook ∠B tot en met ∠F en vul de tabel in.']}
];
