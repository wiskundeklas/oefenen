/* ---------- de les ---------- */
const META={title:'5.3 De kompasroos',intro:'Leer de kompasroos kennen en meet hoeken met graden. Speel eerst met de knoppen. Maak daarna de opdrachten uit je boek stap voor stap. Aan het eind doe je een snelle toets.'};
const PAD='Hoofdstuk 5 Hoeken · 5.3 De kompasroos';
const LV=[
 {t:'De kompasroos',sub:'Windrichtingen en getallen',n:5,gen:mk(['kN','kN','kcomp4','kcomp8','kcomp8']),steps:[
  {h:'Letters op de kompasroos',txt:'Elke letter is een windrichting.\nN is noord, O is oost, Z is zuid en W is west.\nTik op een letter.',w:'komp'},
  {h:'Letters en getallen',txt:'Noord is 0. Daarna ga je met de klok mee.\nO is 90, Z is 180 en W is 270.\nTussen de letters zitten NO, ZO, ZW en NW.',w:'komp'}]},
 {t:'Eén graad',sub:'360 hoekjes en de hoek tussen twee richtingen',n:5,gen:mk(['kgr','kgr','kdeg4','kdeg8','kdeg8']),steps:[
  {h:'Eén graad',txt:'Een kompasroos heeft 360 gelijke hoekjes.\nEén zo’n hoekje is 1 graad. Je schrijft 1°.',fig:IMGB('p20-theorie.png','Zo staat het in je boek (bladzijde 20).')},
  {h:'De hoek tussen twee richtingen',txt:'Noord is 0 en oost is 90. De hoek ertussen is 90°.\nKies zelf twee richtingen.',w:'komp2'},
  {h:'Zo vind je de hoek',txt:'Zoek bij beide richtingen het getal.\nTrek ze van elkaar af. Je neemt de kleinste hoek, nooit meer dan 180°.',w:'komp2'}]},
 {t:'Scherp, recht of stomp',sub:'Hoeken met graden',n:5,gen:mk(['kcl2','kcl','kbet','kbetFig','cls']),steps:[
  {h:'Drie soorten hoeken',txt:'Recht is precies 90°. Scherp is kleiner dan 90°.\nStomp ligt tussen 90° en 180°.',fig:IMGB('p21-theorie.png','Zo staat het in je boek (bladzijde 21).')},
  {h:'Schuif en kijk',txt:'Schuif de blauwe lijn.\nKijk wanneer de hoek scherp, recht of stomp is.',w:'graad'}]},
 {t:'Hoeken in tekeningen',sub:'Hoeken zoeken en tellen',n:5,gen:mk(['vert','vert','count','which','multi']),steps:[
  {h:'Hoeken in een figuur',txt:'Elk hoekpunt heeft een letter.\nTik op een bolletje en kijk of de hoek recht, scherp of stomp is.',w:'poly'}]}
];
const NQ=LV.reduce((a,l)=>a+(l.n||5),0);
/* snelle toets: 10 vragen door elkaar uit alle onderdelen */
const TPLAN=[[0,'kN'],[0,'kcomp8'],[1,'kgr'],[1,'kdeg4'],[1,'kdeg8'],[2,'kcl2'],[2,'kcl'],[2,'cls'],[3,'vert'],[3,'count']];
const TOETS=()=>build(TPLAN,e=>{const q=cv(M[e[1]]());if(q)q.part=e[0];return q});
/* ---------- opdrachten uit het boek: stap voor stap met hulp ---------- */
/* stap = {t: wat je doet, z: zo doe je dat, p: plaatje (Laat zien), s: wat je opschrijft} */
const BOOK=[
 {id:'16',page:20,nr:'16',title:'Letters en getallen op de kompasroos',
  doel:'Je vult een tabel in met letters, windrichtingen en getallen. Alles staat op je kompasroos.',need:['kompasroos','potlood'],steps:[
  {t:'Pak je kompasroos. Zoek de N bovenaan.',z:'Bij de N staat het getal 0. Dat staat al in de tabel. N is van noord. Je draait met de klok mee: N, O, Z, W.',p:'windroos'},
  {t:'Ga met de klok mee naar de O.',z:'Het getal 90 staat al in de tabel. Welk woord hoort bij de O? Denk aan de zon: die komt op in het …',s:'de windrichting bij de O'},
  {t:'Ga verder naar de Z.',z:'De windrichting zuid staat al in de tabel. Zoek het getal bij de Z op je kompasroos. Elke volgende letter is 90 meer: 0, 90, …',s:'het getal bij de Z'},
  {t:'Doe nu de W.',z:'De windrichting begint met een w. Het getal is weer 90 meer dan bij de Z.',s:'de windrichting en het getal bij de W'}]},
 {id:'17',page:20,nr:'17',title:'Hoeken tussen windrichtingen',
  doel:'Je kijkt naar hoeken tussen windrichtingen op de kompasroos. Je zegt of ze recht, scherp of stomp zijn.',need:['geodriehoek','potlood'],steps:[
  {t:'a: Controleer dat de hoek tussen zuid en west 90° is.',z:'Z staat onderaan, W staat links. Leg de rechte hoek van je geodriehoek in het midden van de roos: één rand langs Z, de andere rand langs W. Past hij precies? Dan is de hoek 90°.',p:'pap'},
  {t:'b: Teken het tekentje voor een rechte hoek.',z:'Teken een klein hoekje in het midden, tussen Z en W.',p:'teken'},
  {t:'c: Is de hoek tussen Z en ZW scherp of stomp?',z:'ZW ligt precies halverwege Z en W. De hoek tussen Z en W is 90°. Is de helft daarvan kleiner of groter dan 90°?',p:'windroos'},
  {t:'d: Is de hoek tussen N en ZO scherp of stomp?',z:'Ga vanaf N met de klok mee: N, NO, O, ZO. Ligt ZO voorbij de O? Vergelijk met de rechte hoek van je geodriehoek.',p:'pap'}]},
 {id:'18',page:21,nr:'18',title:'Hoeken in de kruiwagen',
  doel:'In de kruiwagen zitten vijf hoeken. Je zegt welke soort hoek het is en wat de grootte is.',need:['geodriehoek','potlood'],steps:[
  {t:'Zoek de hoeken A, B, C, D en E in de kruiwagen.',z:'Zoek de rode lijntjes bij de letters. Waar twee delen van de kruiwagen samenkomen, zit een hoek.'},
  {t:'a: Is ∠A scherp, recht of stomp?',z:'Leg de rechte hoek van je geodriehoek in de hoek. Past erin = scherp. Past precies = recht. Steekt eruit = stomp.',p:'pap',s:'∠A is …'},
  {t:'Doe hetzelfde bij ∠B, ∠C, ∠D en ∠E.',z:'Schrijf bij elke hoek meteen het antwoord op.'},
  {t:'b: Kijk naar de twee zinnen onder de tekening.',z:'"Gelijk aan 90°" is een rechte hoek. "Tussen 0° en 90°" is een scherpe hoek. Schrijf achter elke zin de letters van de hoeken die erbij horen.',p:'lijn180'}]},
 {id:'L19',page:21,nr:'L19',title:'Heb je het geleerd?',
  doel:'Test jezelf: weet je wat een graad is? Kun je de grootte van hoeken schatten?',need:['geodriehoek','potlood'],steps:[
  {t:'a: Maak de zin af over de kompasroos.',z:'Een kompasroos is verdeeld in 360 gelijke hoekjes. Zo’n hoekje heeft een naam die je in de uitleg hebt geleerd. Je schrijft het met het gradenteken °.',s:'Eén zo’n hoekje is … , je schrijft …'},
  {t:'b: Is ∠K scherp of stomp? Omcirkel het goede woord.',z:'Leg de rechte hoek van je geodriehoek in ∠K. Past erin = scherp. Steekt eruit = stomp.',p:'pap'},
  {t:'Tussen welke getallen ligt de grootte van ∠K?',z:'Scherp: tussen 0° en 90°. Stomp: tussen 90° en 180°. Schrijf de twee getallen die bij jouw soort hoek horen.',p:'lijn180',s:'tussen …° en …°'},
  {t:'Doe hetzelfde bij ∠M.',z:'Eerst scherp of stomp. Dan de twee getallen.'},
  {t:'Zet bij elk onderdeel een vinkje.',z:'Ging het goed? Vink "goed" aan. Nog niet goed? Doe de opdracht waar de pijl naar wijst (E6 of E7).'}]},
 {id:'O18',page:22,nr:'O18',title:'Hoeken in het huis (extra hulp)',
  doel:'In het huis staan vijf hoeken. Je controleert ∠E met je kompasroos en zoekt de andere hoeken.',need:['kompasroos','geodriehoek','potlood'],steps:[
  {t:'a: Controleer met je kompasroos dat ∠E precies 90° is.',z:'Leg het midden van de kompasroos op hoekpunt E. Leg de lijn van 0° op één been. Staat het andere been bij 90°? Dan klopt het.',p:'meet4'},
  {t:'b: Is ∠E recht, scherp of stomp?',z:'Bij a zag je het getal. Recht is precies 90°.'},
  {t:'c: Welke hoeken zijn kleiner dan 90°?',z:'Vergelijk elke hoek met ∠E. Past de hoek in de rechte hoek van je geodriehoek? Dan is hij kleiner dan 90°.',p:'pap',s:'de letters'},
  {t:'d: Welke hoeken zijn groter dan 90°?',z:'Steekt de hoek buiten je geodriehoek uit? Dan is hij groter dan 90°.',s:'de letters'},
  {t:'e: Schrijf de hoeken A tot en met E bij de juiste zin.',z:'Gelijk aan 90° = recht. Tussen 0° en 90° = scherp. Tussen 90° en 180° = stomp. Elke hoek past bij één zin.',p:'lijn180'}]}
];
