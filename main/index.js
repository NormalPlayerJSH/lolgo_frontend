"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var isDev = require("electron-is-dev");
var enum_1 = require("./types/enum");
var LCUConnector = require('lcu-connector');
var version = require('./package.json').version;
var connector = new LCUConnector();
electron_1.app.commandLine.appendSwitch('ignore-certificate-errors', 'true');
electron_1.app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');
// console.log(LCUConnector, connector);
var LCUData = {};
var isLCUConnected = false;
// config 파일로 따로 선언하여도 좋습니다.
var baseUrl = "http://localhost:3000";
var prodUrl = "https://desktop.lolgo.gg";
var mainWindow;
electron_1.ipcMain.on('asdf', function (evt, data) {
    console.log(data.msg);
    evt.sender.send('asdf', { msg: 'dd' });
});
function createMainWindow() {
    mainWindow = new electron_1.BrowserWindow({
        width: 1024,
        height: 720,
        // 위 path, url 모듈을 사용하기 위해서 Node 환경을 Electron에 합치는 것을 뜻합니다.
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false
        },
        frame: false,
        resizable: false
    });
    // 2021.03.28 수정
    // 실제로 배포된 어플리케이션에서는 빌드된 index.html 파일을 서빙합니다.
    // url.pathToFileURL()로 나온 객체는 string type으로 변환이 필요합니다.
    //   const mainWindowUrl: string = url.pathToFileURL(path.join(__dirname, '../build/index.html')).toString();
    // 개발 환경 여부 확인 후 맞는 url/file로 서빙합니다.
    mainWindow.loadURL(isDev ? baseUrl : prodUrl);
    // 개발 환경의 경우 Chrome의 개발자 도구를 열어 사용합니다.
    if (isDev) {
        mainWindow.webContents.openDevTools();
    }
    mainWindow.on("closed", function () {
        mainWindow = null;
    });
}
// 어플리케이션이 준비가 되었다면 데스크탑 어플리케이션으로 실행합니다.
electron_1.app.on("ready", function () {
    connector.start();
    createMainWindow();
});
// 모든 윈도우가 닫혔다면 어플리케이션을 종료합니다.
electron_1.app.on("window-all-closed", function () {
    electron_1.app.quit();
});
electron_1.app.on("activate", function () {
    if (mainWindow === null) {
        createMainWindow();
    }
});
electron_1.ipcMain.on(enum_1.LCUEvents.NeedLCU, function (evt) {
    console.log('needlcu');
    if (isLCUConnected)
        evt.sender.send(enum_1.LCUEvents.LCUConnected, LCUData);
});
electron_1.ipcMain.on(enum_1.LCUEvents.WindowClose, function (evt) {
    mainWindow.close();
});
electron_1.ipcMain.on(enum_1.LCUEvents.WindowMinimize, function (evt) {
    mainWindow.minimize();
});
electron_1.ipcMain.on(enum_1.LCUEvents.NeedVersion, function (evt) {
    evt.sender.send(enum_1.LCUEvents.AnswerVersion, { version: version });
});
connector.on('connect', function (data) {
    console.log(data);
    LCUData = data;
    isLCUConnected = true;
    mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.webContents.send(enum_1.LCUEvents.LCUConnected, data);
});
connector.on('disconnect', function () {
    console.log('disconnect');
    isLCUConnected = false;
    mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.webContents.send(enum_1.LCUEvents.LCUClosed);
});
