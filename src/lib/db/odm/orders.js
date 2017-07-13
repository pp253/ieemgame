import mongoose from 'mongoose'
import '../'
import * as odmConstant from './odm-constant'

const OrdersSchema = new mongoose.Schema(
  {
    gameId: { type: odmConstant.GameId, require: true },
    teamId: { type: odmConstant.TeamId, require: true },
    job: { type: odmConstant.Job, require: true },
    triggerCollection: { type: odmConstant.Collection, require: false },
    triggerId: { type: odmConstant.Id, require: false },
    product: { type: odmConstant.Product, require: true },
    amount: { type: odmConstant.Amount, require: true },
    day: { type: odmConstant.Day, require: true },
    time: { type: odmConstant.GameTime, require: true },
    createdDateTime: {
      type: odmConstant.DateTime,
      require: true,
      default: Date.now()
    }
  }
)

OrdersSchema.statics = {
}

mongoose.model('Orders', OrdersSchema)

export default mongoose.model('Orders')
