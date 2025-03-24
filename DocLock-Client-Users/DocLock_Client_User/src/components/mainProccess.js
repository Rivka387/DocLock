const { app, BrowserWindow } = require('electron');

let mainWindow;

const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1250,
    height: 800,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // Ensure compatibility with React
      devTools: false,
    },
  });

  mainWindow.setContentProtection(true); // Protect from screen capture
  mainWindow.loadFile('index.html');
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });
};

app.whenReady().then(createMainWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});