/* Uitslagen van de wiskunde- en rekenlessen. ZONDER namen.
   Eén regel per apparaat per les. Als er opnieuw gespeeld wordt, wordt de regel bijgewerkt.
   Het blad Overzicht laat per les zien hoeveel keer er gedaan is. */
var BLAD = 'Uitslagen';
var KOP = ['Laatst bijgewerkt', 'Les', 'Gedaan %', 'Goed %', 'Toets %', 'Keer gespeeld', 'Apparaat'];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var d = JSON.parse(e.postData.contents);
    if (!d.les || !d.apparaat) return ContentService.createTextOutput('leeg');
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
        if (w[i][1] === d.les && w[i][6] === String(d.apparaat || '')) { rij = i + 2; break; }
      }
    }
    var getal = function (x) { return (x === '' || x == null || isNaN(Number(x))) ? '' : Number(x); };
    var waarden = [new Date(), String(d.les), getal(d.gedaan), getal(d.goed), getal(d.toets), getal(d.keer), String(d.apparaat || '')];
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
  ov.getRange('A3').setValue('Totaal: keer gedaan (alle lessen)');
  ov.getRange('B3').setFormula('=IFERROR(SUM(Uitslagen!F2:F),0)');
  ov.getRange('A4').setValue('Aantal apparaten (ongeveer aantal leerlingen)');
  ov.getRange('B4').setFormula('=IFERROR(COUNTA(UNIQUE(FILTER(Uitslagen!G2:G,Uitslagen!G2:G<>""))),0)');
  ov.getRange('A6').setValue('Per les').setFontWeight('bold');
  ov.getRange('A7').setFormula('=IFERROR(QUERY(Uitslagen!A:G,"select B, count(G), sum(F), avg(D), avg(E) where B is not null group by B label count(G) \'Apparaten\', sum(F) \'Keer gedaan\', avg(D) \'Gemiddeld goed %\', avg(E) \'Gemiddelde toets %\'",1),"Nog geen uitslagen")');
  ov.getRange('A3:A4').setFontWeight('bold');
  ov.setColumnWidth(1, 320);
  ov.setColumnWidths(2, 4, 150);
}
