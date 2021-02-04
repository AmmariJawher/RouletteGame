const centerColor = document.getElementById("sawCenterColor")
const centerText = document.getElementById("sawCenterText")
const sawSector = document.getElementById("sawSector")
const wheel = document.getElementById("saw-wheel-bg")
const timerText = document.querySelector(".saw-next-game-counter")
const timerBar = document.querySelector(".announcement")
const pointer = document.querySelector("#saw-wheel-top-pointer")

function getAllEvents() {
  axios.get('http://localhost:8000/events')
  .then(res => {updateStats(res.data)})
  .catch(err => {console.log(err)})
}


// We take the last event and post our event data
function getEvent(param) {
  axios.get('http://localhost:8000/event')
  .then(res => {lastEventNum(res.data, param)})
  .catch(err => {console.log(err)})
}

function lastEventNum(data) {
  const eventCounter = document.getElementById("event-counter")
  eventCounter.innerText = data.eventId+1
  let options = [0,26,3,35,12,28,7,29,18,22,9,31,14,20,1,33,16,24,5,10,23,8,30,11,36,13,27,6,34,17,25,2,21,4,19,15,32,0];
  axios.post('http://localhost:8000/event', {
    result: Math.floor((Math.random() * 36)+1)
  })
  .then(res => {getAllEvents()})
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
  // Create a new array and fill it's blunk with 0
  let results = Array.apply(null, Array(37)).map(function () {return 0})
  // Update History
  const history = document.getElementById("event-history")
  history.innerHTML = ''
  data.forEach((element, index) => {
    if (index < 9 && index !== 0) {
      history.innerHTML += '<div class="saw-history-row saw-history-row_bg"><div class="saw-history-id" data-animation=""><span>#'+
      element.eventId+'</span></div><div class="saw-history-block" style="background:'+
      getGradient(element.result)+ ';" data-animation="false"><span>'+
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
      getGradient(index)+';" class="saw-history-block saw-history-color" data-animation="false"><span>'+
      index+'</span></div><div class="saw-history-count" data-animation=""><span>'+element+'</span></div></div>'
    } else if(index < 25) {
      numberStat.childNodes[1].innerHTML += '<div class="saw-history-row saw-history-row_bg"> <div style="background: '+
      getGradient(index)+';" class="saw-history-block saw-history-color" data-animation="false"><span>'+
      index+'</span></div><div class="saw-history-count" data-animation=""><span>'+element+'</span></div></div>'
    } else {
      numberStat.childNodes[2].innerHTML += '<div class="saw-history-row saw-history-row_bg"> <div style="background:'+
      getGradient(index)+';" class="saw-history-block saw-history-color" data-animation="false"><span>'+
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

let timer = 5000//240000;
let shouldCount = true;

function byte2Hex(n) {
  var nybHexString = "0123456789ABCDEF";
  return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
}
setInterval(function() {
  const totalTime = 240000
  
  var minutes = Math.floor((timer % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((timer % (1000 * 60)) / 1000);
  
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;
  
  timerBar.style.transition = "height 1s linear"
  timerText.innerHTML = minutes + ":" + seconds;
  
  // If the count down is over, write some text
    if (timer <= 0) {
      timerBar.style.transition = "none"
      timerBar.style.height = "879px"
      axios.get('http://localhost:8000/event')
      .then(res => {
        let result = res.data.result
        let date = res.data.date
        // Process tickets according to event result
        axios.get('http://localhost:8000/tickets', {params:{eventId: res.data.eventId}})
          .then(res => {
            res.data.forEach(ticket => {
              ticket.status = false
              ticket.eventTime = date
              ticket.eventResult = result;
              ticket.choiceList.forEach(e => {
                let choice = e.choice
                if(checkChoice(choice, ticket.eventResult)) {
                  e.selectionWinSum = e.cotes * ticket.gr
                  e.status = true
                  ticket.ticketWinSum += e.selectionWinSum
                  ticket.status = true
                } else {e.status = false}
              })
            axios.post('http://localhost:8000/result', ticket ) //TODO: Push data to a new database called results, that will be used for history
            .then()
            .catch(err => {console.log(err)})
            })
          })
          .catch(err => {console.log(err)})


        let options = [0,26,3,35,12,28,7,29,18,22,9,31,14,20,1,33,16,24,5,10,23,8,30,11,36,13,27,6,34,17,25,2,21,4,19,15,32];
        data = res.data.result
        console.log(data);
        target = options.indexOf(data)+1
        spin()
      })
      .catch(err => {console.log(err)})
    timer = totalTime
    timerBar.style.background = "#2ac000"
  } else if (shouldCount) {
    timer-= 1000
    if (timer <= 60000) {
      timerBar.style.height = String(879 * timer/60000) + "px"
      switch (timer) {
        case 30000:
          timerBar.style.background = "#cace40"
          break;
        case 20000:
          timerBar.style.background = "#d77700"
          break;
        case 10000:
          timerBar.style.background = "#d0141c"
          break;
      }
    } 
  }
}, 1000);

//Change design after every sprint
let background = document.querySelector('.saw-container');
let wheelStyle = document.querySelector('.saw-wheel-container');

function changeStyle(background, wheel){
  let currentStyle = background.dataset.style  
  switch (currentStyle) {
    case "wood":
      background.dataset.style = "carpet"
      wheel.dataset.style = "carpet"
      break;
    case "carpet":
      background.dataset.style = "chrome"
      wheel.dataset.style = "chrome"
      break;
    case "chrome":
      background.dataset.style = "wood"
      wheel.dataset.style = "wood"
      break;
    default:
      break;
  }
  return currentStyle
}
// Identify if selected choice equal to current event result
function checkChoice(choice, result) {
  let i = Number(result)
  let bool = false
  // Number
  const numbers = [0, 2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35, 1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]
  // Colors
  const black = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35]
  const red = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]

  // Twelves
  const colOne = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const colTwo = [ 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
  const colThree = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]

  // Sections
  const sectionA = [2, 21, 4, 19, 15, 32]
  const sectionB = [13, 27, 6, 34, 17, 25]
  const sectionC = [10, 23, 8, 30, 11, 36]
  const sectionD = [20, 1, 33, 16, 5, 24]
  const sectionE = [29, 18, 22, 9, 31, 14]
  const sectionF = [7, 28, 12, 35, 3, 26]

  if(numbers.includes(Number(choice))) {
    if (i === Number(choice)) bool = true
  } else {
    switch (choice) {
      case 'ROUGE': 
        if(red.includes(i)) {
          bool = true
        }
        break;
      case 'NOIR':
        if(black.includes(i)) {
          bool = true
        }
        break;
      case 'VERT': 
        if(i === 0) {
          bool = true
        }
        break;
      case '1.12':
        if(colOne.includes(i)) {
          bool = true
        }
        break;
      case '13-24': 
        if(colTwo.includes(i)) {
          bool = true
        }
        break;
      case '25-36':
        if(colThree.includes(i)) {
          bool = true
        }
        break;
      case 'A': 
        if(sectionA.includes(i)) {
          bool = true
        }
        break;
      case 'B':
        if(sectionB.includes(i)) {
          bool = true
        }
        break;
      case 'C': 
        if(sectionC.includes(i)) {
          bool = true
        }
        break;
      case 'D':
        if(sectionD.includes(i)) {
          bool = true
        }
        break;
      case 'E':
        if(sectionE.includes(i)) {
          bool = true
        }
        break;
      case 'F':
        if(sectionF.includes(i)) {
          bool = true
        }
        break;
      case 'PAIR':
        if(i%2 === 0) {
          bool = true
        }
        break;
      case 'IMPAIR':
        if(i%2 !== 0) {
          bool = true
        }
    }
  }
  return bool
}

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
function getGradient(item) {
  const black = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35]
  if(item === 0){
    return "linear-gradient(180deg,#25aa00 0,#25aa00 24%,#1e9100 66%,#1e9100)";
  }else if(black.includes(item)){
    return "linear-gradient(180deg,#353535 0,#353535 24%,#0f0f0f 66%,#0f0f0f)";
  }else{
    return "linear-gradient(180deg,#ed0404 0,#ed0404 24%,#d33437 66%,#d33437)";
  }
}

function spin() {
  timerText.parentElement.style.display = "none"
  timerBar.parentElement.style.display = "none"
  sawSector.style.display = "none"
  spinAngleStart = 360 * 4 // only for easeOut function to work
  spinAngle = 10
  spinDest = 0; 
  spinDestTotal = 360 * 15; // aka Spining Speed
  rotateWheel();
}

let target = 3;
const rotateWheel = function() {
  spinDest += 20; // aka Spin Duration
  if(spinDest >= spinDestTotal) {
    stopRotateWheel(target);
    return;
  }
  // Center Rotaion is 9.72972972973
  spinAngle = ((target - 1) * 9.8) + easeOut(spinDest, 0, spinAngleStart,spinDestTotal);
  wheel.style.rotate = String(spinAngle+"deg")
  pointerAngle = ((target - 1) * 9.8) + easeOut(spinDest, 0, spinAngleStart,spinDestTotal)*4;
  console.log(String("translateX(-50%) rotate(-"+pointerAngle+"deg)"));
  
  pointer.style.transform = String("translateX(-50%) rotate(-"+(pointerAngle%43)+"deg)")
  let text = options[checkIndex()]
  centerColor.style.fill = getColor(text)
  centerText.innerHTML = text
  spinTimeout = setTimeout('rotateWheel()', 30);
}

function stopRotateWheel(target) {
  clearTimeout(spinTimeout);
  spinDest = 0
  //sawSector.style.display = "block" // Show results
  pointer.style.transform = String("translateX(-50%) rotate(0deg)")
  document.getElementById("sawSectorValue").innerHTML = options[checkIndex()]
  getEvent(target)
  setTimeout(() => {
    timerText.parentElement.style.display = "block"
    timerBar.parentElement.style.display = "block"
    changeStyle(background, wheelStyle)
  }, 10000);
}

function easeOut(t, b, c, d) {
  var ts = (t/=d)*t;
  var tc = ts*t;
  return b+c*(tc + -3*ts + 3*t);
}

function checkIndex() {
  let degrees = (spinAngle%360)/9.72972972973;
  let index = Math.round(degrees)
  return index
}