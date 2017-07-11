import _ from 'lodash'
import odm from '../../lib/db/odm'
import constant from '../../lib/constant'
import debug from '../../lib/debug'

export default class Deliver {
  constructor (gameId, teamId, job) {
    if (!gameId || !teamId || !job) {
      throw new Exception('gameId and teamId could not be blank.')
    }
    this.gameId = gameId
    this.teamId = teamId
    this.job = job
    this.history = []
    this.deliverItemList = []

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

  getDeliverList () {
    return this.deliverItemList
  }

  getDeliver (product) {
    for (let item of this.getDeliverList()) {
      if (item.product === product) {
        return item.amount
      }
    }
    return constant.STORAGE_EMPTY
  }

  setDeliver (productItem, trigger) {
    productItem = _.cloneDeep(productItem)
    productItem.amount = parseInt(productItem.amount)
    
    let deliverOdm = new odm.Deliver({
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

    deliverOdm.save((function (err, deliver) {
      if (err) {
        debug.error(err)
        return
      }
      
      this.getHistory().push(_.cloneDeep(productItem))

      let done = false
      for (let item of this.getDeliverList()) {
        if (item.product === deliver.product) {
          item.amount = deliver.amount
          done = true
        }
      }
      if (!done) {
        this.getDeliverList().push(_.cloneDeep(productItem))
      }
    }).bind(this))

    return this
  }

  add (productItem, trigger) {
    productItem = _.cloneDeep(productItem)
    productItem.amount = parseInt(productItem.amount)
    
    productItem.amount = this.getDeliver(productItem.product) + productItem.amount
    this.setDeliver(productItem, trigger)
    return this
  }

  // this method should not be used
  remove (productItem, trigger) {
    productItem = _.cloneDeep(productItem)
    productItem.amount = parseInt(productItem.amount)
    
    if (this.getDeliver(productItem.product) < productItem.amount) {
      throw new debug.Exception(`Product='${product}' 貨物數量不夠了`)
    }
    productItem.amount = this.getDeliver(productItem.product) - productItem.amount
    this.setDeliver(productItem, trigger)
    return this
  }
}
