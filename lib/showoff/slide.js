var fs      = require("fs")
  , path    = require("path")
  , Builder = require("./builder").Builder

function Slide(markdownFile) {
  this.file = markdownFile
}

Slide.prototype.parse = function() {
  var results  = [ ]
    , contents = fs.readFileSync(this.file).toString()

  contents.split(/^!SLIDE/mg).forEach(function(slides) {
    results.push(new Builder(slides))
  })
  return results
}

Slide.prototype.render = function() {
  var contents = this.parse()

  console.log(this.file)

  contents.forEach(function(slide) {
    //console.log(slide)
    //console.log("**************************************************")
  })


  //console.log(contents)
}

exports.Slide = Slide
