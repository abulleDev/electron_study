const { app, BrowserWindow, ipcMain, autoUpdater } = require('electron');
const path = require('path');

if (require('electron-squirrel-startup')) app.quit();

ipcMain.handle('sendMessage', (event, message) => {
  return `The message you sent is "${message}".`;
});

ipcMain.handle('appVersion', (event) => {
  return app.getVersion();
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

autoUpdater.setFeedURL(
  `https://update.electronjs.org/abulleDev/electron_study/${process.platform}-${
    process.arch
  }/${app.getVersion()}`
);
autoUpdater.checkForUpdates();

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall();
});
