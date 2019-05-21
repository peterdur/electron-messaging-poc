const log = s => {
  const p = document.createElement("p");
  p.innerText = s;
  document.body.appendChild(p);
};

const pocSend = (messageType, payload) => {
  window.postMessage({ messageType, payload }, "*");
};

const pocListeners = [];
const pocAddListener = (messageType, callback) => {
  pocListeners.push({messageType, callback});
};

window.addEventListener("message", event => {
  if (event.source !== window) {
    return;
  }

  const messageType = event.data.messageType;
  const payload = event.data.payload;

  pocListeners.forEach(element => {
    if (element.messageType === messageType) {
      element.callback(payload);
    }
  });
});

module.exports = { log, pocSend, pocAddListener };
