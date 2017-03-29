require('../index')

const mongoose = require('mongoose')

const AccountSchema = new mongoose.Schema(
  {
    time: { type: Date, default: Date.now },
    game_id: { type: String, require: true }, // mongoose.Schema.Types.ObjectId
    cause: { type: String, require: false },
    team: { type: Number, require: true },
    money: { type: Number, require: true, default: 0 }
  }
)

AccountSchema.statics = {
  findByGameId: function (gameId) {
    return this.find({game_id: gameId})
  },
  findByGameIdAndTeam: function (gameId, team) {
    return this.find({gameId: gameId, team: team})
  },
  getMoney: function (gameId, team) {
    return this.find({gameId: gameId, team: team})
      .sort({_id: 1}).limit(1).exec()
  }
}

module.exports = mongoose.model('Account', AccountSchema)
