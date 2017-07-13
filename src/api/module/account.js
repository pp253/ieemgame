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

export default {
  'get_balance': getBalance,
  'get_history': getHistory
}
