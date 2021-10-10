import * as path from "path";
import * as url from "url";

import { app, BrowserWindow, ipcMain } from "electron";
import * as isDev from "electron-is-dev";
import { LCUEvents } from './types/enum';

const LCUConnector = require('lcu-connector');

const connector = new LCUConnector();

app.commandLine.appendSwitch('ignore-certificate-errors', 'true');
app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');

// console.log(LCUConnector, connector);

let LCUData = {};
let isLCUConnected = false;

// config 파일로 따로 선언하여도 좋습니다.
const baseUrl: string = "http://localhost:3000";
const prodUrl: string = "https://desktop.lolgo.gg";

let mainWindow: BrowserWindow | null;

ipcMain.on('asdf',(evt,data)=>{
    console.log(data.msg);
    evt.sender.send('asdf',{msg:'dd'})
})

function createMainWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 720,
    // 위 path, url 모듈을 사용하기 위해서 Node 환경을 Electron에 합치는 것을 뜻합니다.
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false
    },
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

  mainWindow.on("closed", (): void => {
    mainWindow = null;
  });
}

// 어플리케이션이 준비가 되었다면 데스크탑 어플리케이션으로 실행합니다.
app.on("ready", (): void => {
  connector.start()
  createMainWindow();
});

// 모든 윈도우가 닫혔다면 어플리케이션을 종료합니다.
app.on("window-all-closed", (): void => {
  app.quit();
});

app.on("activate", (): void => {
  if (mainWindow === null) {
    createMainWindow();
  }
});

ipcMain.on(LCUEvents.NeedLCU, (evt) => {
  console.log('needlcu');
  if (isLCUConnected) evt.sender.send(LCUEvents.LCUConnected, LCUData);
});

connector.on('connect', (data:any) => {
  console.log(data);
  LCUData = data;
  isLCUConnected = true;
  mainWindow?.webContents.send(LCUEvents.LCUConnected, data);
});

connector.on('disconnect', () => {
  console.log('disconnect');
  isLCUConnected = false;
  mainWindow?.webContents.send(LCUEvents.LCUClosed);
});
