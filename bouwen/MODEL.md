# Vast model voor alle lessen (wiskunde en rekenen)

Doelgroep: vmbo basis klas 1. Weinig motivatie, weinig zin in lange teksten. Meer zin in spelletjes en knoppen. Houd daarom alles kort, duidelijk en interactief.

## Regels
1. **Maximaal 30 vragen per les.** Meestal 3 of 4 onderdelen met 5 of 6 vragen, plus een snelle toets van 10 vragen.
2. **Korte tekst.** Op elke uitlegpagina maximaal 3 korte zinnen. Eerst doen, dan lezen.
3. **Veel knoppen om mee te spelen** op de uitlegpagina's (kiezen, schuiven, slepen, tikken). Niet alleen lezen.
4. **Dezelfde knoppen onderaan elke pagina**, groot en altijd op dezelfde plek: **Menu**, **← Vorige**, **Volgende →**. Menu vraagt eerst "Zeker weten?" als je midden in de vragen zit.
5. **Menu (hoofdmenu van de les)**: onderdelen 1, 2, 3 (4), daarna "Opdrachten uit je boek", als laatste "Snelle toets".
6. **Elk onderdeel**: uitleg met knoppen (2 tot 4 schermen) en daarna vragen. Max 3 pogingen per vraag, 1 punt alleen als het de eerste keer goed is, tip na de tweede fout, antwoord na de derde fout. Sterren aan het eind.
7. **Opdrachten uit je boek**: per opdracht eerst "Pak je boek. Sla open bladzijde … Zoek opdracht …", dan de afbeelding uit het boek (zonder antwoord), dan **alleen stappen** (wat moet de leerling doen of schrijven). De leerling tikt elke stap aan als die gedaan is. **Geen controlevragen.**
8. **Snelle toets** aan het eind: 10 vragen door elkaar uit alle onderdelen, 1 kans per vraag, geen tip. Aan het eind groot het **percentage** ("Je weet 70% van deze les") en welke onderdelen nog geoefend moeten worden. Het resultaat staat ook op de startpagina.
9. Alle lessen werken op een telefoon (320 px breed) zonder zijwaarts scrollen.
10. Eerst privé laten zien (Artifact). Pas na het woord "publiceer" op de website zetten. De link van de website verandert nooit.
11. **Dyslexie-knop op elke pagina.** `dyslexie.js` (in de hoofdmap) staat met `<script src="dyslexie.js"></script>` in de kop van elke pagina en doet de hele website anders: andere letter, grotere letters, meer ruimte, rustige achtergrond. De keuze wordt onthouden (`dyslexie-stand`). `base.html` bevat de regel al. Nieuwe losse pagina's moeten hem ook krijgen.
12. **Hoeken en vormen: wees duidelijk.** Vraag nooit "is dit 90°?" bij een plaatje waar je dat niet kunt zien. Gebruik de **papieren hoek als vergelijking** ("past een hoek van papier precies?") en ruime marges bij hoeken (bijv. 90° ± 12° is niet recht). Teken vormen met duidelijke hoeken.
13. **Uitslagen zonder namen.** `resultaten.js` stuurt alleen aantallen per les (gedaan, goed, keer, toets, apparaat) naar het Google Sheet, nooit een naam. Elke nieuwe les heeft een regel in `NAMEN` en `SZ` (aantal vragen per onderdeel).
14. De voortgangsregel op de startpagina voor een les in dit model: `lvk('SLEUTEL',[5,5,5,5])` (aantal vragen per onderdeel).

## Bestanden (map `bouwen/` in de repo, niet bedoeld voor leerlingen)
- `model/base.html`: kop, kleuren, geluid, stem, opslag.
- `model/ui.js`, `model/lib.js`, `model/engine.js`: de motor (menu, uitleg, vragen, boek, toets).
- `model/extra.css`: extra opmaak.
- `model/strip.py`: maakt van een gebouwde les een privé-versie voor het tonen (haalt terugknop en uitslagen eruit).
- `model/lessons/_old/`: oude vraagtypes (kiezen, tekenen, enz.) die les 5.2 en 5.3 nog gebruiken.
- `test_model2.js BESTAND KEREN BREEDTE`: speelt een hele les door en zoekt fouten (met `DYS=1` ook met dyslexie-stand). `test_dyslexie.js`: test de knop op alle pagina's. `uitslagen.gs` + `test_gs.js`: het Google-Sheet-script en zijn test.
- `model/build.py LES-MAP UIT.html`: bouwt één les.
- Per les een map met `lesson.json` (titel, opslagsleutel, bestanden), `geo.js` (tekeningen), `widgets.js` (knoppen om mee te spelen), `quiz.js` (vragen), `content.js` (onderdelen, toets, boekopdrachten).

## Nieuwe les maken
1. Kopieer een bestaande lesmap, pas `lesson.json` aan.
2. Schrijf `content.js`: `META`, `PAD`, `LV` (onderdelen met `steps` en `gen`), `TPLAN` en `TOETS`, `BOOK` (stappen).
3. Bouw met `build.py`, test op 360 en 320 px, laat privé zien.
4. Na "publiceer": kopieer naar de repo, zet de les in `lessen.json` en in `DEFAULT` in `index.html`, voeg voortgang toe in `index.html` (`lvk`) en de naam in `resultaten.js`.
