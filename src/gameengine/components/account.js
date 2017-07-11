import odm from '../../lib/db/odm'
import constant from '../../lib/constant'
import debug from '../../lib/debug'

export default class Account {
  constructor (gameId, teamId, job) {
    if (!gameId || !teamId) {
      throw new Exception('gameId and teamId could not be blank.')
    }
    this.gameId = gameId
    this.teamId = teamId
    this.job = job
    this.history = []
    this.balance = 0

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

  getBalance () {
    return this.balance
  }

  setBalance (accountItem, trigger) {
    let accountOdm = new odm.Accounts({
      gameId: this.gameId,
      teamId: this.getTeamId(),
      triggerCollection: trigger && trigger.collection,
      triggerId: trigger && trigger.id,
      balance: accountItem.balance,
      day: accountItem.day,
      time: accountItem.time
    })

    accountOdm.save((function (err, account) {
      if (err) {
        debug.error(err)
        return
      }
      this.history.push(constant.AccountItem({
        balance: account.balance,
        day: account.day,
        time: account.time
      }))
      this.balance = account.balance
      debug.log(`TeamId='${this.getTeamId()}' balance has been set to ${this.getBalance()}.`)
    }).bind(this))

    return this
  }

  give (accountItem, trigger) {
    accountItem.balance = this.getBalance() + accountItem.balance
    this.setBalance(accountItem, trigger)
    return this
  }

  take (accountItem, trigger) {
    if (this.getBalance() < accountItem.balance) {
      throw new debug.Exception('錢不夠了')
    }
    accountItem.balance = this.getBalance() - accountItem.balance
    this.setBalance(accountItem, trigger)
    return this
  }

  getTeamId () {
    return this.teamId
  }
}
