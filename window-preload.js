const { ipcRenderer } = require('electron');
const { log } = require('./poc');

window.pocGetFromPreload = () => 'got this string from preload!';

window.pocGetCounter = () => {
    ipcRenderer.send('poc/get-counter');
}

window.pocIncrement = () => {
    ipcRenderer.send('poc/increment');
}

window.pocNewWindow = () => {
    ipcRenderer.send('poc/new-window');
}

window.pocOnUpdateCounter = (callback) => {
    ipcRenderer.on('poc/update-counter', callback);
}