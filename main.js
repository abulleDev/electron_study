const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

ipcMain.handle('sendMessage', (event, message) => {
  return `The message you sent is "${message}".`;
});

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadFile('index.html');
};

app.whenReady().then(() => {
  createWindow();
});
