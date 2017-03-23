const AccountModel = require('../../db/model/account')

class Account {
  constructor (props) {
    this.data = {
      game_id: props.gameId,
      team: props.team
    }
    this.accountModel = new AccountModel()
  }

  getMoney () {
    return new Promise((resolve, reject) => {
      this.accountModel.getMoney((err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
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

