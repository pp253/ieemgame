import _ from 'lodash'
import config from '../../../config'
import odm from '../../lib/db/odm'
import constant from '../../lib/constant'
import debug from '../../lib/debug'

export default class Enroll {
  constructor () {
    this.enrollList = []
  }
  
  set (enrollItem) {
    this.enrollList.push(_.cloneDeep(enrollItem))
  }

  getEnrollList () {
    return this.enrollList
  }

  // userId should be string, not ObjectId
  getUserEnrolledGames (userId) {
    let result = []
    for (let i of this.enrollList) {
      if (i.userId === userId) {
        result.push(_.cloneDeep(i))
      }
    }
    return result
  }

  // gameId should be string, not ObjectId
  getEnrolledUsers (gameId) {
    let result = []
    for (let i of this.enrollList) {
      if (i.gameId === gameId) {
        result.push(_.cloneDeep(i))
      }
    }
    return result
  }
}
