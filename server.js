const express = require('express')
const session = require('express-session')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const moment = require('moment')

const game = require('./src/game')
const debug = require('./src/lib/debug')

debug.log('Server initialing ...')

let app = express()

// Body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Templates
app.set('view engine', 'pug')
app.set('views', './views')

// Session
app.use(session({
  secret: 'ieem-game',
  resave: false,
  saveUninitialized: false
}))

// Security
app.use(helmet())

// Setting
app.set('port', process.env.PORT || 80)
app.set('title', '2017 工工營 啤酒遊戲')

// Static
app.use('/', express.static('public'))
app.use('/test/', express.static('test'))

// Route
app.use(function (req, res, next) {
  debug.log(req.connection.remoteAddress, req.method, req && req.path)
  next()
})

app.post('/gameapi/:method', function (req, res, next) {

})

// this should be removed after released.
app.get('/text/:testing', function (req, res, next) {
  switch (req.params.testing) {
    case 'user':
      res.render('test/user')
      break
    case 'init':
      
      break
    default:
      res.end('test')
      break
  }
})

app.get('/', function (req, res, next) {
  res.end('Home')
})

app.post('/user/:method', function (req, res, next) {
  switch (req.params.method) {
    case 'login':
      if (!req.body.username || !req.body.userpasswd) {
        req.send(game.user.loginfailed())
        return
      }
      game.login()
  }
})

app.post('/game/:groupid', function (req, res, next) {
  res.end('Game: ' + req.params.groupid + req.params.job)
})

app.post('/game/:groupid/:job', function (req, res, next) {
  res.end('Game: ' + req.params.groupid + req.params.job)
})

app.post('/admin', function (req, res, next) {
  res.end('Admin')
})

app.get('*', function (req, res, next) {
  res.status(404)
  res.render('error/error404')
})

// Listening
app.listen(app.get('port'), function () {
  debug.log('Stating listening ...')
})

debug.log('Server initialing done')
