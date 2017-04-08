const moment = require('moment')

exports.time = () => moment().format('MM-DD HH:mm:ss')

exports.log = (...msg) => console.log(exports.time() + ' ' + msg.shift(), ...msg)

exports.error = (...msg) => console.error(exports.time() + ' ' + msg.shift(), ...msg)

exports.info = (...msg) => console.info(exports.time() + ' ' + msg.shift(), ...msg)

exports.debug = (...msg) => console.debug(exports.time() + ' ' + msg.shift(), ...msg)

exports.Exception = class {
  constructor (id, msg, syserr) {
    this.error = 1
    switch (typeof id) {
      case 'object':
        this.id = id.id
        this.msg = id.msg
        this.syserr = id.syserr
        break
      case 'number':
        this.id = id
        this.msg = msg
        this.syserr = syserr
        break
    }
  }

  toJSON () {
    return JSON.stringify({
      error: 1,
      id: this.id,
      msg: this.msg
    })
  }
}
