require('../index')

const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema(
  {
    time: { type: Date, default: Date.now },
    game_id: { type: String },
    name: { type: String, require: true },
    trigger: { type: String }
  }
)

EventSchema.statics = {
  newEvent: function (name, trigger, gameId) {
    this.insertOne({
      gameId: gameId,
      name: name,
      trigger: trigger
    })
    this.save()
  },
  findByTrigger: function (trigger) {
    return this.find({trigger: trigger})
  },
  findByGameId: function (gameId) {
    return this.find({gameId: gameId})
  }
}

module.exports = mongoose.model('Event', EventSchema)
