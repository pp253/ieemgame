const express = require('express')
const session = require('express-session')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const compression = require('compression')
const https = require('https')
const fs = require('fs')
const debug = require('./src/lib/debug')
const routes = require('./routes')

debug.log('Server initializing ...')

let app = express()

// Security
app.use(helmet())

// Compression
app.use(compression())

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

// Setting
app.set('port', process.env.PORT || 80)
app.set('title', '2017 工工營 產銷遊戲')

// Static
app.use('/', express.static('public'))
app.use('/', express.static('test')) // this should be removed in PRODUCTION ENV

// Route
app.use(function (req, res, next) {
  debug.log(req.connection.remoteAddress, req.method, req.path)
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
/*
const options = {
  key: fs.readFileSync('./server.key'),
  cert: fs.readFileSync('./server.crt')
}

https.createServer(options, app).listen(app.get('port'), function () {
  debug.log('Stating listening ...')
})
*/

app.listen(app.get('port'), function () {
  debug.log('Start to listen on PORT %d ...', app.get('port'))
})

debug.log('Server initialized done')
