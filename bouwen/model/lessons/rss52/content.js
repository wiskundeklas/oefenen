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
/* ---------- opdrachten uit het boek: stap voor stap met hulp ---------- */
/* stap = {t: wat je doet, z: zo doe je dat, p: plaatje (Laat zien), s: wat je opschrijft} */
const BOOK=[
 {id:'9',page:15,nr:'9',title:'Loodrechte lijnen',
  doel:'Je zoekt voorwerpen in je lokaal waar twee lijnen een rechte hoek maken.',need:['geodriehoek','potlood'],steps:[
  {t:'Kijk naar de rode lijnen op de deur.',z:'Loodrecht betekent: de lijnen maken een rechte hoek. Dat is een hoek zoals de hoek van een bladzijde.',p:'loodrecht'},
  {t:'Kijk rond in je lokaal.',z:'Zoek twee lijnen die samen een rechte hoek maken. Denk aan het bord, een raam, een tafel of een kast.'},
  {t:'Kies drie voorwerpen en controleer ze.',z:'Leg de rechte hoek van je geodriehoek in de hoek. Past hij precies? Dan staan de lijnen loodrecht op elkaar.',p:'pap'},
  {t:'Schrijf de drie voorwerpen op de lijntjes.',s:'één voorwerp per lijntje, bijvoorbeeld: de hoek van een schrift'}]},
 {id:'10',page:15,nr:'10',title:'Rechte hoeken in de molen',
  doel:'Je zoekt drie rechte hoeken in de tekening van de molen en zet er het tekentje in.',need:['geodriehoek','potlood'],steps:[
  {t:'Zoek een rechte hoek in de molen.',z:'Zoek twee lijnen die elkaar raken als de hoek van een bladzijde. Twijfel je? Leg de rechte hoek van je geodriehoek op de plek. Past hij precies? Dan is het een rechte hoek.',p:'pap'},
  {t:'Teken het tekentje in de hoek.',z:'Het tekentje is een klein hoekje in de hoek, tegen het hoekpunt aan.',p:'teken'},
  {t:'Zoek zo drie rechte hoeken.',z:'Gebruik allebei de tekentjes: ⌞ en ⌝. Kijk goed welke kant de benen op gaan.'}]},
 {id:'11',page:16,nr:'11',title:'Hoeken in het tuinhuis',
  doel:'In de tekening zijn drie hoeken gekleurd. Je zegt welke hoek recht is, welke kleiner is en welke groter.',need:['geodriehoek','potlood'],steps:[
  {t:'Zoek de drie gekleurde hoeken in de tekening.',z:'Bij elke kleur zie je twee lijnen die elkaar raken. Dat zijn de benen van die hoek.'},
  {t:'a: Welke hoek is de rechte hoek?',z:'Leg de rechte hoek van je geodriehoek in een gekleurde hoek. Past hij precies? Dan is dat de rechte hoek.',p:'pap',s:'de kleur van de hoek'},
  {t:'b: Welke hoek is kleiner dan de rechte hoek?',z:'Welke hoek past helemaal in de rechte hoek van je geodriehoek? Die hoek is kleiner.',s:'de kleur van de hoek'},
  {t:'c: Welke hoek is groter dan de rechte hoek?',z:'Welke hoek steekt buiten je geodriehoek uit? Die hoek is groter.',s:'de kleur van de hoek'}]},
 {id:'12',page:16,nr:'12',title:'Controleren met de geodriehoek',
  doel:'Je gebruikt je geodriehoek om te zien of een hoek recht, scherp of stomp is.',need:['geodriehoek','potlood'],steps:[
  {t:'a: Leg je geodriehoek in ∠P.',z:'Zoek de rechte hoek van je geodriehoek. Leg hem in ∠P: hoekpunt op hoekpunt, één rand langs één been. Ligt het andere been precies langs de andere rand? Dan is ∠P een rechte hoek.',p:'pap'},
  {t:'b: Doe hetzelfde bij ∠Q. Past hij precies?',z:'Leg de rechte hoek van je geodriehoek in ∠Q. Ligt het andere been precies langs de rand?',s:'ja of nee'},
  {t:'c: Is ∠Q groter of kleiner dan ∠P?',z:'∠P is een rechte hoek. Steekt ∠Q buiten je geodriehoek uit? Dan is ∠Q groter. Past ∠Q erin? Dan is ∠Q kleiner.',s:'groter of kleiner dan ∠P'},
  {t:'d: Is ∠Q scherp of stomp?',z:'Kleiner dan een rechte hoek? Dan is hij scherp. Groter dan een rechte hoek? Dan is hij stomp.',p:'pap'}]},
 {id:'13',page:17,nr:'13',title:'Hoeken in een huis',
  doel:'In de tekening van het huis staan vijf hoeken. Je zegt welke recht, scherp of stomp zijn.',need:['geodriehoek','potlood'],steps:[
  {t:'Zoek de vijf hoeken met een boogje.',z:'Bij de letters A, B, C, D en E zit een boogje. Het boogje laat zien welke hoek bedoeld is.'},
  {t:'Controleer elke hoek met je geodriehoek.',z:'Leg de rechte hoek van je geodriehoek in de hoek. Past precies = recht. Past erin = scherp. Steekt eruit = stomp.',p:'pap'},
  {t:'Maak een rijtje in je schrift.',z:'Zo vergeet je geen hoek. Schrijf het meteen op terwijl je controleert.',s:'A = …, B = …, C = …, D = …, E = … (recht, scherp of stomp)'},
  {t:'a, b en c: Schrijf de letters bij de goede vraag.',z:'Kijk in je rijtje. Welke letters zijn recht? Welke scherp? Welke stomp? Elke letter hoort bij één vraag.'}]},
 {id:'14',page:17,nr:'14',title:'Figuren A, B, C en D',
  doel:'Je kijkt naar alle hoeken van vier figuren. Je zoekt scherpe en stompe hoeken.',need:['geodriehoek','potlood'],steps:[
  {t:'Kijk naar alle hoeken van elke figuur.',z:'Bij elke punt van een figuur zit een hoek. Een driehoek heeft 3 hoeken, een vierhoek 4 en een zeshoek 6.'},
  {t:'Controleer elke hoek met je geodriehoek.',z:'Leg de rechte hoek van je geodriehoek in de hoek. Past erin = scherp. Steekt eruit = stomp.',p:'pap'},
  {t:'Maak een rijtje in je schrift.',z:'Schrijf per figuur wat elke hoek is: s (scherp), r (recht) of st (stomp). Dan zie je alles in één keer.',s:'bijvoorbeeld: X: s, s, st'},
  {t:'a en b: Zoek de figuur.',z:'Alleen scherpe hoeken: in je rijtje staat alleen s. Alleen stompe hoeken: in je rijtje staat alleen st.'},
  {t:'c: Tel de stompe hoeken van de andere figuren.',z:'Kijk in je rijtjes. Tel bij elke figuur die overblijft hoeveel keer st erin staat.'}]},
 {id:'L15',page:17,nr:'L15',title:'Heb je het geleerd?',
  doel:'Test jezelf: kun je rechte, scherpe en stompe hoeken herkennen?',need:['geodriehoek','potlood'],steps:[
  {t:'a: Zet het tekentje bij elke rechte hoek in tekening ❶.',z:'Leg de rechte hoek van je geodriehoek in de hoeken A, B, C en D. Past hij precies? Zet dan het tekentje voor een rechte hoek in die hoek.',p:'teken'},
  {t:'b: Welke hoeken in ❶ en ❷ zijn scherp?',z:'Scherp is kleiner dan een rechte hoek: de hoek past in je geodriehoek. Controleer ook de hoeken E, F, G en H van tekening ❷.',p:'pap',s:'de letters, bijvoorbeeld ∠X en ∠Y'},
  {t:'c: Hoe noem je de andere hoeken?',z:'Zo’n hoek is niet recht en niet scherp. Hij is groter dan een rechte hoek. Je kent drie woorden: recht, scherp en …'},
  {t:'Zet bij elk onderdeel een vinkje.',z:'Ging het goed? Vink "goed" aan. Nog niet goed? Doe de opdracht waar de pijl naar wijst (E4 of E5).'}]},
 {id:'O10',page:18,nr:'O10',title:'Rechte hoeken op de foto (extra hulp)',
  doel:'Je zoekt rechte hoeken op een foto en geeft ze aan met het tekentje.',need:['geodriehoek','potlood'],steps:[
  {t:'Kijk naar de foto.',z:'Zoek hoeken die eruitzien als de hoek van een bladzijde. Denk aan het scherm, het kastje en de plek waar de vloer en de muur samenkomen.'},
  {t:'a: Controleer met je geodriehoek.',z:'Leg de rechte hoek van je geodriehoek op de hoek in de foto. Past hij precies? Dan is het een rechte hoek. Zoek er nog twee.',p:'pap'},
  {t:'b: Geef de rechte hoeken aan met het tekentje.',z:'Teken het tekentje in de hoek, tegen het hoekpunt aan. Gebruik ⌞ één keer en ⌝ één keer.',p:'teken'}]},
 {id:'O13',page:18,nr:'O13',title:'Hoek P en de zes hoeken (extra hulp)',
  doel:'Eerst kijk je naar ∠P. Daarna controleer je zes hoeken in een figuur.',need:['geodriehoek','potlood'],steps:[
  {t:'a: ∠P is groter dan de rechte hoek. Is ∠P stomp of scherp?',z:'Scherp is kleiner dan een rechte hoek. Stomp is groter dan een rechte hoek. Welk woord past bij "groter dan"?',p:'pap'},
  {t:'b: Zoek de zes hoeken A tot en met F.',z:'Bij elke letter staat een boogje. Dat is de hoek.'},
  {t:'Leg de rechte hoek van je geodriehoek in ∠A.',z:'Past precies = recht. Past erin = scherp. Steekt eruit = stomp.',s:'∠A is …'},
  {t:'Doe hetzelfde bij ∠B, ∠C, ∠D, ∠E en ∠F.',z:'Schrijf bij elke hoek meteen op wat het is. Zo houd je overzicht.'}]}
];
