const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
    autoHideMenuBar: true
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "main", 'index.html'));
};

const createStreamableWindow = async (selected) => {

  // Create the browser window
  const streambleWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    show: false,
    frame: false,
    simpleFullscreen: true,
    title: selected.name
  })

  // Load file
  streambleWindow.loadFile(path.join(__dirname, "stream", "index.html"));

  streambleWindow.on("ready-to-show", () => {
    streambleWindow.show();
    streambleWindow.maximize()
    streambleWindow.webContents.send("screenId", selected.id)
  })
}

app.on('ready', createWindow);

ipcMain.on("openScreen", (e, data) => {
  createStreamableWindow(JSON.parse(data));
})