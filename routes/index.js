//import game from '../src/game'
import debug from '../src/lib/debug'
import apiRoutes from '../src/api'

export default function initialize (app) {
  app.post('/api/:module/:method', apiRoutes)

  app.get('/echo', function (req, res, next) {
    res.render('echo')
  })

  app.get('/', function (req, res, next) {
    res.render('index')
  })

  app.post('/admin', function (req, res, next) {
    res.render('admin')
  })
  
  app.get('*', function (req, res, next) {
    res.status(404)
    res.render('error/404')
  })
}
