
function getLastEventId(){
  // get last eventId and use it to find Tickets related to it
  axios.get('http://localhost:8000/event')
  .then(res => {updateTicket(res.data.eventId)})
  .catch(err => {console.log(err)})
}

function updateTicket(Id) {
  console.log(Id)
  axios.get('http://localhost:8000/tickets', {params: {eventId: Id}})
      .then(res => {calculateResult(res.data)})
      .catch(err => {console.log(err)})
}

getLastEventId()

function calculateResult(arr) {
console.log(arr[0])
arr.forEach(ticket => {
  ticket.eventResult = 12
})
arr.forEach(ticket => {
  ticket.ticketStatus = false
  ticket.choiceList.forEach(e => {
    let choice = e.choice
    if(checkChoice(choice, ticket.result)) {
      e.slectionWinSum = e.cotes * ticket.gr
      e.status = true
      ticket.ticketStatus = true
      ticket.ticketWinSum += e.slectionWinSum
      ticket.ticketStatus = true
    } else {
      e.status = false
    }
  })
  })
	console.log(arr[0])
}



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

  if(numbers.includes(choice)) {
		console.log('hi')
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