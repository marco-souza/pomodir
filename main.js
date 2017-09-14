const
    url = require("url"),
    path = require("path"),
    electron = require("electron"),
    filepaths = require("./filepaths"),
    client = require("electron-connect").client,

    // Module to control application life.
    app = electron.app

    Tray = electron.Tray,
    Menu = electron.Menu,
    BrowserWindow = electron.BrowserWindow

class MainApp {

    /**
     * Creates an instance of MainApp.
     * @memberof MainApp
     */
    constructor() {
        this.appIcon = null
        this.mainWindow = null
        this.visible = false
    }

    /**
     * Function to Run when app is ready
     *
     * @memberof MainApp
     */
    appReady() {

        const
            createWindow = () => {
                // Create the browser window.
                this.mainWindow = new BrowserWindow({
                    width: 300,
                    height: 150,
                    resizable: true,
                    show: false,
                    frame: false,
                })

                // and load the index.html of the app.
                this.mainWindow.loadURL(url.format({
                    pathname: path.join(filepaths.dest, "index.html"),
                    protocol: "file:",
                    slashes: true
                }))

                // Emitted when the window is closed.
                this.mainWindow.on("closed", () => {
                    // Dereference the window object, usually you would store windows
                    // in an array if your app supports multi windows, this is the time
                    // when you should delete the corresponding element.
                    this.mainWindow = null
                })

                // Open the DevTools.
                if (process.env.NODE_ENV == "development") {
                    this.mainWindow.webContents.openDevTools({ mode: "detach" })
                }
            },

            toggle = () => {
                if (this.visible) {
                    this.mainWindow.hide()
                } else {
                    this.mainWindow.show()
                }
                this.visible = !this.visible
            }

        // Can be changed in runtime
        let contextMenu = Menu.buildFromTemplate([
            { label: 'Item1', type: 'radio' },
            { label: 'Item2', type: 'radio' },
            { label: 'Item3', type: 'radio', checked: true },
            { label: 'Item4', type: 'radio' }
        ]);

        // Create trayIcon
        this.appIcon = new Tray(filepaths.icon)
        this.appIcon.on("click", toggle) // Linux just accept normal click :/
        this.appIcon.setToolTip('This is my application.');
        this.appIcon.setContextMenu(contextMenu);

        // Preload window
        createWindow()
    }

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
const mainApp = new MainApp()


app.on("ready", mainApp.appReady)

// Quit when all windows are closed.
app.on("window-all-closed", () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        app.hide()
    }
})

app.on("activate", () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainApp.mainWindow === null) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
