const { ipcRenderer } = require('electron');
const { log } = require('./poc');

window.poc = {
  getFromPreload: () => 'got this string from preload!',

  getCounter: () => {
    ipcRenderer.send('poc/get-counter');
  },

  increment: () => {
    ipcRenderer.send('poc/increment');
  },

  newWindow: () => {
    ipcRenderer.send('poc/new-window');
  },

  onUpdateCounter: callback => {
    ipcRenderer.on('poc/update-counter', callback);
  },

  log: (s) => {
      log(s);
  }
};

window.addEventListener("message", (event) => {
    switch(event.data.type) {
        case 'getCounter':
            ipcRenderer.send('poc/get-counter');
            break;
    }
});
