import response from '../response'
import validation from '../validation'
import constant from '../../lib/constant'
import debug from '../../lib/debug'
import GameEngine from '../../gameengine'

export function getBalance (req, res, next) {
  req.check({
    gameId: validation.gameId,
    teamIndex: validation.teamIndex
  })

  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      res.status(400).json(response.ResponseErrorMsg.ApiArgumentValidationError(result))
      return
    }

    let gameId = req.body.gameId
    let teamIndex = req.body.teamIndex
    res.json(response.ResponseSuccessJSON({
      gameId: gameId,
      teamIndex: teamIndex,
      balance: GameEngine.selectGame(gameId).selectTeam(teamIndex).getAccount().getBalance()
    }))
  })
}

export function getHistory (req, res, next) {
  req.check({
    gameId: validation.gameId,
    teamIndex: validation.teamIndex
  })

  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      res.status(400).json(response.ResponseErrorMsg.ApiArgumentValidationError(result))
      return
    }

    let gameId = req.body.gameId
    let teamIndex = req.body.teamIndex
    res.json(response.ResponseSuccessJSON({
      gameId: gameId,
      teamIndex: teamIndex,
      list: GameEngine.selectGame(gameId).selectTeam(teamIndex).getAccount().getHistory()
    }))
  })
}

export function take (req, res, next) {
  req.check({
    gameId: validation.gameId,
    teamIndex: validation.teamIndex,
    balance: validation.balance
  })

  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      res.status(400).json(response.ResponseErrorMsg.ApiArgumentValidationError(result))
      return
    }

    let gameId = req.body.gameId
    let game = GameEngine.selectGame(gameId)
    let teamIndex = req.body.teamIndex
    let balance = req.body.balance
    if (game.selectTeam(teamIndex).getAccount().getBalance() < balance) {
      // team account is not enough for delivering costing
      res.json(response.ResponseErrorMsg.AccountNotEnough(gameId, teamIndex))
      return
    }

    game.selectTeam(teamIndex).getAccount().take(constant.AccountItem({
      day: game.getDay(),
      time: game.getTime(),
      balance: balance
    }))
    res.json(response.ResponseSuccessJSON({
      gameId: gameId,
      teamIndex: teamIndex,
      day: game.getDay(),
      time: game.getTime(),
      balance: balance
    }))
  })
}

export function give (req, res, next) {
  req.check({
    gameId: validation.gameId,
    teamIndex: validation.teamIndex,
    balance: validation.balance
  })

  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      res.status(400).json(response.ResponseErrorMsg.ApiArgumentValidationError(result))
      return
    }

    let gameId = req.body.gameId
    let game = GameEngine.selectGame(gameId)
    let teamIndex = req.body.teamIndex
    let balance = req.body.balance
    game.selectTeam(teamIndex).getAccount().give(constant.AccountItem({
      day: game.getDay(),
      time: game.getTime(),
      balance: balance
    }))
    res.json(response.ResponseSuccessJSON({
      gameId: gameId,
      teamIndex: teamIndex,
      day: game.getDay(),
      time: game.getTime(),
      balance: balance
    }))
  })
}

export default {
  'get_balance': getBalance,
  'get_history': getHistory,
  'take': take,
  'give': give
}
