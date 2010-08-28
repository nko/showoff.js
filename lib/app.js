var express = require("express")
  , path    = require("path")
  , io      = require("socket.io")
  , showoff = require("./showoff")

var app    = express.createServer()
  , preso  = new showoff.Presentation(path.join(__dirname, ".."))
  , socket = io.listen(app)

app.configure(function(){
  app.set('views', __dirname + '/views')
  app.set('view engine', 'ejs')
  app.use(express.staticProvider({ path: path.join(__dirname, "..", "public") }))
  app.use(express.logger())
  app.use(express.errorHandler({ showStack: true, dumpExceptions: true }))
})

app.get('/', function(req, res){
  res.render('index', {
    locals: {
      port     : req.headers.host.split(':')[1] || 80
    , title    : 'My Site'
    , slides   : [ ]
    , hostname : req.headers.host.split(':')[0] || 'localhost'
    }
  })
})

exports.run = function() {
  app.listen(parseInt(process.env.PORT) || 9393)
}

socket.on('connection', function(client) {
  client.on('message', function(json){
    try {
      var message = JSON.parse(json);
    } catch (err) {
      console.error(err.stack);
      return;
    }
  })
  client.on('disconnect', function(json) {
  })

  function pushTime(wsClient) {
    console.log(new Date())
    wsClient.send(JSON.stringify({time: new Date()}))
    setTimeout(function () {
      pushTime(wsClient)
    }, 10000)
  }

  pushTime(client)
})
