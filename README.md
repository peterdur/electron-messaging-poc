# electron-messaging-poc

A proof-of-concept exploration of messaging between Electron browser windows.

Separate windows send messages to a background window that manages shared state (a counter). 
The background window broadcasts updates of the shared state.

[Electron quick start](https://github.com/electron/electron-quick-start) was used as a starting point.

## To Use

```bash
# Install dependencies
npm install
# Run the app
npm start
```

