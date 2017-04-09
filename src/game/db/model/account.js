require('../index')

const mongoose = require('mongoose')
const constant = require('./constant')

const AccountSchema = new mongoose.Schema(
  {
    time: { type: constant.Time, default: Date.now },
    game_id: { type: constant.GameId, require: true }, // mongoose.Schema.Types.ObjectId
    cause: { type: constant.Cause, require: false },
    team: { type: constant.Team, require: true },
    money: { type: constant.Money, require: true, default: 0 }
  }
)

AccountSchema.statics = {
  findByGameId: function (gameId) {
    return this.find({game_id: gameId})
  },
  findByGameIdAndTeam: function (gameId, team) {
    return this.find({gameId: gameId, team: team})
  },
  getByTeam: function (gameId, team) {
    return this.find({
      game_id: gameId,
      team: team
    }).sort({time: 1}).exec()
  }
}

module.exports = mongoose.model('account', AccountSchema)
