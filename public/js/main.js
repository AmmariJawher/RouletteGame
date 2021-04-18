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
      return 'has-background-danger-dark has-text-white'
    }else if(stat === true) {
      return 'has-text-white has-background-success-dark'
    }else{
      return ''
    }
  }
  arr.forEach(ticket => {  
    historyContent.innerHTML += '<tr class="is-black"><td onclick="showModal(\'historyModal\', 0,\''+ticket.ticketId+'\')"><span class="icon has-text-info is-size-5 has-background-black"><ion-icon name="eye-outline"></ion-icon></span></td><td>'+
    ticket.ticketId+'</td><td> DT</td><td class="'+checkBgColor(ticket.status)+'">'+checkResult(ticket.status)+'</td></tr>'
  });
}


// History Modal Controller
function showModal(idName, state, id) {
  modal = document.getElementById(idName);
  modal.className += " is-active";
  switch (state) {
    // search ticket result by id
    case 0:
      axios.get('http://localhost:8000/result', {params: { ticketId: id }})
      .then(res => {updateModal(res.data)})
      .catch(err => {console.log(err)})      
      break;
    // call a limited number of tickets
    case 1:
      axios.get('http://localhost:8000/results')
      .then(res => {updateEarnings(res.data)})
      .catch(err => {console.log(err)})
      break
    default:
      break;
  }
}

const ticketSearch = document.querySelector("#search-ticket")
const ticketSearchButton = document.querySelector("#search-ticket-btn")

ticketSearch.addEventListener('keyup',function(e){
  if (e.keyCode === 13) {
    showModal("historyModal", 0, ticketSearch.value)
}
});
ticketSearchButton.addEventListener('click',function(){
  showModal("historyModal", 0, ticketSearch.value)
});


// Modal Update
function updateModal(ticket) {
  const modalInfo = document.getElementsByClassName("ticket-info")
  modalInfo[0].innerHTML = ticket.ticketId
  modalInfo[1].innerHTML = ticket.mise
  modalInfo[2].innerHTML = ticket.date
  modalInfo[3].innerHTML = ticket.combi
  modalInfo[4].innerHTML = ticket.status

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
    selection.innerHTML += "<tr class='is-black'><td>" + String(ticket.choiceList[ticket.choiceList.length - 1].choice) + "</td><td>" + String(ticket.choiceList[ticket.choiceList.length - 1].cotes) + "</td><td onclick='removeSelect(event)'><span class='icon has-text-danger is-size-5 has-background-black'><ion-icon name='close-outline'></ion-icon></span></td></tr>";
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
    cotesMax.innerText = "-";
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
/*
function UpdateFormDate() {
  const fromDate = document.querySelector("#fromDate");
  const toDate = document.querySelector("#toDate");

  const startDate = fromDate.querySelector(".date")
  const startTime = fromDate.querySelector(".time")
  const endDate = toDate.querySelector(".date")
  const endTime = toDate.querySelector(".time")
  
  let current_datetime = new Date()
  let formatted_date = current_datetime.getDate() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear()
  let formatted_time = (current_datetime.getHours()) + ":" + current_datetime.getMinutes()

  startDate.value = formatted_date
  startTime.value = formatted_time
  endDate.value = formatted_date
  endTime.value = formatted_time
  
  //let startDate = new Date(2018, startMonth, 24, 10);
}
*/
const earningButton = document.querySelector("#earning-button")
const earningContent = document.querySelector("#earnings-content")
earningButton.addEventListener('click',() => {
  
}
)
function updateEarnings(arr) {
  earningContent.innerHTML = ''
  let revenues = 0
  let expenses = 0
  // use .parse() to fix error and convert date to millisecond
  let lastDate = new Date(arr[0].date.slice(0,10))
  function compareTwoDate(start, end) {
  let elapsed = end.getDate() - start.getDate()
    return elapsed
  }

  arr.forEach(ticket => {
    let ticketDate = new Date(ticket.date.slice(0,10))
    if (compareTwoDate(lastDate, ticketDate) !== 0) {
      earningContent.innerHTML += `<tr><td>${lastDate.toLocaleDateString()}</td><td>${revenues} TND</td><td>${expenses} TND</td><td>${earnings} TND</td></tr>`
      revenues = 0
      expenses = 0
      lastDate.setDate(lastDate.getDate() + 1);
    }
    switch (ticket.status) {
      case true:
        expenses += Number(ticket.ticketWinSum)
        break;
      case false:
        revenues += Number(ticket.mise)
      default:
        break;
    }
  });
  earningContent.innerHTML += `<tr><td>${lastDate.toLocaleDateString()}</td><td>${revenues} TND</td><td>${expenses} TND</td><td>${revenues - expenses} TND</td></tr>`
}