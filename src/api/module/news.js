import response from '../response'
import validation from '../validation'
import constant from '../../lib/constant'
import debug from '../../lib/debug'
import GameEngine from '../../gameengine'

export function getNews (req, res, next) {
  req.check({
    gameId: validation.gameId
  })

  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      res.status(400).json(response.ResponseErrorMsg.ApiArgumentValidationError(result))
      return
    }

    let gameId = req.body.gameId
    res.json(response.ResponseSuccessJSON({
      gameId: gameId,
      list: GameEngine.selectGame(gameId).getNews().getAvailableNewsList()
    }))
  })
}

// TODO:
export function setNews (req, res, next) {
  req.check({
    gameId: validation.gameId
  })

  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      res.status(400).json(response.ResponseErrorMsg.ApiArgumentValidationError(result))
      return
    }

    let gameId = req.body.gameId
    res.json(response.ResponseSuccessJSON({
      gameId: gameId,
      list: GameEngine.selectGame(gameId).getNews().getAvailableNewsList()
    }))
  })
}

export function setNewsList (req, res, next) {
  req.check({
    gameId: validation.gameId
    /* newsList: Array */
  })

  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      res.status(400).json(response.ResponseErrorMsg.ApiArgumentValidationError(result))
      return
    }

    let gameId = req.body.gameId
    let newsList = req.body.newsList
    let game = GameEngine.selectGame(gameId)
    let list = game.getNews().setNewsList(newsList)

    res.json(response.ResponseSuccessJSON({
      gameId: gameId,
      list: list
    }))
  })
}

export default {
  'get_news': getNews,
  'set_news': setNews,
  'set_news_list': setNewsList
}
