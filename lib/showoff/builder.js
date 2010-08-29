var fs   = require("fs")
  , path = require("path")
  , Showdown = require("showdown").Showdown

function Builder(section) {
  var data = section.split(/\n/)

  this.styles  = data.shift().trim()
  this.content = data.join("\n")
}

Builder.prototype.toHTML = function(name, index) {
  return this.outterDiv(name + "/" + index)
}

Builder.prototype.outterDiv = function(refName) {
  var slideHTML   = this.generatedContent()
    , outterHTML  = "<div class=\"slide\" data-transition=\"" + this.transition() + "\">"
    , wrapperHTML = "<div class=\"" + this.classes() + "\" ref=\"" + refName + "\">"

  return outterHTML + wrapperHTML + slideHTML + "</div>\n</div>"
}

Builder.prototype.generatedContent = function() {
  var converter = new Showdown.converter()

  return converter.makeHtml(this.content)
}

Builder.prototype.classes = function() {
  return [ "content" ].join(" ") + " " + this.styles
}

Builder.prototype.transition = function() {
  if(this.styles.match(/transition=(\S+)/) !== null) {
    return(this.styles.match(/transition=(\S+)/)[0])
  } else {
    return "none"
  }
}

exports.Builder = Builder
