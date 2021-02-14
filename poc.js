const log = s => {
  const p = document.createElement("p");
  p.innerText = s;
  document.body.appendChild(p);
};

const pocSend = (messageType, payload) => {
  window.postMessage({ ...payload, messageType }, window.location.origin);
};

const pocSendLog = (message) => {
  pocSend('log', {message});
}

const pocListeners = [];
const pocAddListener = (messageType, callback) => {
  pocListeners.push({messageType, callback});
};

window.addEventListener("message", event => {
  if (event.source !== window) {
    return;
  }

  const payload = event.data;
  const messageType = payload.messageType;

  pocListeners.forEach(element => {
    if (element.messageType === messageType) {
      element.callback(payload);
    }
  });
});

module.exports = { log, pocSend, pocSendLog, pocAddListener };
