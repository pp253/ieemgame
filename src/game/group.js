const Account = require('./components/account')

class Group {
  constructor (props) {
    this.data = {
      gameId: props.gameId,
      team: this.data.team
    }
    this.account = new Account({
      gameId: this.data.gameId,
      team: this.data.team
    })
  }
}

module.exports = Group
