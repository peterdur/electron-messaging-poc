const {app, ipcMain, BrowserWindow} = require('electron')

let background;
let windows = [];
let nextWindowIndex = 0;
let windowCount = 0;

const createBackground = () => {
  background = new BrowserWindow({
    width: 400,
    height: 300,
    webPreferences: {
      nodeIntegration: true
    }
  });

  background.loadFile('background.html');
}

const createWindow = () => {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  const windowIndex = nextWindowIndex++;
  windowCount++;
  windows[windowIndex] = window;

  window.loadFile('window.html');

  window.on('closed', () => {
    windows[windowIndex] = null;
    windowCount--;
  });
};

app.on('ready', () => {
  createBackground();
  createWindow();
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {
  if (windowCount === 0) {
    createWindow()
  }
});

ipcMain.on('request-renderer-index', (event, arg) => {
  console.log('received request-renderer-index', arg);
  for (let i = 0; i < nextWindowIndex; i++) {
    if (windows[i] != null) {
      windows[i].webContents.send('set-renderer-index', i);
    }
  }
});

ipcMain.on('message-a', (event, arg) => {
  console.log('received message-a', arg);
});

