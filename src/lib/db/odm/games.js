import mongoose from 'mongoose'
import '../'
import * as odmConstant from './odm-constant'

const GamesSchema = new mongoose.Schema(
  {
    config: { type: Object },
    createdDateTime: {
      type: odmConstant.DateTime,
      require: true,
      default: Date.now()
    },
    stage: {
      type: odmConstant.Stage,
      default: odmConstant.defaultStage
    }
  }
)

GamesSchema.statics = {
  getGameList () {
    return this.find().sort({ createdDateTime: 1 }).exec()
  }
}

mongoose.model('Games', GamesSchema)

export default mongoose.model('Games')
