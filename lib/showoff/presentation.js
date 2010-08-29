var path    = require("path")
  , Section = require("./section").Section
  , fs      = require("fs")

function Presentation(rootDir) {
  this.rootDir = fs.realpathSync(rootDir)
  this.config  = this.parseConfig()
}

exports.Presentation = Presentation

Presentation.prototype.name = function() {
  return this.config.name || this.rootDir.split("/").last
}

Presentation.prototype.description = function() {
  return this.config.description || ""
}

Presentation.prototype.sections = function() {
  return this.config.sections || [ ]
}

Presentation.prototype.slidesDir = function() {
  return path.join(this.rootDir, "example")
}

Presentation.prototype.parseConfig = function() {
  var file = path.join(this.slidesDir(), 'showoff.json')
  return JSON.parse(fs.readFileSync(file).toString())
}

Presentation.prototype.generate = function(callback) {
  var slidesDir = this.slidesDir()

  this.sections().forEach(function(val) {
    var slide = new Section(path.join(slidesDir, val.section))
    slide.parseSync()
  })
  callback("")
}

Presentation.prototype.js_files = function() {
  return [ ]
}

Presentation.prototype.css_files = function() {
  return [ ]
}
