import _ from 'lodash'
import odm from '../../lib/db/odm'
import constant from '../../lib/constant'
import debug from '../../lib/debug'

export const StorageItem = (product, amount) => {
  return {
    product: product,
    amount: amount
  }
}

export default class Storage {
  constructor (gameId, teamId, job) {
    if (!gameId || !teamId || !job) {
      throw new Exception('gameId and teamId could not be blank.')
    }
    this.gameId = gameId
    this.teamId = teamId
    this.job = job
    this.history = []
    this.storageItemList = []

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

  getStorageList () {
    return this.storageItemList
  }

  getStorage (product) {
    for (let item of this.getStorageList()) {
      if (item.product === product) {
        return item.amount
      }
    }
    return constant.STORAGE_EMPTY
  }

  setStorage (productItem, trigger) {
    productItem = _.cloneDeep(productItem)
    productItem.amount = parseInt(productItem.amount)
    
    let storageOdm = new odm.Storages({
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

    storageOdm.save((function (err, storage) {
      if (err) {
        debug.error(err)
        return
      }
      
      this.getHistory().push(_.cloneDeep(productItem))

      let done = false
      for (let item of this.getStorageList()) {
        if (item.product === storage.product) {
          item.amount = storage.amount
          done = true
        }
      }
      if (!done) {
        this.getStorageList().push(_.cloneDeep(productItem))
      }
    }).bind(this))

    return this
  }

  add (productItem, trigger) {
    productItem = _.cloneDeep(productItem)
    productItem.amount = parseInt(productItem.amount)

    productItem.amount = this.getStorage(productItem.product) + productItem.amount
    this.setStorage(productItem, trigger)
    return this
  }

  remove (productItem, trigger) {
    productItem = _.cloneDeep(productItem)
    productItem.amount = parseInt(productItem.amount)
    
    if (this.getStorage(productItem.product) < productItem.amount) {
      throw new debug.Exception(`Product='${productItem.product}' 貨物數量不夠了`)
    }
    productItem.amount = this.getStorage(productItem.product) - productItem.amount
    this.setStorage(productItem, trigger)
    return this
  }
}
