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

app.get("/(?:image|file)/*", function(req, res) {
  res.sendfile(path.join(preso.slidesDir(), req.params[0]))
})

app.get('/', function(req, res){
  preso.generate(function(content) {
    res.render('index', {
      locals: {
          port     : req.headers.host.split(':')[1] || 80
        , title    : preso.name()
        , slides   : content
        , hostname : req.headers.host.split(':')[0] || 'localhost'
      }
    })
  })
})

exports.run = function() {
  app.listen(parseInt(process.env.PORT) || 9393)
}

socket.on('connection', function(client) {
  client.on('message', function(json){
    var self = this
    //console.error(client)
    console.error(json)
    try {
      if(json.action == 'authentication') {
        if(client.request.socket.remoteAddress == '127.0.0.1') {
          client.send({presenter: true})
        } else {
          client.send({presenter: false})
        }
      }
      if(json.action == 'next') {
        socket.clients.forEach(function(watcher) {
          if((watcher != null) && (watcher.sessionId != self.sessionId))
            watcher.send({action: 'next', index: json.index})
        })
      }

      if(json.action == 'prev') {
        socket.clients.forEach(function(watcher) {
          if((watcher != null) && (watcher.sessionId != self.sessionId))
            watcher.send({action: 'prev', index: json.index})
        })
      }
    } catch (err) {
      console.error(err.stack);
      return;
    }
  })
  client.on('disconnect', function(json) {
  })
})
