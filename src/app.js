const { app, BrowserWindow } = require('electron');
const path = require('node:path');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600
    })

    // win.loadFile('./src/index.html');
    win.loadFile(path.join(__dirname, 'index.html'));
}

app.whenReady().then(() => {
    createWindow();

    // const mainWin = new BrowserWindow({
    //   width: 800,
    //   height: 600,
    //   webPreferences: {
    //     preload: path.join(__dirname, 'preload.js')
    //   },
    // })
    // mainWin.loadFile(path.join(__dirname, 'index.html'))
    // console.log(`__dirname:`, __dirname);
    // console.log(`preload:`, path.join(__dirname, 'preload.js'));


    // const win = new BrowserWindow({
    //     width: 800,
    //     height: 1500,
    //     webPreferences: {
    //         preload: path.join(__dirname, 'preload.js'),
    //     },
    // })
    // win.loadURL('https://www.tiktok.com')
    // win.webContents.openDevTools();
    // const contents = win.webContents
    // contents.openDevTools();

    // mainWin.webContents.openDevTools();
    // console.log(1111,contents);
})
