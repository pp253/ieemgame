const moment = require('moment')

exports.time = () => moment().format('MM/DD HH:mm:ss')

exports.log = (...msg) => console.log(exports.time(), ...msg)

exports.error = (...msg) => console.error(exports.time(), ...msg)

exports.info = (...msg) => console.info(exports.time(), ...msg)

exports.debug = (...msg) => console.debug(exports.time(), ...msg)

exports.Exception = class {
  constructor (id, msg, syserr) {
    this.id = id
    this.msg = msg
    this.syserr = syserr
  }

  toJSON () {
    return JSON.stringify({
      id: this.id,
      msg: this.msg
    })
  }
}
