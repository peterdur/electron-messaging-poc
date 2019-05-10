// Modules to control application life and create native browser window
const {app, ipcMain, BrowserWindow} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let renderers = [];
let nextRendererIndex = 0;

function createWindows() {
  createWindow();
  createWindow();
  createWindow();
}

function createWindow () {
  // Create the browser window.
  const renderer = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  const rendererIndex = nextRendererIndex++;
  renderers[rendererIndex] = renderer;

  renderer.loadFile('window.html')
  renderer.webContents.send('set-renderer-index', rendererIndex);
  console.log('send set-renderer-index', rendererIndex);

  // Emitted when the window is closed.
  renderer.on('closed', function () {
    renderers[rendererIndex] = null;
  })
}

ipcMain.on('request-renderer-index', (event, arg) => {
  console.log('received request-renderer-index', arg);
  for (let i = 0; i < nextRendererIndex; i++) {
    if (renderers[i] != null) {
      renderers[i].webContents.send('set-renderer-index', i);
    }
  }
})

ipcMain.on('message-a', (event, arg) => {
  console.log('received message-a', arg);
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindows)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (renderer === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
