import _ from 'lodash'
import odm from '../../lib/db/odm'
import constant from '../../lib/constant'
import debug from '../../lib/debug'

export default class Order {
  constructor (gameId, teamId, job) {
    if (!gameId || !teamId || !job) {
      throw new Exception('gameId and teamId could not be blank.')
    }
    this.gameId = gameId
    this.teamId = teamId
    this.job = job
    this.history = []
    this.orderItemList = []

    // load(this.gameId, this.teamId)
  }

  load (gameId, teamId, job) {
    if (!gameId || !teamId || !job) {
      this.gameId = gameId
      this.teamId = teamId
      this.job = job
    }
  }
  
  getHistory () {
    return this.history
  }

  getOrderList () {
    return this.orderItemList
  }

  getOrder (product) {
    for (let item of this.getOrderList()) {
      if (item.product === product) {
        return item.amount
      }
    }
    return constant.STORAGE_EMPTY
  }

  setOrder (productItem, trigger) {
    let orderOdm = new odm.Orders({
      gameId: this.gameId,
      teamId: this.teamId,
      job: this.job,
      triggerCollection: trigger && trigger.collection,
      triggerId: trigger && trigger.id,
      product: productItem.product,
      amount: productItem.amount,
      day: productItem.day,
      time: productItem.time
    })

    orderOdm.save((function (err, order) {
      if (err) {
        debug.error(err)
        return
      }
      
      this.getHistory().push(_.cloneDeep(productItem))

      let done = false
      for (let item in this.getOrderList()) {
        if (item.product === order.product) {
          item.amount = order.amount
          done = true
        }
      }
      if (!done) {
        this.getOrderList().push(_.cloneDeep(productItem))
      }
    }).bind(this))

    return this
  }

  add (productItem, trigger) {
    productItem.amount = this.getOrder(productItem.product) + productItem.amount
    this.setOrder(productItem, trigger)
    return this
  }

  // this method should not be used
  remove (productItem, trigger) {
    if (this.getOrder(productItem.product) < productItem.amount) {
      throw new debug.Exception(`Product='${product}' 貨物數量不夠了`)
    }
    productItem.amount = this.getOrder(productItem.product) - productItem.amount
    this.setOrder(productItem, trigger)
    return this
  }
}
