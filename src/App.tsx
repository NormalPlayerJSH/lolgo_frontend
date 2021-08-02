import React, { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';
import axios from 'axios';
import './App.global.css';
import { LCUEvents } from './types/enum';
import { LCUConnectorDataI } from './types/LCUConnector';
import Selector from './Selector';
import NeedLoL from './Pages/NeedLoL/NeedLoL';

const checker = (isLCUConnected:boolean) => {
  if (isLCUConnected) {
    return (<Selector />);
  }
  return (<NeedLoL />);
};

export default function App() {
  const [IsLCUConnected, setIsLCUConnected] = useState<boolean>(false);
  useEffect(() => {
    ipcRenderer.on(LCUEvents.LCUConnected, (evt, payload:LCUConnectorDataI) => {
      console.log(payload);
      axios.defaults.baseURL = `https://127.0.0.1:${payload.port}/`;
      axios.defaults.headers.common.Authorization = `Basic ${btoa(`riot:${payload.password}`)}`;
      setIsLCUConnected(true);
    });
    ipcRenderer.on(LCUEvents.LCUClosed, () => {
      console.log('disconnect');
      setIsLCUConnected(false);
    });
    ipcRenderer.send(LCUEvents.NeedLCU);
  }, []);

  return (
    checker((IsLCUConnected as boolean))
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
