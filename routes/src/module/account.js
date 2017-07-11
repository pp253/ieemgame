import response from '../response'
import GameEngine from '../../../src/gameengine'
import constant from '../../../src/lib/constant'
import debug from '../../../src/lib/debug'
import validation from './validation'

export function getBalance (req, res, next) {
  req.check({
    gameId: validation.gameId,
    teamIndex: validation.teamIndex
  })

  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      res.status(400).json(response.ResponseErrorMsg.ApiArgumentValidationError(result))
      return
    }

    let gameId = req.body.gameId
    let teamIndex = req.body.teamIndex
    res.json(response.ResponseSuccessJSON({
      gameId: gameId,
      teamIndex: teamIndex,
      balance: GameEngine.selectGame(gameId).selectTeam(teamIndex).getAccount().getBalance()
    }))
  })
}

export default {
  'get_balance': getBalance
}
