import response from '../response'
import GameEngine from '../../../src/gameengine'
import constant from '../../../src/lib/constant'
import debug from '../../../src/lib/debug'
import validation from './validation'

export function getGameStage (req, res, next) {
  req.check({
    gameId: validation.gameId
  })

  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      res.status(400).json(response.ResponseErrorMsg.ApiArgumentValidationError(result.array()))
      return
    }

    let gameId = req.body.gameId
    res.json(response.ResponseSuccessJSON({
      gameId: gameId,
      stage: GameEngine.selectGame(gameId).getGameStage()
    }))
  })
}

export function setGameStage (req, res, next) {
  req.check({
    gameId: validation.gameId,
    stage: validation.stage
  })

  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      res.status(400).json(response.ResponseErrorMsg.ApiArgumentValidationError(result.array()))
      return
    }

    let gameId = req.body.gameId
    let stage = req.body.stage
    GameEngine.selectGame(gameId).setGameStage(stage)
    res.json(response.ResponseSuccessJSON({
      gameId: gameId,
      stage: stage
    }))
  })
}

export function nextGameStage (req, res, next) {
  req.check({
    gameId: validation.gameId
  })

  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      res.status(400).json(response.ResponseErrorMsg.ApiArgumentValidationError(result.array()))
      return
    }

    let gameId = req.body.gameId
    let game = GameEngine.selectGame(gameId)
    game.nextGameStage()
    res.json(response.ResponseSuccessJSON({
      gameId: gameId,
      stage: game.getGameStage()
    }))
  })
}

export function setGameNextDay (req, res, next) {
  req.check({
    gameId: validation.gameId
  })

  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      res.status(400).json(response.ResponseErrorMsg.ApiArgumentValidationError(result.array()))
      return
    }

    let gameId = req.body.gameId
    let game = GameEngine.selectGame(gameId)
    if (game.isWorking()) {
      res.json(response.ResponseErrorMsg.IsWorking('gameId'))
      return
    }
    game.nextDay()
    res.json(response.ResponseSuccessJSON({
      gameId: gameId,
      day: game.getDay()
    }))
  })
}

export function getGameTime (req, res, next) {
  req.check({
    gameId: validation.gameId
  })

  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      res.status(400).json(response.ResponseErrorMsg.ApiArgumentValidationError(result.array()))
      return
    }

    let gameId = req.body.gameId
    let game = GameEngine.selectGame(gameId)
    res.json(response.ResponseSuccessJSON({
      gameId: gameId,
      day: game.getDay(),
      dayStartTime: game.getDayStartTime(),
      time: game.getTime(),
      isWorking: game.isWorking()
    }))
  })
}

export function getGameInfo (req, res, next) {

}

export function getGameJobList (req, res, next) {

}

export function getGameStaffJobList (req, res, next) {

}

export function getTeamList (req, res, next) {

}

export default {
  'get_game_stage': getGameStage,
  'set_game_stage': setGameStage,
  'next_game_stage': nextGameStage,
  'set_game_next_day': setGameNextDay,
  'get_game_time': getGameTime,
  'get_game_info': getGameInfo,
  'get_game_job_list': getGameJobList,
  'get_game_staff_job_list': getGameStaffJobList,
  'get_team_list': getTeamList
}
