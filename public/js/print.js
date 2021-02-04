"use strict";

function popUp(ticket){
var frog = window.open("","wildebeast","width=300,height=500,scrollbars=1,resizable=1")

var xtml = '<!DOCTYPE html><html lang="en"><head><link rel="stylesheet" href="printStyle.css"><script src="JsBarcode.all.min.js"></script></head><body><button id="btnPrint" class="hidden-print">Print</button><div class="ticket"><div class="centered"><h2>Logo</h2>'+
      '<span id="adresse">Adress line</span><span> - </span><span id="TimeDate"></span>'+
      '<br><span>Ticket   </span><span id="TicketNumber"></span>'+
      '</div><div id="Bar" class="centered"><svg id="barcode"></svg></div><div class="grid-container"><div class="grid-item">'+
      '<p></p><span>GR: </span><span id="GRValue" class="GR"></span><p>Gain min/max</p></div><div class="grid-item right"><p></p>'+
      '<span id="Combi"></span><span> * </span><span class="GR"></span><span> TND</span><span> = </span><span id="mise"></span><span> TND</span>'+
      '<p></p><span class="MinGain"></span><span> / </span><span class="MaxGain"></span><span>  TND</span></div></div><div class="lineDashed"></div>'


let html = '<!DOCTYPE html><html lang=en><link href=./public/css/printStyle.css rel=stylesheet><script src=JsBarcode.all.min.js></script><div class=ticket><div class=centered><h2 id=logo>&lt;Logo></h2><span id=adresse>Adrese line</span><span> - </span><span id=TimeDate></span><br><span>Ticket </span><span id=TicketNumber></span></div><div class=centered id=Bar><svg id=barcode></svg></div><div class=flex-container><div class=flex-item><div>GR:<span id=GRValue class=GR></span></div><div>Gain min/max</div></div><div class="flex-item right"><div><span id=Combi></span> * <span class=GR></span>TND = <span id=mise></span>TND</div><p><span class=MinGain></span><span> / </span><span class=MaxGain></span><span> TND</span></div></div><div class=lineDashed></div><div id=ChoiceList><div><p class=gameTitle>249423014 Spin&Win<div class=flex-container><div class=flex-item><p class=gameInfo>19:32 Sector: B</div><div class="flex-item right"><p class=Coutes>6:00</div></div><div class=lineDotted>.............</div></div></div><div class=lineDashed></div></div><div class="flex-container result ticket"><div class=flex-item><div>Mise Totale</div><div>Gain min/max</div></div><div class="flex-item right"><div><span id=MiseTotale></span>TND</div><div><span class=MinGain></span> / <span class=MaxGain></span> TND</div></div></div><script src=print.js></script>'
const style = '@font-face{font-family:merchant_copyregular;src:url(merchant-webfont.woff2) format("woff2"),url(merchant-webfont.woff) format("woff");font-weight:400;font-style:normal}*{margin:0;font-size:12px;font-family:Merchant sans-serif}.flex-container{font-family:Merchant sans-serif;display:flex;flex-wrap:nowrap;flex-direction:row}.flex-item{font-size:16px;flex:50%}.centered{text-align:center;align-content:center;font-size:11px}.lineDashed{float:right;border-top:1px dashed #000;width:90%;margin:5px 0}.lineDotted{text-align:center;letter-spacing:10px;font-weight:700}.gameTitle{margin-top:10px;margin-bottom:1px}.gameInfo{margin-top:0;margin-bottom:12px;padding-left:15px}.right{text-align:right}.ticket{margin:0 15px;width:255px;max-width:255px;font-size:18px}img{max-width:inherit;width:inherit}.result{font-weight:700;margin-top:10px}@media print{.hidden-print,.hidden-print *{display:none!important}}'

    html += `<style>${style}</style></body></html>`
frog.document.open()
frog.document.write(html)
frog.document.close()
}