var path = require("path")
  , fs   = require("fs")

function Presentation(rootDir) {
  this.rootDir = fs.realpathSync(rootDir)
}

exports.Presentation = Presentation

Presentation.prototype.name = function() {
  return this.rootDir.split("/").last
}

Presentation.prototype.slidesDir = function() {
  return path.join(this.rootDir, "example")
}

Presentation.prototype.js_files = function() {
  return [ ]
}

Presentation.prototype.css_files = function() {
  return [ ]
}
