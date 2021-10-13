import React, { useState, useEffect } from 'react';
import { IpcRenderer } from 'electron';
import axios from 'axios';
import styles from './App.module.css';
import { LCUEvents } from './types/enum';
import { LCUConnectorDataI } from './types/LCUConnector';
import Selector from './Selector';
import NeedLoL from './Pages/NeedLoL/NeedLoL';
import Loading from './Pages/Loading/Loading';
import ChampSelectDesign from './Pages/ChampSelect/ChampSelectDesign';
import { DummyData } from './Pages/ChampSelect/DummyData';
import Header from './Pages/Header/Header';
import InGame from './Pages/InGame/InGame';
import History from './Pages/History/History';

declare global {
  interface Window {
    require: (name: string) => {ipcRenderer:IpcRenderer};
  }
}

const checker = (isLCUConnected: 'connected'|'not connected'|'not electron') => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  // return <History gameId={5463096178} close={() => {}} />;
  // return <ChampSelectDesign {... {...DummyData}} />
  // return <InGame />
  if (isLCUConnected==='connected') {
    return <Selector />;
  } else if(isLCUConnected==='not connected'){
    return <NeedLoL />;
  } return <NeedLoL msg="이곳은 데스크탑 앱에서 사용되는 페이지입니다" />
};

export default function App() {
  const [IsLCUConnected, setIsLCUConnected] = useState<'connected'|'not connected'|'not electron'>('not connected');
  useEffect(() => {
    try {
      const { ipcRenderer } = window.require('electron');
    ipcRenderer.on(
      LCUEvents.LCUConnected,
      (evt, payload: LCUConnectorDataI) => {
        console.log(payload);
        axios.defaults.baseURL = `https://127.0.0.1:${payload.port}/`;
        (axios.defaults.headers as unknown as {common:{Authorization:string}}).common.Authorization = `Basic ${btoa(
          `riot:${payload.password}`,
        )}`;
        setIsLCUConnected('connected');
      },
    );
    ipcRenderer.on(LCUEvents.LCUClosed, () => {
      console.log('disconnect');
      setIsLCUConnected('not connected');
    });
    ipcRenderer.send(LCUEvents.NeedLCU);
  } catch {
    setIsLCUConnected('not electron')
  }
  }, []);
  return (
    <div id={styles.full}>
      <header>
        <Header />
      </header>
      <div id={styles.contents}>{checker(IsLCUConnected)}</div>
    </div>
  );
  // return (
  //   <Router>
  //     <Switch>
  //       <Route path="/test">
  //         <TestComp LCUData={LCUData} />
  //       </Route>
  //       <Route path="/" component={Hello} />
  //     </Switch>
  //   </Router>
  // );
}
