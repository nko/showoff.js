var path = require("path")
  , fs   = require("fs")

function Builder(section) {
  var data = section.split(/\n/)

  this.styles  = data.shift().trim()
  this.content = data.join("\n")
}

Builder.prototype.toHTML = function() {
}

Builder.prototype.transition = function() {
  if(this.styles.match(/^transition=(.+)/)) {
    return($1)
  } else {
    "none"
  }
}

Builder.prototype.contentClasses = function() {
  [ "content" ]
}

exports.Builder = Builder
