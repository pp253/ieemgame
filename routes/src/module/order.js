import response from '../response'
import GameEngine from '../../../src/gameengine'
import constant from '../../../src/lib/constant'
import validation from './validation'

export function getReceivedOrders (req, res, next) {
  req.check({
    gameId: validation.gameId,
    teamIndex: validation.teamIndex,
    job: validation.job
  })

  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      res.status(400).json(response.ResponseErrorMsg.ApiArgumentValidationError(result))
      return
    }

    let gameId = req.body.gameId
    let teamIndex = req.body.teamIndex
    let job = req.body.job
    res.json(response.ResponseSuccessJSON({
      gameId: gameId,
      stage: GameEngine.selectGame(gameId).selectTeam(teamIndex).selectJob(job).order.getOrderList()
    }))
  })
}

export function setOrder (req, res, next) {
  req.check({
    gameId: validation.gameId,
    stage: validation.stage
  })

  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      res.status(400).json(response.ResponseErrorMsg.ApiArgumentValidationError(result))
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

export default {
  'get_receiver_orders': getReceivedOrders,
  'set_order': setOrder
}
