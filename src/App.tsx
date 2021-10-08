import React, { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';
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

const checker = (isLCUConnected: boolean) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  // return <History gameId={5463096178} close={() => {}} />;
  if (isLCUConnected) {
    return <Selector />;
  }
  return <NeedLoL />;
};

export default function App() {
  const [IsLCUConnected, setIsLCUConnected] = useState<boolean>(false);
  useEffect(() => {
    ipcRenderer.on(
      LCUEvents.LCUConnected,
      (evt, payload: LCUConnectorDataI) => {
        console.log(payload);
        axios.defaults.baseURL = `https://127.0.0.1:${payload.port}/`;
        axios.defaults.headers.common.Authorization = `Basic ${btoa(
          `riot:${payload.password}`,
        )}`;
        setIsLCUConnected(true);
      },
    );
    ipcRenderer.on(LCUEvents.LCUClosed, () => {
      console.log('disconnect');
      setIsLCUConnected(false);
    });
    ipcRenderer.send(LCUEvents.NeedLCU);
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
