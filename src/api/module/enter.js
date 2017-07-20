import response from '../response'
import validation from '../validation'
import GameEngine from '../../gameengine'
import constant from '../../lib/constant'
import debug from '../../lib/debug'

export function regist (req, res, next) {
  req.check({
    nickname: validation.nickname,
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
    let nickname = req.body.nickname

    let game = GameEngine.selectGame(gameId)
    let team = game.selectTeam(teamIndex)

    GameEngine.isRegisted(nickname)
      .then(function (result) {
        if (!result) {
          return GameEngine.regist(nickname, gameId, teamIndex, job)
        } else {
          res.json(response.ResponseErrorMsg.NicknameAlreadyExist(nickname))
          return
        }
      })
      .then(function (result) {
        res.json(response.ResponseSuccessJSON({
          gameId: gameId,
          teamIndex: teamIndex,
          job: job,
          userId: result.userId,
          nickname: result.nickname
        }))
      })
      .catch((err) => { debug.error(err) })
  })
}

export function enroll (req, res, next) {
  req.check({
    nickname: validation.nickname,
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
    let nickname = req.body.nickname

    let game = GameEngine.selectGame(gameId)
    let team = game.selectTeam(teamIndex)

    GameEngine.isRegisted(nickname)
      .then(function (result) {
        if (result) {
          res.json(response.ResponseSuccessJSON({
            gameId: gameId,
            teamIndex: teamIndex,
            job: job,
            nickname: nickname
          }))
        } else {
          res.json(response.NicknameAlreadyExist(nickname))
        }
      })
      .catch((err) => { debug.error(err) })
  })
}

export function newGame (req, res, next) {
  let config = req.body.gameConfig || {}
  GameEngine.newGame(config)
    .then((result) => {
      res.json(response.ResponseSuccessJSON({
        gameId: result.gameId,
        gameConfig: result.gameConfig
      }))
    })
    .catch((err) => { debug.error(err) })
}

export function getGameList (req, res, next) {
  res.json(response.ResponseJSON({
    gameList: GameEngine.getGameList()
  }))
}

export function getOnlineStatus (req, res, next) {
  req.check({
    gameId: validation.gameId
  })

  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      res.status(400).json(response.ResponseErrorMsg.ApiArgumentValidationError(result.array()))
      return
    }

    let gameId = req.body.gameId

    res.json(response.ResponseSuccessJSON({
      gameId: gameId,
      onlineStatus: GameEngine.getOnlineStatus(gameId)
    }))
  })
}

export default {
  'regist': regist,
  'enroll': enroll,
  'new_game': newGame,
  'get_game_list': getGameList,
  'get_online_status': getOnlineStatus
}
