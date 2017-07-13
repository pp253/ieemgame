import mongoose from 'mongoose'
import '../'
import * as odmConstant from './odm-constant'

const TeamsSchema = new mongoose.Schema(
  {
    gameId: { type: odmConstant.GameId, require: true },
    config: { type: Object },
    createdDateTime: {
      type: odmConstant.DateTime,
      require: true,
      default: Date.now()
    }
  }
)

TeamsSchema.statics = {
  getTeamList (gameId) {
    return this.find({ gameId: gameId }).sort({ createdDateTime: 1 }).exec()
  }
}

mongoose.model('Teams', TeamsSchema)

export default mongoose.model('Teams')
