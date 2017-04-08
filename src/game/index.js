const db = require('./db')
const game = require('./game')

/*
const OrderModel = require('./db/model/order')
OrderModel.getNotDeliveredOrders('58e8f1ec26e4482ef8557b17', {
  product: 0,
  buyer: {
    team: 5,
    job: 4
  },
  seller: {
    team: 5,
    job: 3
  }
}).then(doc => {
  console.log(doc)
})
*/

module.exports = game
