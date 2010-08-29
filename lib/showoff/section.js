var fs    = require("fs")
  , path  = require("path")
  , Slide = require("./slide").Slide

function Section(baseDir) {
  this.baseDir = baseDir
}
exports.Section = Section

Section.prototype.sortedSlideFiles = function() {
  var results = [ ]
    , files   = fs.readdirSync(this.baseDir)

  files.forEach(function(file) {
    if(file.match(/\.md$/))
      results.push(file)
  })
  return results.sort()
}

Section.prototype.parseSync = function() {
  var slides = [ ]
    , baseDir = this.baseDir

  this.sortedSlideFiles().forEach(function(suffix) {
    var slide = new Slide(path.join(baseDir, suffix))
    slides.push(slide.render())
  })
  return slides.join("\n")
}
