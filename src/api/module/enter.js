import response from '../response'
import validation from '../validation'
import GameEngine from '../../gameengine'
import constant from '../../lib/constant'
import debug from '../../lib/debug'

export function getRegist (req, res, next) {
  let sess = ress.session
  if (sess.userId) {
    res.json(response.ResponseSuccessJSON({
      userId: sess.userId,
      nickname: sess.nickname,
      code: sess.code,
      enrolled: GameEngine.getEnroll().getUserEnrolledGames(sess.userId)
    }))
  } else {
    res.json(response.ResponseErrorMsg.NotRegisted())
  }
}

export function regist (req, res, next) {
  req.check({
    nickname: validation.nickname,
    code: validation.code
  })

  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      res.status(400).json(response.ResponseErrorMsg.ApiArgumentValidationError(result.array()))
      return
    }

    let nickname = String(req.body.nickname)
    let code = parseInt(req.body.code)

    GameEngine.getRegist().isRegisted(nickname)
      .then(function (result) {
        if (!result) {
          // return a promise
          return GameEngine.getRegist().setUser(constant.PlayerItem({
            nickname: nickname,
            code: code
          }))
        } else {
          // return nothing
          res.json(response.ResponseErrorMsg.NicknameAlreadyExist(nickname))
          return
        }
      })
      .then(function (result) {
        let sess = res.session
        sess.userId = result.userId
        sess.nickname = result.nickname
        sess.code = result.code

        res.json(response.ResponseSuccessJSON({
          userId: result.userId,
          nickname: result.nickname,
          code: result.code
        }))
      })
      .catch((err) => { debug.error(err) })
  })
}

export function setRegistByCode (req, res, next) {
  req.check({
    code: validation.code
  })

  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      res.status(400).json(response.ResponseErrorMsg.ApiArgumentValidationError(result.array()))
      return
    }

    let code = parseInt(req.body.code)

    let user = GameEngine.getRegist().getUserByCode(code)

    if (user) {
      let sess = res.session
      sess.userId = result.userId
      sess.nickname = result.nickname
      sess.code = result.code
      res.json(response.ResponseSuccessJSON({
        userId: result.userId,
        nickname: result.nickname,
        code: result.code
      }))
    } else {
      res.json(response.ResponseErrorMsg.NotRegisted())
    }
  })
}

export function getCode (req, res, next) {
  res.json(response.ResponseSuccessJSON({
    code: GameEngine.getRegist().getCode()
  }))
}

export function enroll (req, res, next) {
  req.check({
    userId: validation.userId,
    gameId: validation.gameId,
    teamIndex: validation.teamIndex,
    job: validation.job
  })

  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      res.status(400).json(response.ResponseErrorMsg.ApiArgumentValidationError(result.array()))
      return
    }

    let userId = req.body.userId
    let gameId = req.body.gameId
    let teamIndex = parseInt(req.body.teamIndex)
    let job = req.body.job

    let game = GameEngine.selectGame(gameId)
    let team = game.selectTeam(teamIndex)

    GameEngine.getEnroll().set(constant.EnrollItem({
      userId: userId,
      gameId: gameId,
      teamIndex: teamIndex,
      job: job
    }))

    res.json(response.ResponseSuccessJSON({
      userId: userId,
      gameId: gameId,
      teamIndex: teamIndex,
      job: job
    }))
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
  'get_regist': getRegist,
  'regist': regist,
  'set_regist_by_code': setRegistByCode,
  'get_code': getCode,
  'enroll': enroll,
  'new_game': newGame,
  'get_game_list': getGameList,
  'get_online_status': getOnlineStatus
}
