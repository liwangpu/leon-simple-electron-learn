const { app, BrowserWindow, ipcMain, Menu, dialog, remote } = require('electron');
const { autoUpdater } = require('electron-updater');
const path = require('node:path');
const log = require('electron-log');

log.transports.file.level = 'info';
log.transports.file.resolvePathFn = () => path.join(__dirname, '/log.log');

autoUpdater.logger = log

// const isDevelopment = process.env.NODE_ENV === 'development';
// const isDevelopment = true;

// autoUpdater.updateConfigPath = path.join(__dirname, '../dev-app-update.yml')

let mainWin;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
  })
  const menu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
        {
          click: () => win.webContents.send('update-counter', 1),
          label: 'Increment'
        },
        {
          click: () => win.webContents.send('update-counter', -1),
          label: 'Decrement'
        }
      ]
    }
  ])
  // Menu.setApplicationMenu(menu)

  win.loadFile(path.join(__dirname, 'index.html'));
  win.webContents.openDevTools();
  return win;
}

const sendMessage = (message) => {
  mainWin.webContents.send('receiveMessage', message);
  console.log(`message:`, message);
};

const checkForUpdates = () => {
  // 防止报错no such file or directory dev-app-update.yml
  // if (isDevelopment) {
  //   autoUpdater.updateConfigPath = path.join(__dirname, '../dev-app-update.yml')
  // }

  //设置自动下载
  autoUpdater.autoDownload = false

  autoUpdater.setFeedURL('https://github.com/liwangpu/leon-simple-electron-learn');

  autoUpdater.on('error', res => {
    log.info("获取版本出现错误:" + res)
    sendMessage("获取版本出现错误:" + res);
  })

  autoUpdater.on('checking-for-update', res => {
    log.info("获取版本信息:" + res)
    sendMessage("获取版本信息:" + res);
  })

  autoUpdater.on('update-not-available', res => {
    log.info("没有可更新版本:" + res)
    sendMessage("没有可更新版本:" + res);
  })

  autoUpdater.on('update-available', res => {
    dialog.showMessageBox({
      type: 'info',
      title: '软件更新',
      message: '发现新版本, 确定更新?',
      buttons: ['确定', '取消']
    }).then(resp => {
      if (resp.response == 0) {
        autoUpdater.downloadUpdate()
      }
    })
  })

  autoUpdater.on('download-progress', res => {
    log.info("下载监听:" + res)
    // win.webContents.send('downloadProgress', res)
    sendMessage("下载监听:" + res);
  })

  autoUpdater.on('update-downloaded', () => {
    dialog.showMessageBox({
      title: '下载完成',
      message: '最新版本已下载完成, 退出程序进行安装'
    }).then(() => {
      autoUpdater.quitAndInstall()
    })
  })

  // 检测是否有新版本
  autoUpdater.checkForUpdates()
};

app.whenReady().then(() => {
  mainWin = createWindow();
  checkForUpdates();
  sendMessage('更新url:' + autoUpdater.getFeedURL());
});

