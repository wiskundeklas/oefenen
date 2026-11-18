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
/* ---------- opdrachten uit het boek: alleen stappen ---------- */
const BOOK=[
 {id:'16',page:20,nr:'16',title:'Letters en getallen op de kompasroos',steps:[
  'Kijk naar de tabel. Er staan letters, windrichtingen en getallen.',
  'De N hoort bij noord en bij het getal 0. Dit staat er al.',
  'Bij de O staat het getal 90. Schrijf de windrichting op.',
  'Bij de Z staat de windrichting zuid. Schrijf het getal op.',
  'Bij de W moet je de windrichting en het getal opschrijven.']},
 {id:'17',page:20,nr:'17',title:'Hoeken tussen windrichtingen',steps:[
  'a: Pak je kompasroos. Controleer dat de hoek tussen zuid en west 90° is.',
  'b: Teken bij die hoek een rechthoektekentje.',
  'c: Is de hoek tussen zuid en zuidwest (ZW) scherp of stomp? Schrijf het op.',
  'd: Is de hoek tussen noord en zuidoost (ZO) scherp of stomp? Schrijf het op.']},
 {id:'18',page:21,nr:'18',title:'Hoeken in de kruiwagen',steps:[
  'Kijk naar de kruiwagen. Bij de hoeken staan de letters A, B, C, D en E.',
  'a: Schrijf van ∠A op of de hoek scherp, recht of stomp is.',
  'Doe hetzelfde bij ∠B, ∠C, ∠D en ∠E.',
  'b: Kijk naar de twee zinnen. Schrijf bij elke zin de hoeken op die erbij horen.']},
 {id:'L19',page:21,nr:'L19',title:'Heb je het geleerd?',steps:[
  'a: Maak de zin af: één zo’n hoekje van de kompasroos is … en je schrijft …',
  'b: Kijk naar ∠K. Omcirkel scherp of stomp. Schrijf op tussen welke getallen de grootte ligt.',
  'Doe hetzelfde bij ∠M.',
  'Zet bij elk onderdeel een vinkje: goed of nog niet goed.']},
 {id:'O18',page:22,nr:'O18',title:'Hoeken in het huis (extra hulp)',steps:[
  'a: Pak je kompasroos. Controleer dat ∠E precies 90° is.',
  'b: Is ∠E recht, scherp of stomp? Schrijf het op.',
  'c: Welke hoeken zijn kleiner dan 90°? Schrijf de letters op.',
  'd: Welke hoeken zijn groter dan 90°? Schrijf de letters op.',
  'e: Kijk naar de drie zinnen. Schrijf ∠A tot en met ∠E bij de juiste zin.']}
];
