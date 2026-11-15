/* Stuurt de uitslag van een leerling naar een Google Sheet van de docent.
   Doet niets zolang SHEET_URL leeg is. De docent plakt hier de link van het Apps Script. */
(function(){
  var SHEET_URL='';
  if(!SHEET_URL)return;
  var NAMEN={'wiskunde-recht-scherp-stomp-v1':'5.2 Recht, scherp en stomp','rekenles-breuken-v1':'Breuken','wiskunde-hoeken51-v1':'Hoeken','wiskunde-hoeken-v1':'Lijnen en hoeken','rekenles-getallen-v1':'Getallen / Plus en min / Keer en delen'};
  var REK={1:'Getallen en getalgevoel',2:'Plus en min',3:'Keer en delen'};
  function get(k){try{return JSON.parse(localStorage.getItem(k))}catch(e){return null}}
  function dev(){var d;try{d=localStorage.getItem('apparaat-id');if(!d){d=Math.random().toString(36).slice(2,10);localStorage.setItem('apparaat-id',d)}}catch(e){d='onbekend'}return d}
  function rows(k){var o=get(k);if(!o)return[];var out=[];
    if(o.lv){var d=0,p=0,n=0;Object.keys(o.lv).forEach(function(i){var r=o.lv[i];if(r&&r.done){d++;p+=r.pts||0;n+=r.n||1}});if(d&&o.name)out.push({naam:o.name,les:NAMEN[k],gedaan:Math.round(d/6*100),goed:Math.round(p/(d*10)*100),keer:n})}
    else if(o.res){var ks=Object.keys(o.res),mx=1,p2=0;ks.forEach(function(q){var v=o.res[q].pts||0;if(v>mx)mx=v;p2+=v});if(ks.length&&o.name)out.push({naam:o.name,les:NAMEN[k],gedaan:Math.round(ks.length/60*100),goed:Math.round(p2/(ks.length*mx)*100),keer:''})}
    else if(o.pupils){var best=null;Object.keys(o.pupils).forEach(function(i){var p=o.pupils[i],ss=p.sessions||[];if(ss.length&&(!best||ss[ss.length-1].id>best.s.id))best={p:p,s:ss[ss.length-1]}});
      if(best)[1,2,3].forEach(function(ch){var ss=best.p.sessions.filter(function(x){return x.chapter===ch});if(ss.length){var l=ss[ss.length-1];out.push({naam:best.p.name,les:REK[ch],gedaan:100,goed:Math.round(l.points/l.max*100),keer:ss.length})}})}
    return out}
  var timers={};
  function stuur(k){clearTimeout(timers[k]);timers[k]=setTimeout(function(){rows(k).forEach(function(r){r.apparaat=dev();try{fetch(SHEET_URL,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(r)})}catch(e){}})},2500)}
  var orig=Storage.prototype.setItem;
  Storage.prototype.setItem=function(k){var r=orig.apply(this,arguments);try{if(NAMEN[k])stuur(k)}catch(e){}return r};
})();
