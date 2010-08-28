var path    = require("path")

function Presentation(rootDir) {
  this.rootDir = rootDir
}

exports.Presentation = Presentation

Presentation.prototype.name = function() {
  return this.rootDir.split("/").last
}

Presentation.prototype.slidesDir = function() {
  return path.join(this.rootPath, "example")
}

Presentation.prototype.js_files = function() {
  return [ ]
}

Presentation.prototype.css_files = function() {
  return [ ]
}
