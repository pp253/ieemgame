
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
