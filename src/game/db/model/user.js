require('../index')

const mongoose = require('mongoose')
const constant = require('./constant')

const UserSchema = new mongoose.Schema(
  {
    time: { type: constant.Time, default: Date.now },
    game_id: { type: constant.GameId, require: true },
    session_uuid: { type: String, require: true },
    position: constant.Position
  }
)

UserSchema.statics = {
  findByGameId: function (gameId) {
    return this.find({game_id: gameId})
  },
  findBySessionId: function (sessionUuid) {
    return this.find({session_uuid: sessionUuid})
  },
  findByGroup: function (group) {
    return this.find({group: group})
  },
  findByTeam: function (team) {
    return this.find({team: team})
  },
  findByTeamAndJob: function (team, job) {
    return this.find({seller: team}).find({job: job})
  }
}

module.exports = mongoose.model('User', UserSchema)
