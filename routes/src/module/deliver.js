import response from '../response'
import GameEngine from '../../../src/gameengine'
import constant from '../../../src/lib/constant'
import validation from './validation'

export function getHistory (req, res, next) {
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

export function setDeliver (req, res, next) {
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

    let game = GameEngine.selectGame(gameId)
    let team = game.selectTeam(teamIndex)

    // check storage
    if (team.selectJob(job).storage.getStorage(product) < amount) {
      // storage is not enough for this deliver
      return
    }

    // check order
    if (team.selectJob(job).order.getOrder(product) < team.selectJob(job).deliver.getDeliver(product) + amount) {
      // deliver amount is more than order's
      return
    }

    // storage moving
    let productItem = constant.ProductItem({
      day: game.getDay(),
      time: game.getTime(),
      product: product,
      amount: amount
    })
    team.selectJob(job).storage.remove(productItem)
    
    let mapping = { 'WHOLESALER': 'RETAILER', 'FACTORY': 'WHOLESALER' }
    team.selectJob(mapping[job]).storage.add(productItem)

    // add to deliver history
    team.selectJob(job).deliver.add(productItem)

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
  'get_history': getHistory,
  'get_received': getReceived,
  'set_deliver': setDeliver
}
