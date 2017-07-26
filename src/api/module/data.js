import _ from 'lodash'
import response from '../response'
import validation from '../validation'
import GameEngine from '../../gameengine'
import constant from '../../lib/constant'
import debug from '../../lib/debug'

export function getBalanceByGame (req, res, next) {
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

    let balanceList = []
    for (let team of game.getTeamList()) {
      balanceList.push(team.getAccount().getBalance())
    }

    res.json(response.ResponseSuccessJSON({
      gameId: gameId,
      day: game.getDay(),
      time: game.getTime(),
      list: balanceList
    }))
  })
}

export function getStorageHistoryByTeam (req, res, next) {
  req.check({
    gameId: validation.gameId,
    teamIndex: validation.teamIndex
  })

  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      res.status(400).json(response.ResponseErrorMsg.ApiArgumentValidationError(result.array()))
      return
    }

    let gameId = req.body.gameId
    let teamIndex = parseInt(req.body.teamIndex)

    let game = GameEngine.selectGame(gameId)
    let team = game.selectTeam(teamIndex)

    res.json(response.ResponseSuccessJSON({
      gameId: gameId,
      teamIndex: teamIndex,
      job: job,
      day: game.getDay(),
      time: game.getTime(),
      [constant.JOBS.FACTORY]: team.selectJob(constant.JOBS.FACTORY).storage.getHistory(),
      [constant.JOBS.WHOLESALER]: team.selectJob(constant.JOBS.WHOLESALER).storage.getHistory(),
      [constant.JOBS.RETAILER]: team.selectJob(constant.JOBS.RETAILER).storage.getHistory()
    }))
  })
}

export function getUpdate (req, res, next) {
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

    let msg = {
      gameId: gameId,
      teamIndex: teamIndex,
      job: job,
      day: game.getDay(),
      time: game.getTime(),
      dayStartTime: game.getDayStartTime(),
      isWorking: game.isWorking(),
      stage: game.getGameStage()
    }

    let mapping = { 'RETAILER': 'WHOLESALER', 'WHOLESALER': 'FACTORY' }

    if (teamIndex !== 0) {
      let list = []
      switch (game.getGameStage()) {
        case constant.GAME_STAGE.START:
        case constant.GAME_STAGE.FINAL:
          switch (job) {
            case constant.JOBS.FACTORY:
              msg.balance = team.getAccount().getBalance()
              msg.storage = team.selectJob(job).storage.getStorageList()
              msg.deliverHistory = team.selectJob(job).deliver.getHistory()
              msg.receivedOrder = team.selectJob(job).order.getHistory()
              break

            case constant.JOBS.WHOLESALER:
              msg.balance = team.getAccount().getBalance()
              msg.storage = team.selectJob(job).storage.getStorageList()
              msg.deliverHistory = team.selectJob(job).deliver.getHistory()
              msg.receivedOrder = team.selectJob(job).order.getHistory()
              msg.orderHistory = team.selectJob(constant.JOBS.FACTORY).order.getHistory()
              list = team.selectJob(constant.JOBS.FACTORY).deliver.getHistory()
              msg.deliveredNumber = list.length > 0 ? list[list.length - 1].amount : 0
              break

            case constant.JOBS.RETAILER:
              msg.balance = team.getAccount().getBalance()
              msg.storage = team.selectJob(job).storage.getStorageList()
              msg.deliverHistory = team.selectJob(job).deliver.getHistory()
              msg.receivedOrder = team.selectJob(job).order.getHistory()
              msg.orderHistory = team.selectJob(constant.JOBS.WHOLESALER).order.getHistory()
              msg.news = game.getNews().getAvailableNewsList()
              list = team.selectJob(constant.JOBS.WHOLESALER).deliver.getHistory()
              msg.deliveredNumber = list.length > 0 ? list[list.length - 1].amount : 0
              break
          }
          break
          
        case constant.GAME_STAGE.UNKNOWN:
        case constant.GAME_STAGE.PREPARE:
        case constant.GAME_STAGE.READY:
        case constant.GAME_STAGE.END:
          break
      }
    } else {
      switch (game.getGameStage()) {
        case constant.GAME_STAGE.START:
        case constant.GAME_STAGE.FINAL:
          switch (job) {
            case constant.STAFF_JOBS.CONSOLER:
              msg.market = game.getMarket()
              break
          }
          break
          
        case constant.GAME_STAGE.UNKNOWN:
        case constant.GAME_STAGE.PREPARE:
        case constant.GAME_STAGE.READY:
        case constant.GAME_STAGE.END:
          break
      }
    }

    res.json(response.ResponseSuccessJSON(msg))
  })
}

export function getMarketInfo (req, res, next) {
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
      time: game.getTime(),
      orderAmount: game.getMarket().orderAmount,
      storageAmount: game.getMarket().storageAmount,
      price: game.getMarket().price
    }))
  })
}

export function getData (req, res, next) {
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

    let teamDataList = []
    for (let team of game.getTeamList()) {
      let data = {}
      data.account = team.getAccount().getHistory()
      data.cost = {
        storage: 0
      }
      let storageCost = game.getConfig().cost.storage
      for (let day = 1; day <= game.getConfig().days; day++) {
        for (let job of _.values(constant.JOBS)) {
          if (job === 'UNKNOWN') {
            continue
          }
          for (let productItem of team.selectJob(job).storage.getStorageListAtTime(day + 1, 0)) {
            data.cost.storage += Math.ceil(productItem.amount / storageCost.patchSize) * storageCost[job][productItem.product]
          }
        }
      }

      data[constant.JOBS.FACTORY] = {
        storage: team.selectJob(constant.JOBS.FACTORY).storage.getHistory(),
        order: team.selectJob(constant.JOBS.FACTORY).order.getHistory(),
        deliver: team.selectJob(constant.JOBS.FACTORY).deliver.getHistory()
      }
      data[constant.JOBS.WHOLESALER] = {
        storage: team.selectJob(constant.JOBS.WHOLESALER).storage.getHistory(),
        order: team.selectJob(constant.JOBS.WHOLESALER).order.getHistory(),
        deliver: team.selectJob(constant.JOBS.WHOLESALER).deliver.getHistory()
      }
      data[constant.JOBS.RETAILER] = {
        storage: team.selectJob(constant.JOBS.RETAILER).storage.getHistory(),
        deliver: team.selectJob(constant.JOBS.RETAILER).deliver.getHistory()
      }
      teamDataList.push(data)
    }

    res.json(response.ResponseSuccessJSON({
      gameId: gameId,
      news: game.getNews().getNewsList(),
      gameConfig: game.getConfig(),
      teamDataList: teamDataList,
      stage: game.getGameStage()
    }))
  })
}

export default {
  'get_balance_by_game': getBalanceByGame,
  'get_storage_history_by_team': getStorageHistoryByTeam,
  'get_update': getUpdate,
  'get_market_info': getMarketInfo,
  'get_data': getData
}
