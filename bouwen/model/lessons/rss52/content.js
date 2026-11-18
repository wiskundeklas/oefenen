/* ---------- de les ---------- */
const META={title:'5.2 Recht, scherp en stomp',intro:'Leer rechte, scherpe en stompe hoeken kennen. Speel eerst met de knoppen. Maak daarna de opdrachten uit je boek stap voor stap. Aan het eind doe je een snelle toets.'};
const PAD='Hoofdstuk 5 Hoeken · 5.2 Recht, scherp en stomp';
const LV=[
 {t:'De rechte hoek',sub:'Het teken en loodrechte lijnen',n:5,gen:mk(['sign','isR','pickR','lood','draw']),steps:[
  {h:'Wat is een rechte hoek?',txt:'Een rechte hoek is zo groot als de hoek van een vel papier.\nSchuif het bolletje. Bij een rechte hoek komt er een hoekje.',w:'angle'},
  {h:'Het teken van een rechte hoek',txt:'Je tekent een klein hoekje in het hoekpunt.\nHet hoekje staat tussen de twee benen.',fig:figSigns},
  {h:'Loodrechte lijnen',txt:'Loodrecht betekent: de lijnen maken een rechte hoek.\nDraai de lijn tot ze loodrecht staan.',w:'cross'}]},
 {t:'De geodriehoek gebruiken',sub:'Controleren of een hoek recht is',n:5,gen:mk(['geo','geo','steps','tf2','isR']),steps:[
  {h:'De geodriehoek',txt:'Een geodriehoek heeft een rechte hoek.\nDe twee andere hoeken zijn scherp.',fig:figGeoDef},
  {h:'Controleren in 4 stappen',txt:'Leg de rechte hoek in het hoekpunt. Leg één been langs de rand.\nKijk waar het andere been ligt.\nSchuif de hoek en kijk.',w:'geo'}]},
 {t:'Recht, scherp of stomp',sub:'Hoeken een naam geven',n:5,gen:mk(['cls','cls','drawS','drawT','pickT']),steps:[
  {h:'Drie soorten hoeken',txt:'Kleiner dan een rechte hoek is scherp.\nGroter dan een rechte hoek is stomp.\nSchuif en kijk wanneer de naam verandert.',w:'angle'},
  {h:'Lange of korte benen',txt:'De lengte van de benen maakt niet uit.\nSchuif en kijk: de hoek blijft gelijk.',w:'legs'}]},
 {t:'Hoeken in figuren',sub:'Zoeken, tellen en op volgorde',n:5,gen:mk(['vert','count','which','multi','order']),steps:[
  {h:'Hoeken in een figuur',txt:'Elk hoekpunt heeft een letter.\nTik op een bolletje en kijk of de hoek recht, scherp of stomp is.',w:'poly'}]}
];
const NQ=LV.reduce((a,l)=>a+(l.n||5),0);
/* snelle toets: 10 vragen door elkaar uit alle onderdelen */
const TPLAN=[[0,'isR'],[0,'lood'],[1,'geo'],[1,'tf2'],[2,'cls'],[2,'cmp'],[2,'pickS'],[3,'vert'],[3,'count'],[3,'multi']];
const TOETS=()=>build(TPLAN,e=>{const q=cv(M[e[1]]());if(q)q.part=e[0];return q});
/* ---------- opdrachten uit het boek: alleen stappen ---------- */
const BOOK=[
 {id:'9',page:15,nr:'9',title:'Loodrechte lijnen',steps:[
  'Kijk naar de deur. De rode lijnen staan loodrecht op elkaar.',
  'Kijk rond in je lokaal.',
  'Zoek drie voorwerpen waarbij je ook loodrechte lijnen ziet.',
  'Schrijf de drie voorwerpen op de lijntjes.']},
 {id:'10',page:15,nr:'10',title:'Rechte hoeken in de molen',steps:[
  'Kijk naar de molen. Zoek een rechte hoek.',
  'Teken in die hoek het tekentje voor een rechte hoek.',
  'Zoek zo drie rechte hoeken.',
  'Gebruik beide tekentjes: ⌞ en ⌝.']},
 {id:'11',page:16,nr:'11',title:'Hoeken in het tuinhuis',steps:[
  'Kijk naar de tekening van het tuinhuis. Drie hoeken hebben een kleur.',
  'a: Welke gekleurde hoek is de rechte hoek? Schrijf het antwoord op.',
  'b: Welke gekleurde hoek is kleiner dan de rechte hoek? Schrijf het antwoord op.',
  'c: Welke gekleurde hoek is groter dan de rechte hoek? Schrijf het antwoord op.']},
 {id:'12',page:16,nr:'12',title:'Controleren met de geodriehoek',steps:[
  'a: Pak je geodriehoek. Leg de rechte hoek in ∠P. Controleer dat ∠P een rechte hoek is.',
  'b: Leg de rechte hoek van je geodriehoek in ∠Q. Past hij precies? Schrijf ja of nee.',
  'c: Is ∠Q groter of kleiner dan ∠P? Schrijf het op.',
  'd: Is ∠Q een scherpe of een stompe hoek? Schrijf het op.']},
 {id:'13',page:17,nr:'13',title:'Hoeken in een huis',steps:[
  'Kijk naar het huis. Bij de boogjes staan letters.',
  'Pak je geodriehoek als je het niet zeker weet.',
  'a: Welke hoeken zijn recht? Schrijf de letters op.',
  'b: Welke hoeken zijn scherp? Schrijf de letters op.',
  'c: Welke hoeken zijn stomp? Schrijf de letters op.']},
 {id:'14',page:17,nr:'14',title:'Figuren A, B, C en D',steps:[
  'Kijk naar de vlakke figuren A, B, C en D.',
  'a: Welke figuur heeft alleen scherpe hoeken? Schrijf de letter op.',
  'b: Welke figuur heeft alleen stompe hoeken? Schrijf de letter op.',
  'c: Hoeveel stompe hoeken hebben de andere figuren? Schrijf het op.']},
 {id:'L15',page:17,nr:'L15',title:'Heb je het geleerd?',steps:[
  'a: Kijk naar tekening 1. Zet bij elke rechte hoek het tekentje voor een rechte hoek.',
  'b: Welke hoeken in tekening 1 en 2 zijn scherp? Schrijf de letters op.',
  'c: Hoe noem je de andere hoeken in tekening 1 en 2? Schrijf het op.',
  'Zet bij elk onderdeel een vinkje: goed of nog niet goed.']},
 {id:'O10',page:18,nr:'O10',title:'Rechte hoeken op de foto (extra hulp)',steps:[
  'Kijk naar de foto. Met een geodriehoek kun je zien of een hoek recht is.',
  'a: Zoek op de foto nog twee rechte hoeken. Gebruik je geodriehoek.',
  'b: Geef de rechte hoeken op de foto aan met een tekentje.',
  'Gebruik beide tekentjes één keer.']},
 {id:'O13',page:18,nr:'O13',title:'Hoek P en de zes hoeken (extra hulp)',steps:[
  'a: ∠P is groter dan de rechte hoek van de geodriehoek. Is ∠P stomp of scherp? Schrijf het op.',
  'b: Pak je geodriehoek. Leg de rechte hoek in ∠A. Schrijf op: recht, scherp of stomp.',
  'Doe hetzelfde bij ∠B, ∠C, ∠D, ∠E en ∠F.']}
];
