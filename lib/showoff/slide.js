var path = require("path")
  , fs   = require("fs")

function Slide(markdownFile) {
  this.file = markdownFile
}

Slide.prototype.render = function() {
  console.log(this.file)
  var contents = fs.readFileSync(this.file).toString()

  console.log(contents)
}

exports.Slide = Slide
