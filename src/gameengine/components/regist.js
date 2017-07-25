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

  nicknameIsExist (nickname) {
    for (let i of this.registList) {
      if (i.nickname === nickname) {
        return true
      }
    }
    return false
  }

  getCode () {
    this.lastCode = (this.lastCode + this.code.interval) % this.code.module
    return this.lastCode
  }

  getUserByCode (code) {
    for (let i of this.registList) {
      if (i.code === code) {
        return _.cloneDeep(i)
      }
    }
    return null
  }

  getUser (userId) {
    for (let i of this.registList) {
      if (i.userId === userId) {
        return _.cloneDeep(i)
      }
    }
    return null
  }

  setUser (UserItem) {
    let registOdm = new odm.Regist({
      nickname: UserItem.nickname,
      code: UserItem.code
    })

    return new Promise((function (resolve, reject) {
      registOdm.save((function (err, regist) {
        if (err) {
          debug.error(err)
          return
        }
        
        this.registList.push(_.cloneDeep(regist))
        resolve(regist)
      }).bind(this))
    }).bind(this))
  }
}
