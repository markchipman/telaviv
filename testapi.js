var express = require('express')

module.exports = function() {
  var app = express()

  //app.use(function(req, res, next){
    //next()
    //res.status(404).send()
    //setTimeout(function(){
    //  next()
    //}, 2000)
  //})

  app.get('/header', function(req, res) {
    //res.cookie('rememberme', '1');
    res.json({header: 'data'})
  })

  app.get('/article/:id', function(req, res) {
    //res.cookie('someother', '2');
    //res.set('Cache-Control', 'max-age=500')
    //res.set('Cache-Control', 'max-age=30')
    if(req.params.id === 'loginfail'){
      res.status(401)
    }
    res.json({acticle: 'Bla', id: req.params.id})
  })

  app.get('/footer', function(req, res) {
    //res.set('Cache-Control', 'max-age=200')
    res.json({footer: 'data'})
  })

  return app;
}
