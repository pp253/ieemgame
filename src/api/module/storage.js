import response from '../response'
import validation from '../validation'
import GameEngine from '../../gameengine'
import constant from '../../lib/constant'
import debug from '../../lib/debug'

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
    let teamIndex = parseInt(req.body.teamIndex)
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
    let teamIndex = parseInt(req.body.teamIndex)
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
    let teamIndex = parseInt(req.body.teamIndex)
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
    
    if (job === constant.JOBS.FACTORY && product === constant.PRODUCTS.CAR) {
      let map = {
        'BODY': 1,
        'ENGINE': 1,
        'WHEEL': 4
      }
      for (let p in map) {
        let last = team.selectJob(job).storage.getStorage(p)
        let need = map[p] * amount
        if (last > 0) {
          team.selectJob(job).storage.remove(constant.ProductItem({
            day: game.getDay(),
            time: game.getTime(),
            product: p,
            amount: need >= last ? last : need
          }))
        }
      }
    }

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
