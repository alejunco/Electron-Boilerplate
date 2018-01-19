process.env.NODE_ENV = isDev() ? 'development' : 'production';
const cfg = require('./config/' + process.env.NODE_ENV + '.js');
const packageJson = require('./package.json');
if (process.env.NODE_ENV == 'development')
    require('electron-reload')(__dirname);

const {
    BrowserWindow,
    app
} = require('electron');

const log = require("electron-log");
const autoUpdater = require("electron-updater").autoUpdater;

let win = null;

configureElectronLogging();


//Close application if it is not open with the AppKey that is on {packageJson.appKey}
if(!process.argv.find(o => o === packageJson.appKey))
{
    log.info("Orders-Register has not been open as expected");
    app.quit();
    return;
}


const shouldQuit = app.makeSingleInstance((commandLine, workingDirectory) => {
    log.info('Command Line params: ' + commandLine);
    // Someone tried to run a second instance, we should focus our window.
    var key = commandLine[2];
    if (win) {
        if (win.isMinimized()) {
            log.info('Main Window is minimized');
            win.restore();
        }

        log.info('Focusing Main Window...');
        win.focus();
    }

});

if (shouldQuit) {
    log.info('Application instance running...');
    log.info('Exiting...');
    app.quit()
    return
} 
else {
    configureAutoUpdater();

    app.on('ready', _ => {
        log.info('app ready...');

        configureMainWindow();

        autoUpdater.checkForUpdatesAndNotify();
    });

    app.on('window-all-closed', function () {
        // On OS X it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') {
            app.quit()
        }
    });

    app.on('activate', function () {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (win === null) {
            configureMainWindow()
        }
    });
}

function configureElectronLogging() {
    const fs = require('fs');
    // Same as for console transport
    log.transports.file.level = 'info';
    log.transports.file.format = '{h}:{i}:{s}:{ms} {text}';

    // Set approximate maximum log size in bytes. When it exceeds,
    // the archived log will be saved as the log.old.log file
    log.transports.file.maxSize = 5 * 1024 * 1024;

    // Write to this file, must be set before first logging
    log.transports.file.file = __dirname + '/log.txt';

    // fs.createWriteStream options, must be set before first logging
    // you can find more information at
    // https://nodejs.org/api/fs.html#fs_fs_createwritestream_path_options
    log.transports.file.streamConfig = {
        flags: 'w'
    };

    // set existed file stream
    log.transports.file.stream = fs.createWriteStream('log.txt');

    log.info('configured electron logging...');
}

function configureAutoUpdater() {
    log.info('configuring AutoUpdater...');
    autoUpdater.logger = log;

    autoUpdater.on("checking-for-update", function (_arg1) {
        log.info("Checking for update...");
    });
    autoUpdater.on("update-available", function (_arg2) {
        return log.info("Update available.");
    });
    autoUpdater.on("update-not-available", function (_arg3) {
        return log.info("Update not available.");
    });
    autoUpdater.on("error", function (err) {
        return log.info("Error in auto-updater. " + err);
    });
    autoUpdater.on("download-progress", function (progressObj) {
        return log.info("downloading update");
    });

    autoUpdater.on("update-downloaded", function (_arg4) {
        log.info("Update downloaded");
        autoUpdater.quitAndInstall();
    });
}

function configureMainWindow() {
    win = new BrowserWindow({
        width: 1024,
        height: 768,
        minWidth: 800,
        minHeight: 600,
        show: false
    });

    log.info('BrowserWindow created...');

    win.webContents.session.setProxy({}, () => {});

    if (cfg.showDevTools) {
        win.openDevTools({
            detached: true
        });
    }

    win.once('ready-to-show', () => {
        win.show();
    })

    win.loadURL('file://' + __dirname + '/src/index.html');

    win.on('closed', _ => {
        win = null;
    })
}

function isDev() {
    return process.mainModule.filename.indexOf('app.asar') === -1;
}