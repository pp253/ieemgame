
var POSITION = {
  team: 5,
  job: 4 // TEAM_RETIALER
}

function newGame () {
  axios.post('/gameapi/new_game')
  .then((doc) => {
    console.log(doc.data)
  })
}

function addUser () {
  axios.post('/gameapi/add_user', {
    team: POSITION.team,
    job: POSITION.job
  })
  .then((doc) => {
    console.log(doc.data)
  })
}

function nextStage () {
  axios.post('/gameapi/next_stage')
  .then((doc) => {
    console.log(doc.data)
  })
}

function order () {
  axios.post('/gameapi/order', {
    seller: {
      team: 5,
      job: 3
    },
    buyer: POSITION,
    product: 0, // car
    quantity: 6
  })
  .then((doc) => {
    console.log(doc.data)
  })
}

function deliver () {
  axios.post('/gameapi/deliver', {
    seller: {
      team: 5,
      job: 3
    },
    buyer: POSITION,
    product: 0, // car
    quantity: 6
  })
  .then((doc) => {
    console.log(doc.data)
  })
}

function getStatus () {
  axios.post('/gameapi/get_status')
  .then((doc) => {
    console.log(doc.data)
  })
}

function getOrders (afterTime) {
  axios.post('/gameapi/get_orders')
  .then((doc) => {
    console.log(doc.data)
  })
}

function getDelivers (afterTime) {
  axios.post('/gameapi/get_delivers')
  .then((doc) => {
    console.log(doc.data)
  })
}

function getUpdates () {
  axios.post('/gameapi/get_updates')
  .then((doc) => {
    console.log(doc.data)
  })
}
