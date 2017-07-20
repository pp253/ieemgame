import _ from 'lodash'
import mongoose from 'mongoose'
import * as constant from '../../constant'

export const Code = Number
export const Nickname = String
export const Id = mongoose.Schema.ObjectId
export const GameId = Id
export const TeamId = Id
export const Team = Number
export const Job = String
export const Position = {
  gameId: { type: GameId, require: true },
  team: { type: Team, require: true },
  job: {
    type: Job,
    enum: _.values(constant.JOBS),
    require: true
  }
}
export const DateTime = Date
export const Day = Number
export const Time = Number
export const GameTime = {
  day: { type: Day, require: true },
  time: { type: Time, require: true }
}
export const Product = String
export const Amount = Number
export const Cost = Number
export const Balance = Number
export const Stage = String
export const defaultStage = constant.GAME_STAGE.PREPARE
export const Collection = String
