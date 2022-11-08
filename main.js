const { app, BrowserWindow } = require('electron');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: __dirname + './assets/images/favicon_io/favicon-32x32.png',
  });

  win.loadFile('index.html');
};

app.whenReady().then(() => {
  createWindow();
});
