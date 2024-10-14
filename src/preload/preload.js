const { contextBridge, ipcRenderer } = require('electron/renderer');

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
});

contextBridge.exposeInMainWorld('communication', {
  sendMessage: (message) => ipcRenderer.invoke('sendMessage', message),
  getAppVersion: () => ipcRenderer.invoke('appVersion'),
});
