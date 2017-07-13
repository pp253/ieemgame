import response from '../response'
import validation from '../validation'
import GameEngine from '../../gameengine'
import constant from '../../lib/constant'
import debug from '../../lib/debug'

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

    let game = GameEngine.selectGame(gameId)
    let team = game.selectTeam(teamIndex)

    res.json(response.ResponseSuccessJSON({
      gameId: gameId,
      teamIndex: teamIndex,
      job: job,
      day: game.getDay(),
      time: game.getTime(),
      list: team.selectJob(job).deliver.getHistory()
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
    let amount = parseInt(req.body.amount)

    let game = GameEngine.selectGame(gameId)
    let team = game.selectTeam(teamIndex)

    // check storage
    if (team.selectJob(job).storage.getStorage(product) < amount) {
      // storage is not enough for this deliver
      res.json(response.ResponseErrorMsg.StorageNotEnough(gameId, teamIndex, job))
      return
    }

    // check order
    if (job !== 'RETAILER' && team.selectJob(job).order.getOrder(product) < team.selectJob(job).deliver.getDeliver(product) + amount) {
      // deliver amount is more than order's
      res.json(response.ResponseErrorMsg.OrderNotEnough(gameId, teamIndex, job))
      return
    } else if (job === 'RETAILER' && game.getMarket().orderAmount - game.getMarket().storageAmount < amount) {
      // deliver amount is more than market's
      res.json(response.ResponseErrorMsg.MarketNotEnough(gameId))
      return
    }

    if (job !== 'RETAILER') {
      // check account for costing
      let transportCost = game.getConfig().cost.transport.cost
      let transportPatchSize = game.getConfig().cost.transport.patchSize
      let cost = Math.ceil(amount / transportPatchSize) * transportCost
      if (team.getAccount().getBalance() < cost) {
        // team account is not enough for delivering costing
        res.json(response.ResponseErrorMsg.AccountNotEnough(gameId, teamIndex))
        return
      }

      // take from account
      team.getAccount().take(constant.AccountItem({
        day: game.getDay(),
        time: game.getTime(),
        balance: cost
      }))
    } else {
      // add to account
      team.getAccount().give(constant.AccountItem({
        day: game.getDay(),
        time: game.getTime(),
        balance: amount * game.getMarket().price
      }))
    }

    // storage moving
    let productItem = constant.ProductItem({
      day: game.getDay(),
      time: game.getTime(),
      product: product,
      amount: amount
    })
    team.selectJob(job).storage.remove(productItem)
    
    if (job === 'RETAILER') {
      game.getMarket().storageAmount += amount
    } else {
      let mapping = { 'WHOLESALER': 'RETAILER', 'FACTORY': 'WHOLESALER' }
      team.selectJob(mapping[job]).storage.add(productItem)
    }

    // add to deliver
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
  'set_deliver': setDeliver
}
