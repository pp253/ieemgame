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

  setStorage (day, time, product, amount, triggerCollection, triggerId) {
    let storageOdm = new odm.Storage({
      gameId: this.gameId,
      teamId: this.teamId,
      job: this.job,
      triggerCollection: triggerCollection,
      triggerId: triggerId,
      product: product,
      amount: amount,
      day: day,
      time: time
    })

    storageOdm.save((function (err, storage) {
      if (err) {
        debug.error(err)
        return
      }
      
      let done = false
      for (let item in this.getStorageList()) {
        if (item.product === storage.product) {
          item.amount = storage.amount
          done = true
        }
      }
      if (!done) {
        this.getStorageList().push(StorageItem(storage.product, storage.amount))
      }
    }).bind(this))

    return this
  }

  give (day, time, product, amount, triggerCollection, triggerId) {
    this.setStorage(day, time, product, this.getStorage(product) + amount, triggerCollection, triggerId)
    return this
  }

  take (day, time, product, amount, triggerCollection, triggerId) {
    if (this.getStorage(product) < amount) {
      throw new debug.Exception(`Product='${product}' 貨物數量不夠了`)
    }
    this.setStorage(day, time, product, this.getStorage(product) - amount, triggerCollection, triggerId)
    return this
  }
}
