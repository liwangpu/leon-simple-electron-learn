const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  on(channel, func) {
    const subscription = (_event, ...args) =>
      func(...args);
    ipcRenderer.on(channel, subscription);

    return () => {
      ipcRenderer.removeListener(channel, subscription);
    };
  },
});


// window.onload = () => {
//     ipcRenderer.on('update-counter', (_event, value) => {
//         // const oldValue = Number(counter.innerText)
//         // const newValue = oldValue + value
//         // counter.innerText = newValue
//         console.log(`value update:`, value);
//     })
// };
