const { ipcRenderer } = require("electron");
const { log, pocSend, pocAddListener } = require("./poc");

pocAddListener("getCounter", payload => {
  ipcRenderer.send("poc/get-counter");
});

pocAddListener("increment", payload => {
  ipcRenderer.send("poc/increment");
});

pocAddListener("newWindow", payload => {
  ipcRenderer.send("poc/new-window");
});

pocAddListener("log", payload => {
  log(payload.message);
});

ipcRenderer.on("poc/update-counter", (event, arg) => {
  pocSend("updateCounter", arg);
});
