const path = require('path')
const os = require('os')
const fs = require('fs')

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')

const reactDevToolsHash = 'fmkadmapgofadopljbjfkapdkoienihi'
const reactDevToolsVersion = '4.2.1_0'

// TODO: Replace with a store?
let settings = {
  addonsFolder: '/Users/david.craig/Personal/wow/_classic_/Interface/Addons'
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Attempt to load react dev tools extension
  BrowserWindow.addDevToolsExtension(
    path.join(os.homedir(), `/Library/Application Support/Google/Chrome/Default/Extensions/${reactDevToolsHash}/${reactDevToolsVersion}`)
 )

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

function isGitAddon(addon) {

}

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
function getGitVersion(addon) {
}

// Gets a list of all addon folders
function getAddonFolders() {
  return fs.readdirSync(settings.addonsFolder, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
}

function getAddonFolder(addonName) {
  return `${settings.addonsFolder}/${addonName}`
}

function parseAddons() {
  let folders = getAddonFolders();

  return folders.map(addon => {
    let toc = parseToc(addon)
    return { toc }
  })
}

/**
 * Parse the metadata out of the toc file.
 * @param {string} addon 
 */
function parseToc(addon) {
  let addonFolder = getAddonFolder(addon)
  let slug = addon.toLowerCase()
  let tocData = {}
  let tocPath = `${addonFolder}/${slug}.toc`

  try {
    tocContents = fs.readFileSync(tocPath, 'utf8')
    tocData.title = getTitle(addon, tocContents)
    tocData.version = getVersion(addon, tocContents)
    tocData.author = getAuthor(addon, tocContents)
  } catch {}

  return tocData
}

function getTocValue(field, toc, defaultvalue = '') {
  let fieldMatcher = `## ${field}: (.+)`
  let fieldReplace = `## ${field}: `
  let regex = new RegExp(fieldMatcher, 'gm')

  return toc.match(regex)[0].replace(fieldReplace, '') || defaultvalue
}

getTitle = (addon, toc) => { return getTocValue('Title', toc, addon) }
getVersion = (addon, toc) => { return getTocValue('Version', toc, addon) }
getAuthor = (addon, toc) => { return getTocValue('Author', toc) }

ipcMain.on('get-addons', (event, arg) => {
  // If we have an addons folder scan it for addons
  if (typeof settings.addonsFolder !== 'undefined' && settings.addonsFolder !== '') {
    let addonData = parseAddons()
    // console.log(addonData)
    event.reply('get-addons', addonData)
  }
})
