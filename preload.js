const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  // 这里的命名必须和 App.jsx 里的 window.api.xxx 一一对应
  getBatteries: () => ipcRenderer.invoke('db:getBatteries'),
  getTodayIncome: () => ipcRenderer.invoke('db:getTodayIncome'),
  addIncome: (record) => ipcRenderer.invoke('db:addIncome', record),
  updateBattery: (data) => ipcRenderer.invoke('db:updateBattery', data)
});