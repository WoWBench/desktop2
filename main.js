const path = require('path')
const os = require('os')
const fs = require('fs')
const { Addon } = require('./src/mainjs/addon')
const { TocParser } = require('./src/mainjs/tocparser')
const { GitParser } = require('./src/mainjs/gitparser')

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')

const reactDevToolsHash = 'fmkadmapgofadopljbjfkapdkoienihi'
const reactDevToolsVersion = '4.2.1_0'

// TODO: Replace with a store?
let config = {
  addonsFolder: null
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

// Gets a list of all addon folders
function getAddonFolders() {
  let classic = []
  let retail = []

  try {
    classic = fs.readdirSync(`${config.addonsFolder}/_classic_/Interface/Addons`, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
  } catch {
    classic = null
  }

  try {
    retail = fs.readdirSync(`${config.addonsFolder}/_retail_/Interface/Addons`, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
  } catch {
    retail = null
  }

  return {
    classic,
    retail
  }
}

function parseAddons() {
  let folders = getAddonFolders();

  let classic = parseAddonsForFolder(folders.classic, '_classic_')
  let retail = parseAddonsForFolder(folders.retail, '_retail_')

  // Classic
  return {
    classic,
    retail
  }
}

function parseAddonsForFolder (folders, game) {
  try {
    return folders.map((a) => {
      config.game = game
      let addon = new Addon(a, config)
      /* Parsers */
      let tocParser = new TocParser(addon)
      let gitParser = new GitParser(addon)
  
      // parse extra data
      tocParser.parse()
      gitParser.parse()
  
      return addon
    })
  } catch {
    return []
  }
}

ipcMain.on('get-addons', (event, arg) => {
  // If we have an addons folder scan it for addons
  if (typeof config.addonsFolder !== 'undefined' && config.addonsFolder !== '' && config.addonsFolder !== null) {
    let addonData = parseAddons()
    console.log(addonData)
    event.reply('get-addons', addonData)
  }
})

ipcMain.on('set-wow-folder', (event, arg) => {
  console.log(arg)
  config.addonsFolder = arg

  let addonData = parseAddons()
  event.reply('get-addons', addonData)
})
