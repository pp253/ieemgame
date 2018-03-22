import _ from 'lodash'
import odm from '../../lib/db/odm'
import constant from '../../lib/constant'
import debug from '../../lib/debug'
import Account from './account'
import Order from './order'
import Deliver from './deliver'
import Storage from './storage'

export const DEFAULT_CONFIG = {
  title: '隊伍',
  teamIndex: 1,
  teammembers: 12
}

export default class Team {
  constructor (gameId, teamConfig) {
    if (!gameId) {
      throw new Exception('gameId and teamId could not be blank.')
    }
    this.gameId = gameId
    this.teamConfig = Object.assign(_.cloneDeep(DEFAULT_CONFIG), teamConfig)
    this.teamId = null
    this.teamOdm = null
    this.account = null

    this.load()
  }

  load (teamId) {
    if (!teamId) {
      // create a new team
      this.teamOdm = new odm.Teams({
        gameId: this.gameId,
        config: this.getConfig()
      })

      this.teamOdm.save((err, team) => {
        if (err) {
          debug.error(err)
          return
        }
        this.teamId = team._id

        this.account = new Account(this.gameId, this.teamId)

        for (let job in constant.JOBS) {
          if (job === constant.JOBS.UNKNOWN) {
            continue
          }
          this[job] = {
            order: new Order(this.gameId, this.teamId, job),
            deliver: new Deliver(this.gameId, this.teamId, job),
            storage: new Storage(this.gameId, this.teamId, job)
          }
        }
      })
    } else {
      // load an existed team
    }
  }

  selectJob (job) {
    if (_.values(constant.JOBS).indexOf(job) !== -1) {
      return this[job]
    }
  }

  getTeammembers () {
    return this.getConfig().teammembers
  }

  getTeamId () {
    return this.teamId
  }

  getConfig () {
    return this.teamConfig
  }

  getAccount () {
    return this.account
  }
}
