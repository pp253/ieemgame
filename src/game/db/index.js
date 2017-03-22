const mongoose = require('mongoose')
const config = require('../../../config')
const debug = require('../../lib/debug')

try {
  mongoose.connect(`mongodb://${config.database.default.host}:${config.database.default.port}/ieemgame`)
} catch (e) {
  debug.error('Failed to connect to MongoDB at ', `mongodb://${config.database.default.host}:${config.database.default.port}/ieemgame`)
  debug.error(e)
}

debug.log('Success to connect to MongoDB')
