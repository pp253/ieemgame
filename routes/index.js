import process from 'process'
import debug from '../src/lib/debug'
import apiRoutes from '../src/api'

export default function initialize (app) {
  app.post('/api/:module/:method', apiRoutes)

  app.get('/echo', function (req, res, next) {
    res.render('echo')
  })
  
  app.get('*', function (req, res, next) {
    res.status(404)
    res.render('error/404')
  })
}
