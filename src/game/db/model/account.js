require('../index')

const mongoose = require('mongoose')
const debug = require('../../../lib/debug')

const AccountSchema = new mongoose.Schema(
  {
    time: { type: Date, default: Date.now },
    game_id: { type: String, require: true },
    cause: { type: String, require: false },
    team: { type: String, require: true },
    money: { type: Number, require: true, default: 0 }
  }
)

AccountSchema.statics = {
  findByGameId: function (gameId) {
    return this.find({game_id: gameId})
  },
  findByTeam: function (gameId, team) {
    return this.find({gameId: gameId, team: team})
  },
  getMoney: function (gameId, team) {
    return this.find({gameId: gameId, team: team})
      .sort({_id: 1}).limit(1).exec()
  },
  newRecord: function (props) {
    this.insertOne({
      game_id: props.gameId,
      cause: props.cause,
      team: props.team,
      money: props.money
    })
    this.save((err) => {
      if (err) {
        debug.error(err)
      }
    })
  }
}

module.exports = mongoose.model('AccountModel', AccountSchema)
