const { ipcRenderer } = require("electron");
const { log } = require("./poc");

window.poc = {
  getFromPreload: () => "got this string from preload!",

  onUpdateCounter: callback => {
    ipcRenderer.on("poc/update-counter", callback);
  },
};

window.addEventListener("message", event => {
  const messageType = event.data.messageType;
  const payload = event.data.payload;

  switch (messageType) {
    case "getCounter":
      ipcRenderer.send("poc/get-counter");
      break;

    case "increment":
      ipcRenderer.send("poc/increment");
      break;

    case "newWindow":
      ipcRenderer.send("poc/new-window");
      break;

    case "log":
      log(payload);
  }
});
