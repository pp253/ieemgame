import mongoose from 'mongoose'
import _ from 'lodash'
import constant from '../lib/constant'
import GameEngine from '../gameengine'

export function gameIsExist (gameId) {
  return GameEngine.gameIsExist(gameId)
}

export function isObjectId (value) {
  return mongoose.Types.ObjectId.isValid(value)
}

export default {
  'gameId': {
    in: 'body',
    notEmpty: true,
    isObjectId: {
      errorMessage: 'GameId is not a valid ObjectId'
    },
    gameIsExist: {
      errorMessage: 'Game Is Not Exist'
    },
    errorMessage: 'Invalid GameId'
  },
  'teamId': {
    in: 'body',
    notEmpty: true,
    isObjectId: {
      errorMessage: 'GameId is not a valid ObjectId'
    },
    teamIsExist: {
      errorMessage: 'Game Is Not Exist'
    },
    errorMessage: 'Invalid GameId'
  },
  'teamIndex': {
    in: 'body',
    notEmpty: true,
    isInt: true,
    errorMessage: 'Invalid TeamIndex'
  },
  'gameConfig': {
    in: 'body',
    optional: true,
    errorMessage: 'Invalid GameConfig'
  },
  'stage': {
    in: 'body',
    notEmpty: true,
    matches: {
      options: _.values(constant.GAME_STAGE)
    },
    errorMessage: 'Invalid Stage'
  },
  'amount': {
    in: 'body',
    notEmpty: true,
    isInt: true,
    errorMessage: 'Invalid Amount'
  },
  'job': {
    in: 'body',
    notEmpty: true,
    matches: _.concat(_.values(constant.JOBS), _.values(constant.STAFF_JOBS)),
    errorMessage: 'Invalid Job'
  },
  'team': {
    in: 'body',
    notEmpty: true,
    isInt: true,
    errorMessage: 'Invalid Team'
  },
  'product': {
    in: 'body',
    notEmpty: true,
    errorMessage: 'Invalid ProductItem'
  }
}

