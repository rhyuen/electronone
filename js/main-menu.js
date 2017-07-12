"use strict";

const {app, Menu} = require("electron");
const isWindows = process.platform ==="win32";
const {showMessage, getVersion, showSaveDialog, showOpenDialog} = require("./dialogs.js");

module.exports = {
    setMainMenu
};

function setMainMenu(mainWindow){
    const template = [
        {
            label: isWindows ? "File": app.getName(),
            submenu: [
                {
                    label: isWindows ? "Exit": `Quit ${app.getName()}`,
                    accelerator: isWindows ? "Alt+F4" : "CmdOrCtrl+Q",
                    click(){
                        app.quit();
                    }
                }
            ]
        },
        {
            label: "Edit",
            submenu: [
                {role: "undo"},
                {role: "redo"},
                {type: "separator"},
                {role: "cut"},
                {role: "copy"},
                {role: "paste"},
                {role: "selectall"}
            ]
        },{
            label: "Handlers",
            submenu: [
                {
                    label: "Say Hello",
                    click(){
                        showMessage(mainWindow)
                    }
                },
                {
                    label: "Save Memory Usage",
                    click(){
                        showSaveDialog(mainWindow);
                    }
                },
                {
                    "label": "Open File",
                    click(){
                        showOpenDialog(mainWindow)
                    }
                },
                {
                    "label": "Get Version",
                    click(){
                        getVersion(mainWindow);
                    }
                },
                {type: "separator"},
                {role: "quit"}
            ]
        }
    ]

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}