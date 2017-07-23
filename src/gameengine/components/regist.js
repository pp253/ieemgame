import _ from 'lodash'
import config from '../../../config'
import odm from '../../lib/db/odm'
import constant from '../../lib/constant'
import debug from '../../lib/debug'

export default class Regist {
  constructor () {
    this.registList = []

    // code
    this.code = {
      initial: config.regist.code.initial,
      interval: config.regist.code.interval,
      module: config.regist.code.module
    }
    this.lastCode = this.code.initial
  }

  getCode () {
    this.lastCode = (this.lastCode + this.code.interval) % this.code.module
    return this.lastCode
  }

  getUserIdByCode (code) {
    return new Promise(function (resolve, reject) {
      if (code < 0 || code >= this.code.module) {
        // code is invalid
        return reject(false)
      }
      odm.Regist.findOne({ code: code }).exec((function (err, regist) {
        if (err) {
          reject(err)
          return
        }
        resolve(regist)
      }).bind(this))
    })
  }

  getUser (userId) {
    return new Promise(function (resolve, reject) {
      odm.Regist.findOne({ userId: userId }).exec((function (err, regist) {
        if (err) {
          reject(err)
          return
        }
        resolve(regist)
      }).bind(this))
    })
  }

  setUser (playerItem) {
    let registOdm = new odm.Regist({
      nickname: playerItem.nickname,
      code: code
    })

    return new Promise((function (resolve, reject) {
      registOdm.save((function (err, regist) {
        if (err) {
          debug.error(err)
          return
        }
        
        this.registList.push(regist)
        resolve(regist)
      }).bind(this))
    }).bind(this))
  }
}
