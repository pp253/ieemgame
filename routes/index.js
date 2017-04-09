const game = require('../src/game')
const debug = require('../src/lib/debug')

const ResponceJSON = (obj) => {
  return Object.assign({
    error: 0
  }, obj)
}

function gameApiResponser (req, res, next) {
  const methodList = {
    'get_updates': function (req, res, next) {
      if (!game.getNowGame()) {
        throw new debug.Exception({
          id: 2,
          msg: 'No game is in progressing.'
        })
      }
      res.json(ResponceJSON({
        team: 0,
        jobs: '',
        news: 'some article ...',
        order: [],
        deliver: [],
        money: 0,
        time: req.session.game.state.time,
        day: req.session.game.state.day
      }))
    },
    'order': function (req, res, next) {
      if (!game.getNowGame()) {
        throw new debug.Exception({
          id: 2,
          msg: 'No game is in progressing.'
        })
      }
      const orderRequest = {
        buyer: req.body.buyer,
        seller: req.body.seller,
        product: req.body.product,
        quantity: req.body.quantity
      }
      game.getNowGame()
        .order(orderRequest)
        .then((doc) => {
          res.json(ResponceJSON(doc))
        })
        .catch((err) => {
          throw err
        })
    },
    'get_orders': function (req, res, next) {
      if (!game.getNowGame()) {
        throw new debug.Exception({
          id: 2,
          msg: 'No game is in progressing.'
        })
      }

      game.getNowGame().getOrder(req.body.aftertime)
        .then((list) => {
          res.json(ResponceJSON(list))
        })
        .catch((err) => {
          throw err
        })
    },
    /**
     * POST `/get_self_orders`
     * @param {Date} aftertime, show all of orders after `aftertime` default: 0
     */
    'get_self_received_orders': function (req, res, next) {
      if (!game.getNowGame()) {
        throw new debug.Exception({
          id: 2,
          msg: 'No game is in progressing.'
        })
      } else if (!req.session.position) {
        throw new debug.Exception({
          id: 3,
          msg: '`req.session.position` is not exist.'
        })
      }

      game.getNowGame().getOrderByBuyer(req.session.position, req.body.aftertime)
        .then((list) => {
          res.json(ResponceJSON(list))
        })
        .catch((err) => {
          throw err
        })
    },
    'get_self_history_order': function (req, res, next) {
      if (!game.getNowGame()) {
        throw new debug.Exception({
          id: 2,
          msg: 'No game is in progressing.'
        })
      } else if (!req.session.position) {
        throw new debug.Exception({
          id: 3,
          msg: '`req.session.position` is not exist.'
        })
      }

      game.getNowGame().getOrderBySeller(req.session.position, req.body.aftertime)
        .then((list) => {
          res.json(ResponceJSON(list))
        })
        .catch((err) => {
          throw new debug.Exception({
            syserr: err
          })
        })
    },
    'deliver': function (req, res, next) {
      if (!game.getNowGame()) {
        throw new debug.Exception({
          id: 2,
          msg: 'No game is in progressing.'
        })
      }
      const deliverRequest = {
        buyer: req.body.buyer,
        seller: req.body.seller,
        product: req.body.product,
        quantity: req.body.quantity
      }
      game.getNowGame()
      .deliver(deliverRequest)
      .then((doc) => {
        res.json(ResponceJSON({
          result: doc
        }))
      })
      .catch((err) => {
        res.json(err) // this should be a temperately measures
        // throw err // why this can't be pass to try...catch...?
      })
    },
    'new_game': function (req, res, next) {
      game.newGame()
        .then((newGame) => {
          res.json(ResponceJSON({
            game_id: newGame.gameId
          }))
        })
        .catch((err) => {
          throw err
        })
    },
    'add_user': function (req, res, next) {
      if (!game.getNowGame()) { //  || !req.body || !req.body.team || !req.body.jobs
        throw new debug.Exception({
          id: 1,
          msg: 'No game is in progressing.'
        })
      }

      game.getNowGame().addUser((req.body.gameId || -1), { team: req.body.team, job: req.body.job })
        .then((enrolledGame) => {
          req.session.position = {
            team: req.body.team,
            job: req.body.job
          }

          res.json(ResponceJSON({
            game_id: enrolledGame.gameId,
            team: req.body.team,
            job: req.body.job
          }))
        })
    },
    'next_stage': function (req, res, next) {
      if (!game.getNowGame()) {
        throw new debug.Exception({
          id: 1,
          msg: 'No game is in progressing.'
        })
      }

      res.json(ResponceJSON({
        stage: game.getNowGame().nextStage()
      }))
    },
    'get_status': function (req, res, next) {
      if (!game.getNowGame()) {
        throw new debug.Exception({
          id: 1,
          msg: 'No game is in progressing.'
        })
      }
      res.json(ResponceJSON({
        stage: game.getNowGame().stage,
        team: game.getNowGame().state.team,
        day: game.getNowGame().state.day,
        time: game.getNowGame().state.time,
        users: game.getNowGame().users
      }))
    },
    'get_money': function (req, res, next) {
    },
    'get_self_money': function (req, res, next) {
      if (!game.getNowGame()) {
        throw new debug.Exception({
          id: 1,
          msg: 'No game is in progressing.'
        })
      } else if (!req.session.position) {
        throw new debug.Exception({
          id: 1
        })
      }
      game.getNowGame().getMoneyByTeam(req.session.position.team)
        .then((money) => {
          res.json(ResponceJSON({
            team: req.session.position.team,
            money: money
          }))
        })
    }
  }

  try {
    if (methodList[req.params.method]) {
      methodList[req.params.method](req, res, next)
    } else {
      throw new debug.Exception({
        id: 5404,
        msg: 'gameapi `method` not found.'
      })
    }
  } catch (err) {
    res.json(err)
  }
}

function gameHome (req, res, next) {

}

function gameUser (req, res, next) {

}

function gameAdmin (req, res, next) {
  for (let item of game.gmaeList) {
    res.send(item)
  }
}

exports.gameApiResponser = gameApiResponser
exports.gameHome = gameHome
exports.gameUser = gameUser
exports.gameAdmin = gameAdmin
