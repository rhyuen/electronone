const {app, BrowserWindow} = require("electron");
const path = require("path");
const {setMainMenu} = require("./js/main-menu.js");
let mainWindow;

app.on("ready", () => {
    mainWindow = new BrowserWindow({
        show: false
    });
    mainWindow.loadURL(path.join("file://", __dirname, "views/index.html"));
    mainWindow.on("ready-to-show", () => {
        mainWindow.show();
    });
    setMainMenu(mainWindow);
});