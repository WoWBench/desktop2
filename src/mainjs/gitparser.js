// const fs = require('fs')

class GitParser {
  constructor (addon) {
    this.addon = addon
    this.git = false
  }

  parse () {
    let addonFolder = this.addon.getAddonFolder()
  }
}

module.exports = {
  GitParser
}
