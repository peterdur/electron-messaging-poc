// Modules to control application life and create native browser window
const {app, ipcMain, BrowserWindow} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let windows = [];
let nextWindowIndex = 0;

function onAppReady() {
  createWindow();
  createWindow();
  createWindow();
}

function createWindow() {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  const windowIndex = nextWindowIndex++;
  windows[windowIndex] = window;

  window.loadFile('window.html')

  window.on('closed', function () {
    windows[windowIndex] = null;
  })
}

ipcMain.on('request-renderer-index', (event, arg) => {
  console.log('received request-renderer-index', arg);
  for (let i = 0; i < nextWindowIndex; i++) {
    if (windows[i] != null) {
      windows[i].webContents.send('set-renderer-index', i);
    }
  }
})

ipcMain.on('message-a', (event, arg) => {
  console.log('received message-a', arg);
})

app.on('ready', onAppReady)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (renderer === null) createWindow()
})
