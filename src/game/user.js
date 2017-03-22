const uuid = require('uuid-1345')

let db = {
  'admin': {
    passwd: '1234',
    authority: 'admin'
  },
  'stage': {
    passwd: '1234',
    authority: 'stage'
  },
  'teamleader': {
    passwd: '1234',
    authority: 'teamleader'
  },
  'teammember': {
    passwd: '',
    authority: 'teammember'
  }
}

class User {
  constructor (props) {
    this.data = {}

    switch (typeof props) {
      case 'string':
        this.loadAccount(props)
        break
      case 'object':
        this.data = props
        if (this.data.login === undefined) {
          this.loadAccount()
        }
        break
      default:
        break
    }

    this.loadAccount = this.loadAccount.bind(this)
    this.isLogin = this.isLogin.bind(this)
    this.validate = this.validate.bind(this)
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)

    return this
  }

  loadAccount (username) {
    Object.assign(this.data, {
      login: !!this.data.login,
      username: '',
      authority: '',
      uuid: ''
    })
    return this
  }

  isLogin () {
    return this.data.login
  }

  validate (username, userpasswd) {
    if (!db || !db[username]) {
      return false
    }

    if (db[username] === userpasswd) {
      return true
    } else {
      return false
    }
  }

  login (username, userpasswd) {
    if (!this.validate(username, userpasswd)) {
      return false
    }

    this.data.login = true
    this.loadAccount(username)

    return true
  }

  logout () {
    if (!this.isLogin()) {
      return false
    }

    this.data.login = false
    return true
  }
}

exports.User = User
