import response from '../response'
import GameEngine from '../../../src/gameengine'
import constant from '../../../src/lib/constant'
import validation from './validation'

export function getStorage (req, res, next) {
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
      list: team.selectJob(job).storage.getStorageList()
    }))
  })
}

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
      list: team.selectJob(job).storage.getHistory()
    }))
  })
}

export function setStorage (req, res, next) {
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

    let productItem = constant.ProductItem({
      day: game.getDay(),
      time: game.getTime(),
      product: product,
      amount: amount
    })
    team.selectJob(job).storage.add(productItem)
    
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
  'get_storage': getStorage,
  'get_history': getHistory,
  'set_storage': setStorage
}
