const fs=require('fs');const src=fs.readFileSync(__dirname+'/uitslagen.gs','utf8');
const sheets={};
function mkSheet(n){const rows=[];return {name:n,rows,getLastRow:()=>rows.length,appendRow:r=>rows.push(r.slice()),setFrozenRows(){},getRange:(r,c,h,w)=>({setFontWeight(){return this},setFontSize(){return this},setValue(){return this},setFormula(){return this},getValues:()=>rows.slice(r-1,r-1+h).map(x=>x.slice()),setValues:v=>{rows[r-1]=v[0].slice()}}),setColumnWidth(){},setColumnWidths(){}}}
const ss={getSheetByName:n=>sheets[n]||null,insertSheet:n=>sheets[n]=mkSheet(n)};
global.SpreadsheetApp={getActiveSpreadsheet:()=>ss};global.LockService={getScriptLock:()=>({waitLock(){},releaseLock(){}})};global.ContentService={createTextOutput:t=>t};
eval(src+';global.doPost=doPost;global.doGet=doGet');
const post=o=>doPost({postData:{contents:JSON.stringify(o)}});
let bad=[];const eq=(a,b,m)=>{if(JSON.stringify(a)!==JSON.stringify(b))bad.push(m+': '+JSON.stringify(a)+' != '+JSON.stringify(b))};
eq(post({les:'5.1 Hoeken',gedaan:100,goed:90,keer:1,toets:'',apparaat:'a1'}),'ok','post1');
eq(post({les:'5.1 Hoeken',gedaan:100,goed:95,keer:2,toets:80,apparaat:'a1'}),'ok','post2');
eq(post({les:'5.4 Hoeken meten',gedaan:20,goed:70,keer:1,toets:'',apparaat:'a1'}),'ok','post3');
eq(post({naam:'Sara',les:'5.1 Hoeken',gedaan:50,goed:60,keer:1,toets:'',apparaat:'b2'}),'ok','post4 (naam wordt genegeerd)');
eq(post({les:'x'}),'leeg','leeg');
const r=sheets['Uitslagen'].rows;
eq(r.length,4,'aantal rijen (kop + 3)');eq(r[1].slice(1),['5.1 Hoeken',100,95,80,2,'a1'],'update rij');eq(r[3].slice(1),['5.1 Hoeken',50,60,'',1,'b2'],'tweede apparaat');eq(JSON.stringify(r).includes('Sara'),false,'geen naam opgeslagen');
eq(!!sheets['Overzicht'],true,'overzicht');eq(doGet().length>5,true,'doGet');
console.log(bad.length?'PROBLEMS\n'+bad.join('\n'):'PROBLEMS none');
