import { contextBridge, ipcRenderer } from 'electron';

const versions = {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
};
contextBridge.exposeInMainWorld('versions', versions);

const communication = {
  sendMessage: (message: string) => ipcRenderer.invoke('sendMessage', message),
  getAppVersion: () => ipcRenderer.invoke('appVersion'),
};
contextBridge.exposeInMainWorld('communication', communication);

export {
  versions,
  communication,
};
