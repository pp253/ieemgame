import mongoose from 'mongoose'
import config from '../../../config'
import * as debug from '../debug'

// http://mongoosejs.com/docs/promises.html
mongoose.Promise = global.Promise

let host = config.database.host
let port = config.database.port
let name = config.database.name

new Promise((resolve, reject) => {
  mongoose.connect(`mongodb://${host}:${port}/${name}`, (err) => {
    if (err) {
      reject(err)
      return
    }
    
    resolve()
  })
}).then(() => {
  debug.log('Success to connect to MongoDB')
}).catch((err) => {
  debug.error('Failed to connect to MongoDB at ', `mongodb://${host}:${port}/${name}`)
  debug.error(err)
})
