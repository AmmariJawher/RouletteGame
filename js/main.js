const mise = document.getElementById("mise")
const combi = document.getElementById("combi")
const cotesMax = document.getElementById("cotesMax")
const cotesMin = document.getElementById("cotesMin")
const maxGain = document.getElementById("maxGain")
const minGain = document.getElementById("minGain")
const selection = document.getElementById("Selection")
const choice = document.querySelectorAll(".choice")
const addToBet = document.querySelectorAll(".addToBet")

let choiceCheck= ""
let choiceIndex= null

let ticket = {
  eventName: "Spin&Win",
  eventResult: null,
  combi: null,
  minGain: null,
  maxGain: null,
  cotesMin: null,
  cotesMax: null,
  status: null,
  mise: 1,
  TicketWinSum: null,
  eventTime: null,
  choiceList: []
}
 

// Tabs Navigation
document.getElementsByClassName("tablinks")[0].click();
function openTab(evt, tabName) {
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  tablinks = document.getElementsByClassName("tablinks");

  for (i = 0; i < tabcontent.length; i++) {
    if(tabcontent[i].classList.contains("is-block")) {
      tabcontent[i].className = tabcontent[i].className.replace(" is-block", " is-hidden")
    }
  }

  // Get all elements with class="tablinks" and remove the class "is-active"
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" is-active", "");
  }

  // Show the current tab, and add an "is-active" class to the button that opened the tab
  let target = document.getElementById(tabName)
  target.className = target.className.replace(" is-hidden", " is-block");
  evt.currentTarget.className += " is-active";
}

// Modal Controller
function showModal(idName) {
  modal = document.getElementById(idName);
  modal.className += " is-active"
}
function hideModal(idName) {
  modal = document.getElementById(idName);
  modal.className = modal.className.replace(" is-active", "");
}


// Select Bets
for(let i = 0; i<addToBet.length - 1; i++){
  addToBet[i].addEventListener("click", function(e){
    addedBet = addToBet[i].textContent
    ticket.mise += Number(addedBet)
    mise.innerText = ticket.mise
    updateGain()
  })
}
addToBet[4].addEventListener("click", function(e){
  ticket.mise = 1
  mise.innerText = 1
  updateGain()
})

/* Add user selections to the side in a table.
  each with an event that call removeSelect function if delete clicked */
for(let i = 0; i<choice.length; i++){
  choice[i].addEventListener("click", function(e){
    choiceCheck = choice[i].textContent
    ticket.choiceList.push({
      choice: choice[i].textContent,
      cotes: checkCotes(choiceCheck),
      status: null,
      selectionWinSum: 0
    })
    updateCombi()
    updateCotes(ticket.choiceList)
    updateGain()
    selection.innerHTML += "<tr><td>" + String(ticket.choiceList[ticket.choiceList.length-1].choice) + "</td><td>"+
    String(ticket.choiceList[ticket.choiceList.length-1].cotes) +"</td><td onclick='removeSelect(event)'>X</td></tr>"
  })
}

function removeSelect(evt) {
  targetSelection = evt.currentTarget.parentElement
  getElementIndex(targetSelection)
  ticket.choiceList.splice(targetSelection, 1)
  targetSelection.remove()
  updateCombi()
  updateCotes(ticket.choiceList)
  updateGain()
}

function getElementIndex (element) {
  return Array.from(element.parentNode.children).indexOf(element);
}

function checkCotes(choiceCheck){
  let cotes = null
    if(choiceCheck === "PAIR" || choiceCheck === "IMPAIR" || choiceCheck === "ROUGE"
    ||choiceCheck === "NOIR"){
      cotes = 2
    }else if(choiceCheck === "1-12" || choiceCheck === "13-24" || choiceCheck === "25-36"){
      cotes = 3
    }else if(choiceCheck === "A" || choiceCheck === "B" || choiceCheck === "C"
    || choiceCheck === "D" || choiceCheck === "E" || choiceCheck === "F"){
      cotes = 6
    }else{
      cotes = 36
  }
  return cotes
}

function updateCotes(target) {
  if (target.length > 0) {
    let cotesList = []
    target.forEach(e => {cotesList.push(e.cotes)})
    ticket.cotesMax = Math.max(...cotesList)
    ticket.cotesMin = Math.min(...cotesList)
    cotesMax.innerText = ticket.cotesMax
    cotesMin.innerText = ticket.cotesMin
  }else {
    ticket.cotesMax = 0
    ticket.cotesMin = 0
    cotesMax.innerTchoiceListext = "-"
    cotesMin.innerText = "-"
  }
}

function updateCombi() {
  ticket.combi = ticket.choiceList.length
  combi.innerText = ticket.combi 
}
function updateGain() {
  ticket.minGain = ticket.cotesMin * Number(ticket.mise)
  ticket.maxGain = ticket.cotesMax * Number(ticket.mise)
  maxGain.innerText = ticket.maxGain
  minGain.innerText = ticket.minGain
}