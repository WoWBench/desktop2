class Addon {
  constructor (folder, config) {
    this.folder = folder
    this.base_folder = config.addonsFolder
    this.config = config
    this.toc = {}
  }

  getAddonFolder () {
    return `${this.base_folder}/${this.folder}`
  }

  slug () {
    return this.folder.toLowerCase()
  }

  setToc (toc) {
    this.toc = toc
  }
}

module.exports = {
  Addon
}
