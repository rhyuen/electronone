"use strict";

const fs = require("fs");
const path = require("path");
const {dialog, app, nativeImage} = require("electron");

function showMessage(browserWindow){
    dialog.showMessageBox(browserWindow, {
        type: "info",
        icon: nativeImage.createFromPath("../imgs/spiderman.jpg"),
        message: "Hello Friend",
        detail: "Just a friendly neighbourhood chat.",
        buttons: ["Web ball", "Close"],
        defaultId: 0
    }, (clickedIndex) => {
        console.log(clickedIndex);
    });
}

function getVersion(browserWindow){
    let versionNumber = process.versions.electron;

    dialog.showMessageBox(browserWindow, {
        type: "info",
        message: "Your version of electron is " + versionNumber,
        detail: "A Detail and/or filler text for the version number.",
        buttons: ["I've read the above"],
        defaultId: 0
    }, (clickedIndex) => {
        console.log("Clicked the Get Version Button from the Menubar.");
    });
}

function showSaveDialog(browserWindow){
    dialog.showSaveDialog(browserWindow, {
        defaultPath: path.join(app.getPath("downloads"), "memory-info.txt")
    }, (fileName) => {
        if(fileName){
            const memInfo = JSON.stringify(process.getProcessMemoryInfo(), null, 2);
            fs.writeFile(fileName, memInfo, "utf8", (err) => {
                if(err){
                    dialog.showErrorBox("The file filed to save.", err.message);
                }else{
                    console.log("Memory info dump success");
                }
            });
        }
    })
}

function showOpenDialog(browserWindow){
    dialog.showOpenDialog(browserWindow, {
        defaultPath: app.getPath("downloads"),
        filters: [
            {name: "Text files", extensions: ["txt"]}
        ]
    }, (filePaths) => {
        if(filePaths){
            console.log(filePaths, fs.readFileSync(filePaths[0], "utf8"));
        }
    });
}

module.exports = {showMessage, getVersion, showSaveDialog, showOpenDialog};