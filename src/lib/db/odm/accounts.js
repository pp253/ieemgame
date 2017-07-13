import mongoose from 'mongoose'
import '../'
import * as odmConstant from './odm-constant'

const AccountsSchema = new mongoose.Schema(
  {
    gameId: { type: odmConstant.GameId, require: true },
    teamId: { type: odmConstant.TeamId, require: true },
    triggerCollection: { type: odmConstant.Collection, require: false },
    triggerId: { type: odmConstant.Id, require: false },
    balance: { type: odmConstant.Balance, require: true },
    day: { type: odmConstant.Day, require: true },
    time: { type: odmConstant.GameTime, require: true },
    createdDateTime: {
      type: odmConstant.DateTime,
      require: true,
      default: Date.now()
    }
  }
)

AccountsSchema.statics = {
}

mongoose.model('Accounts', AccountsSchema)

export default mongoose.model('Accounts')
