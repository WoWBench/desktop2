const fs = require('fs')

class TocParser {
  constructor (addon) {
    this.addon = addon
    this.toc = {}
    this.tocData = ''
  }

  parse () {
    let addonFolder = this.addon.getAddonFolder()
    let tocPath = `${addonFolder}/${this.addon.slug()}.toc`

    try {
      this.tocData = fs.readFileSync(tocPath, 'utf8')
    } catch {}

    this.toc.title = this.getTocValue('Title')
    this.toc.version = this.getTocValue('Version')
    this.toc.author = this.getTocValue('Author')

    this.addon.setToc(this.toc)
  }

  getTocValue (field, defaultvalue = '') {
    let fieldMatcher = `## ${field}: (.+)`
    let fieldReplace = `## ${field}: `
    let regex = new RegExp(fieldMatcher, 'gm')

    return this.tocData.match(regex)[0].replace(fieldReplace, '') || defaultvalue
  }
}

module.exports = {
  TocParser
}
