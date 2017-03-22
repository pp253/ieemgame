const db = require('./db')
const Deliver = require('./db/schema/deliver')

let newDeliver = new Deliver()
Object.assign(newDeliver, {
  game_id: 'xxx',
  order: 'xxx',
  product: 'xxx',
  quantity: 123,
  cost: 456456,
  buyer: 'xxx',
  seller: 'xxx'
})
newDeliver.save()
