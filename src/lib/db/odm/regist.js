import mongoose from 'mongoose'
import '../'
import * as odmConstant from './odm-constant'

const RegistSchema = new mongoose.Schema(
  {
    nickname: { type: odmConstant.Nickname, require: true },
    code: { type: odmConstant.Code, require: true },
    createdDateTime: {
      type: odmConstant.DateTime,
      require: true,
      default: Date.now()
    }
  }
)

RegistSchema.statics = {
}

mongoose.model('Regist', RegistSchema)

export default mongoose.model('Regist')
