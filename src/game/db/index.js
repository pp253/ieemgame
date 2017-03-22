const mongoose = require('mongoose')
const config = require('../../../config')
const debug = require('../../lib/debug')

new Promise((resolve, reject) => {
  mongoose.connect(`mongodb://${config.database.default.host}:${config.database.default.port}/ieemgame`, (err) => {
    if (err) {
      reject(err)
    } else {
      resolve()
    }
  })
}).then(() => {
  debug.log('Success to connect to MongoDB')
}).catch((err) => {
  debug.error('Failed to connect to MongoDB at ', `mongodb://${config.database.default.host}:${config.database.default.port}/ieemgame`)
  debug.error(err)
})
