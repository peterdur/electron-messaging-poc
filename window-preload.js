const { ipcRenderer } = require('electron');
const { log } = require('./poc');

window.pocGetFromPreload = () => 'got this string from preload!';

window.pocOnMessage = (message, callback) => {
    ipcRenderer.on(message, callback);
}