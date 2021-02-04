const centerColor = document.getElementById("sawCenterColor");
const centerText = document.getElementById("sawCenterText");
const sawSector = document.getElementById("sawSector")
const wheel = document.getElementById("saw-wheel-bg");

function getAllEvents() {
  axios.get('http://localhost:8000/events')
  .then(res => {updateStats(res.data)})
  .catch(err => {console.log(err)})
}

function getEvent(pram) {
  axios.get('http://localhost:8000/event')
  .then(res => {lastEventNum(res.data, pram)})
  .catch(err => {console.log(err)})
}

function lastEventNum(data, pram) {
  const eventCounter = document.getElementById("event")
  let currentEvent = data.number+1
  eventCounter.firstElementChild.innerText = "ÉVÉNEMENT: "+(currentEvent+1)
  let options = [0,26,3,35,12,28,7,29,18,22,9,31,14,20,1,33,16,24,5,10,23,8,30,11,36,13,27,6,34,17,25,2,21,4,19,15,32,0];
  axios.post('http://localhost:8000/event', {
    number: currentEvent,
    result: options[pram-1]
  })
  .then(res => {getAllEvents()})
  .catch(err => {console.log(err)})
}

function postEvent() {
  axios.post('http://localhost:8000/event', {
    userId: '1',
    number: todoTitle,
    result: false
  })
  .then(res => {updateStats()})
  .catch(err => {console.log(err)})
}

function biggestFiveNumbers(arr, count) {
  let result = []
  for (let i = 0; i < count; i++) {
    let max = Math.max(...arr);    
  }
}

getAllEvents()

function updateStats(data) {
  let results = Array.apply(null, Array(37)).map(function () {return 0})
  // Update History
  const history = document.getElementById("event-history")
  history.innerHTML = ''
  data.forEach((element, index) => {
    if (index < 8) {
      history.innerHTML += '<div class="saw-history-row saw-history-row_bg"><div class="saw-history-id" data-animation=""><span>#'+
      element.number+'</span></div><div class="saw-history-block" style="background:'+
      getColor(element.result)+ ';" data-animation="false"><span>'+
      element.result+'</span></div></div>'
    }
    // Results
    results[element.result] += 1
  });

  // Numbers
  const numberStat = document.getElementById("number-stat")
  const zero = document.getElementById("zero")
  numberStat.innerHTML = ('<div class="saw-history-col"></div>'.repeat(3))
  // Colors
  const colorStat = document.getElementsByClassName("color-stat")
  const black = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35]
  const red = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]
  colorStat[0].innerHTML = 0
  colorStat[1].innerHTML = 0
  colorStat[2].innerHTML = 0

  // Twelves
  const twelveStat = document.getElementsByClassName("twelves-stat")
  const colOne = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]
  const colTwo = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35]
  const colThree = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]

  // Sections
  const sectionStat = document.getElementsByClassName("section-stat")
  const sectionA = [2, 21, 4, 19, 15, 32]
  const sectionB = [13, 27, 6, 34, 17, 25]
  const sectionC = [10, 23, 8, 30, 11, 36]
  const sectionD = [20, 1, 33, 16, 5, 24]
  const sectionE = [29, 18, 22, 9, 31, 14]
  const sectionF = [7, 28, 12, 35, 3, 26]

  results.forEach((element, index) => {
    // Update Number
    if (index == 0) {
      zero.innerHTML = element
    } else if(index < 13) {
      numberStat.childNodes[0].innerHTML += '<div class="saw-history-row saw-history-row_bg"> <div style="background:'+
      getColor(index)+';" class="saw-history-block saw-history-color" data-animation="false"><span>'+
      index+'</span></div><div class="saw-history-count" data-animation=""><span>'+element+'</span></div></div>'
    } else if(index < 25) {
      numberStat.childNodes[1].innerHTML += '<div class="saw-history-row saw-history-row_bg"> <div style="background:'+
      getColor(index)+';" class="saw-history-block saw-history-color" data-animation="false"><span>'+
      index+'</span></div><div class="saw-history-count" data-animation=""><span>'+element+'</span></div></div>'
    } else {
      numberStat.childNodes[2].innerHTML += '<div class="saw-history-row saw-history-row_bg"> <div style="background:'+
      getColor(index)+';" class="saw-history-block saw-history-color" data-animation="false"><span>'+
      index+'</span></div><div class="saw-history-count" data-animation=""><span>'+element+'</span></div></div>'
    }
    
    // Update Colors
    if (red.includes(index)) {
      colorStat[0].innerHTML = Number(colorStat[0].innerHTML)+element
    } else if(black.includes(index)) {
      colorStat[1].innerHTML = Number(colorStat[1].innerHTML)+element
    } else {
      colorStat[2].innerHTML = Number(colorStat[2].innerHTML)+element
    }

    // Update Twelves
    if (colOne.includes(index)) {
      twelveStat[0].innerHTML = Number(twelveStat[0].innerHTML)+element
    } else if(colTwo.includes(index)) {
      twelveStat[1].innerHTML = Number(twelveStat[1].innerHTML)+element
    } else if (colThree.includes(index)){
      twelveStat[2].innerHTML = Number(twelveStat[2].innerHTML)+element
    }

    // Update Sections
    if (sectionA.includes(index)) {
      sectionStat[0].innerHTML = Number(sectionStat[0].innerHTML)+element
    } else if(sectionB.includes(index)) {
      sectionStat[1].innerHTML = Number(sectionStat[1].innerHTML)+element
    } else if (sectionC.includes(index)){
      sectionStat[2].innerHTML = Number(sectionStat[2].innerHTML)+element
    } else if (sectionD.includes(index)){
      sectionStat[3].innerHTML = Number(sectionStat[3].innerHTML)+element
    } else if (sectionE.includes(index)){
      sectionStat[4].innerHTML = Number(sectionStat[4].innerHTML)+element
    } else if (sectionF.includes(index)){
      sectionStat[5].innerHTML = Number(sectionStat[5].innerHTML)+element
    }
   })
  const h = document.getElementsByClassName("")
  const hi = document.getElementsByClassName("")
}

let options = [0,26,3,35,12,28,7,29,18,22,9,31,14,20,1,33,16,24,5,10,23,8,30,11,36,13,27,6,34,17,25,2,21,4,19,15,32,0];

// Spining
let spinTimeout = null
let spinAngle = 10
let spinAngleStart = 0;
let spinDest = 0
let spinDestTotal = 0

const event = {}
// Result
let choiceCheck= ""
let choiceIndex= null
let choiceStyle = ""

let timer = 3000;
let shouldCount = true;

function byte2Hex(n) {
  var nybHexString = "0123456789ABCDEF";
  return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
}

setInterval(function() {
  const totalTime = 30000
  const timerText = document.getElementsByClassName("saw-next-game-counter")
  const timerBar = document.getElementsByClassName("announcement")

  var minutes = Math.floor((timer % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((timer % (1000 * 60)) / 1000);

  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  timerBar[0].style.transition = "height 1s linear"
  timerText[0].innerHTML = minutes + ":" + seconds;

  // If the count down is over, write some text 
  if (timer <= 0) {
    timerBar[0].style.transition = "none"
    timerBar[0].style.height = "879px"
    spin()
    timer = totalTime
  } else if (shouldCount) {
    timer-= 1000    
    timerBar[0].style.height = String(879 * timer/totalTime) + "px"
  }
}, 1000);

function RGB2Color(r,g,b) {
  return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
}

function getColor(item) {
  const black = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35]
  if(item === 0){
    return RGB2Color(33, 154, 0)
  }else if(black.includes(item)){
    return RGB2Color(15, 15, 15)
  }else{
    return RGB2Color(235, 35, 35);
  }
}

function spin() {
  sawSector.style.display = "none"
  spinAngleStart = 360 * 4 // only for easeOut function to work
  spinAngle = 10
  spinDest = 0; 
  spinDestTotal = 360 * 15; // aka Spining Speed
  rotateWheel(wheel);
}

let target = Math.floor(Math.random() * 36)
const rotateWheel = function() {
  spinDest += 20; // aka Spin Duration

  if(spinDest >= spinDestTotal) {
    stopRotateWheel(target);
    return;
  }
  spinAngle = ((target - 1) * 9.72972972973) + easeOut(spinDest, 0, spinAngleStart,spinDestTotal);
  wheel.style.rotate = String(spinAngle+"deg")

  let text = options[checkIndex()]
  centerColor.style.fill = getColor(text)
  centerText.innerHTML = text

  spinTimeout = setTimeout('rotateWheel()', 30);
}

function stopRotateWheel(target) {
  clearTimeout(spinTimeout);
  spinDest = 0
  sawSector.style.display = "block" // Show results
  document.getElementById("sawSectorValue").innerHTML = options[checkIndex()]
  getEvent(target)
}

function easeOut(t, b, c, d) {
  var ts = (t/=d)*t;
  var tc = ts*t;
  return b+c*(tc + -3*ts + 3*t);
}

function checkDegree(k) {}


function checkIndex() {
  let degrees = (spinAngle%360)/9.72972972973;
  let index = Math.round(degrees)
  return index
}


function checkWin(num){
  // will check if the bet is on
  let winnings = 0;
  let losings = 0;
  let orderNum = Array.from(Array(37).keys())

    if(choiceCheck === "2:1" && choiceIndex === 13) {
      const colOne = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]
      if(Number(choiceCheck) === 0){
        losings = Number(bet.innerText) * 2
        lost.textContent = losings
      }else if (colOne.includes(num)) {
        winnings = Number(bet.innerText) * 2
        won.textContent = winnings
      }else{
        losings = Number(bet.innerText) * 2
        lost.textContent = losings
      }
    }else if(choiceCheck === "2:1" && choiceIndex === 26) {
      const colTwo = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35]
      if(Number(choiceCheck) === 0){
        losings = Number(bet.innerText) * 2
        lost.textContent = losings
      }else if (colTwo.includes(num)) {
        winnings = Number(bet.innerText) * 2
        won.textContent = winnings
      }else{
        losings = Number(bet.innerText) * 2
        lost.textContent = losings
      }
    }else if(choiceCheck === "2:1" && choiceIndex === 39) {
      const colThree = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]
      if(Number(choiceCheck) === 0){
        losings = Number(bet.innerText) * 2
        lost.textContent = losings
      }else if (colThree.includes(num)) {
        winnings = Number(bet.innerText) * 2
        won.textContent = winnings
      }else{
        losings = Number(bet.innerText) * 2
        lost.textContent = losings
      }
    }else if(choiceCheck === "1st 12"){
      const first = orderNum.slice(1,13)
      if(Number(choiceCheck) === 0){
        losings = Number(bet.innerText) * 3
        lost.textContent = losings
      }else if (first.includes(num)) {
        winnings = Number(bet.innerText) * 3
        won.textContent = winnings
      }else{
        losings = Number(bet.innerText) * 3
        lost.textContent = losings
      }
    }else if(choiceCheck === "2nd 12"){
      const second = orderNum.slice(13,25)
      if(Number(choiceCheck) === 0){
        losings = Number(bet.innerText) * 3
        lost.textContent = losings
      }else if (second.includes(num)) {
        winnings = Number(bet.innerText) * 3
        won.textContent = winnings
      }else{
        losings = Number(bet.innerText) * 3
        lost.textContent = losings
      }
    }else if(choiceCheck === "3rd 12"){
      const third = orderNum.slice(25,37)
      if(Number(choiceCheck) === 0){
        losings = Number(bet.innerText) * 3
        lost.textContent = losings
      }else if (third.includes(num)) {
        winnings = Number(bet.innerText) * 3
        won.textContent = winnings
      }else{
        losings = Number(bet.innerText) * 3
        lost.textContent = losings
      }
    }else if(choiceCheck === "1-18"){
      const begin = orderNum.slice(1,19)
      if(Number(choiceCheck) === 0){
        losings = Number(bet.innerText) * 2
        lost.textContent = losings
      }else if (begin.includes(num)) {
        winnings = Number(bet.innerText) * 2
        won.textContent = winnings
      }else{
        losings = Number(bet.innerText) * 2
        lost.textContent = losings
      }
    }else if(choiceCheck === "18-36"){
      const last = orderNum.slice(19,37)
      if(Number(choiceCheck) === 0){
        losings = Number(bet.innerText) * 2
        lost.textContent = losings
      }else if (last.includes(num)) {
        winnings = Number(bet.innerText) * 2
        won.textContent = winnings
      }else{
        losings = Number(bet.innerText) * 2
        lost.textContent = losings
      }
    }else if(choiceCheck === "Even"){
      if(num === 0 || num % 2 != 0){
        losings = Number(bet.innerText) * 2
        lost.textContent = losings
      }else{
        winnings = Number(bet.innerText) * 2
        won.textContent = winnings
      }
    }else if(choiceCheck === "Odd"){
      if(num === 0 || num % 2 === 0){
        losings = Number(bet.innerText) * 2
        lost.textContent = losings
      }else{
        winnings = Number(bet.innerText) * 2
        won.textContent = winnings
      }
    }else if(choiceCheck === "Red"){
      const reds = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]
      if(Number(choiceCheck) === 0){
        losings = Number(bet.innerText) * 2
        lost.textContent = losings
      }else if (reds.includes(num)) {
        winnings = Number(bet.innerText) * 2
        won.textContent = winnings
      }else{
        losings = Number(bet.innerText) * 2
        lost.textContent = losings
      }
    }else if(choiceCheck === "Black"){
      const black = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35]
      if(Number(choiceCheck) === 0){
        losings = Number(bet.innerText) * 2
        lost.textContent = losings
      }else if (black.includes(num)) {
        winnings = Number(bet.innerText) * 2
        won.textContent = winnings
      }else{
        losings = Number(bet.innerText) * 2
        lost.textContent = losings
      }
    }else{
    if(Number(choiceCheck) === 0){
      losings = Number(bet.innerText) * 36
      lost.textContent = losings
    }else if (Number(choiceCheck) === num){
      winnings = Number(bet.innerText) * 36
      won.textContent = winnings
    }else{
      losings = Number(bet.innerText) * 36
      lost.textContent = losings
    }
  }
}