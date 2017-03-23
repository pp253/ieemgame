const express = require('express')
const session = require('express-session')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const game = require('./src/game')
const debug = require('./src/lib/debug')
const routes = require('./routes')

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

// Route
app.use(function (req, res, next) {
  debug.log(req.connection.remoteAddress, req.method, req && req.path)
  next()
})

app.post('/gameapi/:method', routes.gameApiResponser)

app.get('/', routes.gameHome)

app.post('/user/:method', routes.gameUser)

app.post('/admin', routes.gameAdmin)

app.get('*', function (req, res, next) {
  res.status(404)
  res.render('error/error404')
})

// Listening
app.listen(app.get('port'), function () {
  debug.log('Stating listening ...')
})

debug.log('Server initialing done')
