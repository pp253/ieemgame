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
      res.status(400).json(response.ResponseErrorMsg.ApiArgumentValidationError(result.array()))
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
    teamIndex: validation.teamIndex,
    job: validation.job,
    product: validation.product,
    amount: validation.amount
  })

  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      res.status(400).json(response.ResponseErrorMsg.ApiArgumentValidationError(result.array()))
      return
    }

    let gameId = req.body.gameId
    let teamIndex = req.body.teamIndex
    let job = req.body.job
    let product = req.body.product
    let amount = req.body.amount

    let mapping = { 'RETAILER': 'WHOLESALER', 'WHOLESALER': 'FACTORY' }
    let game = GameEngine.selectGame(gameId)

    GameEngine.selectGame(gameId).selectTeam(teamIndex).selectJob(job).order.add(constant.ProductItem({
      day: game.getDay(),
      time: game.getTime(),
      product: product,
      amount: amount
    }))
    res.json(response.ResponseSuccessJSON({
      gameId: gameId,
      teamIndex: teamIndex,
      job: job,
      day: game.getDay(),
      time: game.getTime(),
      product: product,
      amount: amount
    }))
  })
}

export default {
  'get_receiver_orders': getReceivedOrders,
  'get_history': getHistory,
  'set_order': setOrder
}
