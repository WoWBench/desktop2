class Addon {
  constructor (folder, config) {
    this.folder = folder
    this.base_folder = config.addonsFolder
    this.config = config
    this.toc = {}
    this.git = false
  }

  getAddonTocPath () {
    return `${this.getAddonFolder()}/${this.slug()}.toc`
  }

  getAddonFolder () {
    return `${this.base_folder}/${this.config.game}/Interface/Addons/${this.folder}`
  }

  slug () {
    return this.folder.toLowerCase()
  }

  setToc (toc) {
    this.toc = toc
  }

  setGit (git) {
    this.git = git
  }
}

module.exports = {
  Addon
}
