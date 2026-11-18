/* Uitslagen van de wiskunde- en rekenlessen.
   Ontvangt de punten van leerlingen en zet ze in dit Google Sheet.
   Eén regel per leerling per les. Als de leerling opnieuw speelt, wordt de regel bijgewerkt. */
var BLAD = 'Uitslagen';
var KOP = ['Laatst bijgewerkt', 'Naam', 'Les', 'Gedaan %', 'Goed %', 'Toets %', 'Keer gespeeld', 'Apparaat'];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var d = JSON.parse(e.postData.contents);
    if (!d.naam || !d.les) return ContentService.createTextOutput('leeg');
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sh = ss.getSheetByName(BLAD);
    if (!sh) {
      sh = ss.insertSheet(BLAD);
      sh.appendRow(KOP);
      sh.setFrozenRows(1);
      sh.getRange(1, 1, 1, KOP.length).setFontWeight('bold');
    }
    if (!ss.getSheetByName('Overzicht')) maakOverzicht(ss);
    var n = sh.getLastRow();
    var rij = -1;
    if (n > 1) {
      var w = sh.getRange(2, 1, n - 1, KOP.length).getValues();
      for (var i = 0; i < w.length; i++) {
        if (w[i][1] === d.naam && w[i][2] === d.les && w[i][7] === d.apparaat) { rij = i + 2; break; }
      }
    }
    var getal = function (x) { return (x === '' || x == null || isNaN(Number(x))) ? '' : Number(x); };
    var waarden = [new Date(), String(d.naam), String(d.les), getal(d.gedaan), getal(d.goed), getal(d.toets), getal(d.keer), String(d.apparaat || '')];
    if (rij > 0) sh.getRange(rij, 1, 1, KOP.length).setValues([waarden]);
    else sh.appendRow(waarden);
    return ContentService.createTextOutput('ok');
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return ContentService.createTextOutput('De uitslagen werken. Je kunt dit venster sluiten.');
}

function maakOverzicht(ss) {
  var ov = ss.insertSheet('Overzicht', 0);
  ov.getRange('A1').setValue('Overzicht').setFontWeight('bold').setFontSize(14);
  ov.getRange('A3').setValue('Aantal leerlingen (verschillende namen)');
  ov.getRange('B3').setFormula('=IFERROR(COUNTA(UNIQUE(FILTER(Uitslagen!B2:B,Uitslagen!B2:B<>""))),0)');
  ov.getRange('A4').setValue('Aantal apparaten');
  ov.getRange('B4').setFormula('=IFERROR(COUNTA(UNIQUE(FILTER(Uitslagen!H2:H,Uitslagen!H2:H<>""))),0)');
  ov.getRange('A6').setValue('Per les').setFontWeight('bold');
  ov.getRange('A7').setFormula('=IFERROR(QUERY(Uitslagen!A:H,"select C, count(B), avg(E), avg(F) where C is not null group by C label count(B) \'Leerlingen\', avg(E) \'Gemiddeld goed %\', avg(F) \'Gemiddelde toets %\'",1),"Nog geen uitslagen")');
  ov.getRange('A3:A4').setFontWeight('bold');
  ov.setColumnWidth(1, 300);
  ov.setColumnWidths(2, 3, 150);
}
