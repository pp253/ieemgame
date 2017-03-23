require('../index')

const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    time: { type: Date, default: Date.now },
    game_id: { type: String, require: true },
    session_uuid: { type: String, require: true },
    group: { type: String, require: true },
    team: { type: Number, default: -1 },
    job: { type: String }
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

module.exports = mongoose.model('UserModel', UserSchema)
