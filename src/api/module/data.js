import response from '../response'
import validation from '../validation'
import GameEngine from '../../gameengine'
import constant from '../../lib/constant'
import debug from '../../lib/debug'

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

    if (teamIndex !== constant.TEAMS.STAFF) {
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
              break

            case constant.JOBS.RETAILER:
              msg.balance = team.getAccount().getBalance()
              msg.storage = team.selectJob(job).storage.getStorageList()
              msg.deliverHistory = team.selectJob(job).deliver.getHistory()
              msg.receivedOrder = team.selectJob(job).order.getHistory()
              msg.orderHistory = team.selectJob(constant.JOBS.WHOLESALER).order.getHistory()
              msg.news = game.getNews().getAvailableNewsList()
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

export default {
  'get_storage_history_by_team': getStorageHistoryByTeam,
  'get_update': getUpdate
}
