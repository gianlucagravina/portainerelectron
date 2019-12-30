const electron = require('electron');
const {shell, app, BrowserWindow} = electron;
const HOMEPAGE = 'http://localhost:9000/#/home';

let mainWindow;

app.on('ready', () => { 
    window = new BrowserWindow({
        width:1200,
        height:900,
        webPreferences: {
            nodeIntegration: false
        }
    });
    window.setMenuBarVisibility(false);
    window.loadURL(HOMEPAGE);

    window.on('close', () => {
        window = null;
    });

    window.webContents.on('will-navigate', (ev, url) => {
        let parts = url.split('/');
        if (parts[0] + '//' + parts[2] != HOMEPAGE) {
            ev.preventDefault();
            shell.openExternal(url);
        };
    });
});