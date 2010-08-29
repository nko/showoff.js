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

Slide.prototype.slug = function() {
  console.log(this.file)
  var matches = this.file.match(/^.*?\/([^\/]+)\/([^\/]+).md$/)
  console.log(matches)
  if(matches == null) {
    return "foo/bar"
  } else {
    return [ matches[1], matches[2] ].join("/")
  }
}

Slide.prototype.render = function() {
  var slug     = this.slug()
    , results  = [ ]
    , contents = this.parse()


  contents.forEach(function(builder, index) {
    results.push(builder.toHTML(slug, index + 1))
    //console.log("**************************************************")
  })
  return(results.join("\n"))
}

exports.Slide = Slide
