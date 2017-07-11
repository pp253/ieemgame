import mongoose from 'mongoose'
import '../'
import * as odmConstant from './odm-constant'

const NewsSchema = new mongoose.Schema(
  {
    gameId: { type: odmConstant.GameId, require: true },
    title: { type: String, require: true },
    content: { type: String, require: false },
    picture: { type: String, require: false },
    triggerCollection: { type: odmConstant.Collection, require: false },
    triggerId: { type: odmConstant.Id, require: false },
    product: { type: odmConstant.Product, require: true },
    demanded: { type: odmConstant.Amount, require: true },
    price: { type: odmConstant.Balance, require: false },
    day: { type: odmConstant.Day, require: true },
    time: { type: odmConstant.GameTime, require: true },
    createdDateTime: {
      type: odmConstant.DateTime,
      require: true,
      default: Date.now()
    }
  }
)

NewsSchema.statics = {
}

mongoose.model('News', NewsSchema)

export default mongoose.model('News')
