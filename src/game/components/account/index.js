.const AccountModel = require('../../db/model/account')
const SpecialIncomeOutcomeModel = require('../../db/model/specialincomeoutcome')
const DeliverModel = require('../../db/model/deliver')
const OrderModel = require('../../db/model/order')
const StorageModel = require('../../db/model/storage')

class Account {
  constructor (props) {
    this.data = {
      gameId: props.gameId,
      team: props.team
    }
    this.accountModel = new AccountModel()
  }

  getMoney () {
    let totalMoney = AccountModel.getMoney({
      gameId: this.gameId,
      team: this.team
    })
    totalMoney += SpecialIncomeOutcomeModel.getTotal({
      gameId: this.gameId,
      team: this.team
    })
    totalMoney += OrderModel.getTotal({
      gameId: this.gameId,
      team: this.team
    })
    totalMoney += DeliverModel.getTotal({
      gameId: this.gameId,
      team: this.team
    })

    return totalMoney
  }

  withdraw (money, cause) {
    let lastMoney = this.accountModel.getMoney()

    this.accountModel.newRecord(Object.assign({
      money: lastMoney - money,
      cause: cause
    }, this.data))
  }
}

module.exports = Account

