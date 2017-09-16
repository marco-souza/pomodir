const
    url = require("url"),
    path = require("path"),
    electron = require("electron"),
    filepaths = require("./filepaths"),
    // client = require("electron-connect").client,

    // Module to control application life.
    app = electron.app

    Tray = electron.Tray,
    Menu = electron.Menu,
    BrowserWindow = electron.BrowserWindow,

    /**
     * Create App Window
     *
     * @param {any} mainWindow
     * @param {any} env
     */
    createWindow = (mainWindow, env) => { // @almost_functional
        // and load the index.html of the app.
        mainWindow.loadURL(url.format({
            pathname: path.join(filepaths.dest, "index.html"),
            protocol: "file:",
            slashes: true
        }))

        // Emitted when the window is closed.
        mainWindow.on("closed", () => {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            mainWindow = null
        })

        // Open the DevTools.
        if (env == "development") {
            mainWindow.webContents.openDevTools({ mode: "detach" })
        }
    },

    /**
     *
     *
     * @param {any} mainWindow
     * @param {any} visible
     */
    appReady = (createWindow, windowFun, iconFun) => { // @almost_functional D:
        return () => {

            // Setup trayIcon
            const mainWindow = windowFun()
            // Setup trayIcon
            const appIcon = iconFun()

            // Click Action
            appIcon.on("click", () =>
                mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
            )
            appIcon.setToolTip('This is my application.')
            console.log("appIcon.setToolTip",appIcon.setToolTip);

            // Build Context Menu 'right-click'
            appIcon.setContextMenu(Menu.buildFromTemplate([
                { label: 'Item1', click: () => console.log("Item1 clicked")  },
                { label: 'Item2', click: () => console.log("Item2 clicked")  },
                { label: 'Item3', click: () => console.log("Item3 clicked")  },
                { label: 'Item4', click: () => console.log("Item4 clicked")  }
            ]))

            // Preload window
            createWindow(
                // Create app window
                mainWindow,
                // Dev Env
                process.env.NODE_ENV
            )

        }
    }

// Start-up the App
app.on("ready", appReady(
    createWindow,
    window =>new BrowserWindow({
        width: 300,
        height: 150,
        resizable: true,
        show: false,
        frame: false, // Show Native Frame window
    }),
    icon => new Tray(filepaths.icon) // To be create after the app is ready
))