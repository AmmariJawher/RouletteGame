const gr = document.getElementById("gr");
const mise = document.getElementById("mise");
const combi = document.getElementById("combi");
const cotesMax = document.getElementById("cotesMax");
const cotesMin = document.getElementById("cotesMin");
const maxGain = document.getElementById("maxGain");
const totalMaxGain = document.getElementById("totalMaxGain");
const minGain = document.getElementById("minGain");
const selection = document.getElementById("Selection");
const choice = document.querySelectorAll(".choice");
const addToBet = document.querySelectorAll(".addToBet");


// Ticket Object
let ticket = {
  eventResult: null,
  eventId: null,
  eventTime: null,
  minGain: null,
  maxGain: null,
  cotesMin: null,
  cotesMax: null,
  status: null,
  gr: 1,
  mise: null,
  ticketWinSum: 0,
  combi: null,
  choiceList: []
}; 

// Tabs Navigation
document.getElementsByClassName("tablinks")[0].click();

function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  
  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  tablinks = document.getElementsByClassName("tablinks");

  for (i = 0; i < tabcontent.length; i++) {
    if (tabcontent[i].classList.contains("is-block")) {
      tabcontent[i].className = tabcontent[i].className.replace(" is-block", " is-hidden");
    }
  }
  
  // Get all elements with class="tablinks" and remove the class "is-active"
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" is-active", "");
  }
  
  // Show the current tab, and add an "is-active" class to the button that opened the tab
  let target = document.getElementById(tabName);
  target.className = target.className.replace(" is-hidden", " is-block");
  evt.currentTarget.className += " is-active";
}

const historyTab = document.getElementById("history-tab")
const historyContent = document.getElementById("history-content")

historyTab.addEventListener('click',() => {
    axios.get('http://localhost:8000/results')
    .then(res => {updateHistory(res.data)})
    .catch(err => {console.log(err)})
  }
)

function updateHistory(arr) {
  historyContent.innerHTML = ''
  // Add array filled with tickets
  function checkResult(stat) {
    if (stat === false) {
      return 'Perdu'
    }else if(stat === true){
      return 'Gagné'
    }else{
      return 'Ouvrir'
    }
  }
  function checkBgColor(stat) {
    if (stat === false) {
      return 'has-background-danger-light has-text-danger'
    }else if(stat === true) {
      return 'has-text-success has-background-success-light'
    }else{
      return ''
    }
  }
  arr.forEach(ticket => {
    historyContent.innerHTML += '<tr><td onclick="showModal(\'historyModal\',\''+ticket.ticketId+'\')"><ion-icon name="information-outline"></ion-icon></td><td>'+
    ticket.ticketId+'</td><td> DT</td><td class="'+checkBgColor(ticket.status)+'">'+checkResult(ticket.status)+'</td></tr>'
  });
}


// History Modal Controller
function showModal(idName, id) {
  modal = document.getElementById(idName);
  modal.className += " is-active";
  axios.get('http://localhost:8000/result', {params: { ticketId: id }})
  .then(res => {updateModal(res.data)})
  .catch(err => {console.log(err)})
}

// Modal Update
function updateModal(ticket) {
  console.log(ticket)
  const modalInfo = document.getElementsByClassName("ticket-info")
  modalInfo[0].innerHTML = ticket.ticketId
  modalInfo[1].innerHTML = ticket.mise
  modalInfo[2].innerHTML = ticket.date
  modalInfo[3].innerHTML = ticket.combi
  modalInfo[4].innerHTML = ticket.ticketId

  const modalDetail = document.getElementById("ticket-detail")
  modalDetail.innerHTML = ''
  modalDetail.innerHTML += '<tr><td>'+ ticket.gr +'</td><td>'+ ticket.combi +'</td><td>'+
  ticket.mise+'</td><td>'+ticket.minGain+'</td><td>'+ticket.maxGain+'</td><td>'+ticket.ticketWinSum+'</td></tr>'
  
  const modalChoices = document.getElementById("ticket-choices")
  modalChoices.innerHTML = ''
  ticket.choiceList.forEach(e => {modalChoices.innerHTML += '<tr><td>'+ticket.eventTime+'</td><td>Spin&Win</td><td>'+
  e.choice+'</td><td>'+ticket.eventResult+'</td><td>'+e.status+'</td><td>'+e.cotes+'</td><td>'+e.selectionWinSum+'</td></tr>'
    }
  )
}

function hideModal(idName) {
  modal = document.getElementById(idName);
  modal.className = modal.className.replace(" is-active", "");
} 

// Select Bets
for (let i = 0; i < addToBet.length - 1; i++) {
  addToBet[i].addEventListener("click", function (e) {
    let addedBet = addToBet[i].textContent;
    ticket.gr += Number(addedBet);
    ticket.mise = ticket.gr*ticket.combi;
    mise.innerText = ticket.mise
    gr.innerText = ticket.gr;
    updateGain();
  });
}

addToBet[4].addEventListener("click", function (e) {
  ticket.gr = 1;
  gr.innerText = 1;
  updateGain();
});

/* Add user selections to the side in a table.
  each with an event that call removeSelect function if delete clicked */
for (let i = 0; i < choice.length; i++) {
  choice[i].addEventListener("click", function (e) {
    choiceCheck = choice[i].textContent;
    ticket.choiceList.push({
      choice: choice[i].textContent,
      cotes: checkCotes(choiceCheck),
      status: null,
      selectionWinSum: 0
    });
    updateCombi()
    updateMise()
    updateCotes(ticket.choiceList)
    updateGain()
    selection.innerHTML += "<tr><td>" + String(ticket.choiceList[ticket.choiceList.length - 1].choice) + "</td><td>" + String(ticket.choiceList[ticket.choiceList.length - 1].cotes) + "</td><td onclick='removeSelect(event)'><ion-icon name='close-outline'></ion-icon></td></tr>";
  });
}

function removeSelect(evt) {
  targetSelection = evt.currentTarget.parentElement;
  getElementIndex(targetSelection);
  ticket.choiceList.splice(targetSelection, 1);
  targetSelection.remove();
  updateCombi();
  updateMise()
  updateCotes(ticket.choiceList);
  updateGain();
}

function resetConfig() {
  ticket.gr = 1
  gr.innerText = 1
  ticket.choiceList = []
  const starget = selection
  starget.innerHTML = ''
  updateCombi();
  updateMise()
  updateCotes(ticket.choiceList);
  updateGain();
}


function getElementIndex(element) {
  return Array.from(element.parentNode.children).indexOf(element);
}

function checkCotes(choiceCheck) {
  let cotes = null;

  if (choiceCheck === "PAIR" || choiceCheck === "IMPAIR" || choiceCheck === "ROUGE" || choiceCheck === "NOIR") {
    cotes = 2;
  } else if (choiceCheck === "1-12" || choiceCheck === "13-24" || choiceCheck === "25-36") {
    cotes = 3;
  } else if (choiceCheck === "A" || choiceCheck === "B" || choiceCheck === "C" || choiceCheck === "D" || choiceCheck === "E" || choiceCheck === "F") {
    cotes = 6;
  } else {
    cotes = 36;
  }

  return cotes;
}

function updateCotes(target) {
  if (target.length > 0) {
    let cotesList = [];
    target.forEach(e => {
      cotesList.push(e.cotes);
    });
    ticket.cotesMax = Math.max(...cotesList);
    ticket.cotesMin = Math.min(...cotesList);
    cotesMax.innerText = ticket.cotesMax;
    cotesMin.innerText = ticket.cotesMin;
  } else {
    ticket.cotesMax = 0;
    ticket.cotesMin = 0;
    cotesMax.innerTchoiceListext = "-";
    cotesMin.innerText = "-";
  }
}

function updateCombi() {
  ticket.combi = ticket.choiceList.length;
  combi.innerText = ticket.combi;
}

function updateMise() {
  ticket.mise = ticket.gr*ticket.combi;
  mise.innerText = ticket.mise
}

function updateGain() {
  ticket.minGain = ticket.cotesMin * Number(ticket.gr);
  ticket.maxGain = ticket.cotesMax * Number(ticket.gr);
  maxGain.innerText = ticket.maxGain;
  totalMaxGain.innerText = ticket.maxGain;
  minGain.innerText = ticket.minGain;
}

//Post ticket in database after getting last ticket ID and adding 1 
const print = document.getElementById("print")
print.addEventListener("click", () => {
  axios.get('http://localhost:8000/event')
  .then(res => {
    uploadTicket(res.data.eventId)
    //resetConfig()
  })
  .catch(err => {console.log(err)})
})

function uploadTicket(id) {
  ticket.eventId = id
  axios.post('http://localhost:8000/ticket', ticket)
  .then(res => {
    function ticketConfig(item) {
      if (["A", "B", "C", "D", "E", "F"].includes(item)) {
        return "Sector: "+item
      }else {
        return item
      }
    }
    var date = new Date
    function formatDate() {
      let year = date.getFullYear().toString()
      let day = date.getDate().toString().length === 1? ("0" + date.getDate().toString()): date.getDate().toString();
      let month = date.getMonth().toString()
      return `${day}.${month}.${year}`
    }
    let hours = date.getHours().toString()
    let minutes = date.getMinutes().toString()
    var ticketWindow = window.open("","wildebeast","width=300,height=500,scrollbars=1,resizable=1")
    
    var  ticketHtml = `<!DOCTYPE html><html lang="en"><head><link rel="stylesheet" href="printStyle.css"><script src="JsBarcode.all.min.js"></script></head><body><button id="btnPrint" class="hidden-print">Print</button><div class=ticket><div class=centered><h2 id=logo>&lt;Logo&gt;</h2><span id=adresse>Boutique Sbikha01 - ${formatDate()} ${hours.length === 1? "0" + hours: hours}:${minutes.length === 1? "0" + minutes: minutes}<br><span>Ticket ${res.data.ticketId}</span></div><div id="Bar" class="centered"><svg id="barcode"></svg></div><div class=flex-container><div class=flex-item><div>GR: ${ticket.gr}</div><div>Gain min/max</div></div><div class="flex-item right"><div>${ticket.combi} X ${ticket.gr} TND = ${ticket.mise} TND</div><p>${ticket.minGain} / ${ticket.maxGain} TND</span></div></div><div class=lineDashed></div>`
    ticket.choiceList.forEach((e, i) => {
      ticketHtml += `<div id=ChoiceList><div><p class=gameTitle>${res.data.eventId} Spin&Win<div class=flex-container><div class=flex-item><p class=gameInfo>19:32 ${ticketConfig(ticket.choiceList[i].choice)}</div><div class="flex-item right"><p class=Coutes>${ticket.choiceList[i].cotes}</div></div><div class=lineDotted>.............</div></div></div>`
    })
    ticketHtml += `<div class=lineDashed></div></div><div class="flex-container result ticket"><div class=flex-item><div>Mise Totale</div><div>Gain min/max</div></div><div class="flex-item right"><div>${ticket.mise} TND</div><div>${ticket.minGain} / ${ticket.maxGain} TND</div></div></div><script src=print.js></script>`
    
    ticketWindow.document.open()
    ticketWindow.document.write(ticketHtml)
    resetConfig()
    ticketWindow.document.close()
  })
  .catch(err => {console.log(err)})
}