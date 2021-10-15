/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './History.module.css';
import { AnalyInterface, EachKillData, FramesData } from '../../types/analyInterface';
import Loading from '../Loading/Loading';
import TeamInfo from './TeamInfo';
import Graph from './Graph';
import Map from './Map';

export default function History(props: { gameId: number; close: () => void }) {
  const { gameId, close } = props;
  const [Data, setData] = useState<AnalyInterface | null>(null);
  const [BeforeKillData, setBeforeKillData] = useState<FramesData<EachKillData[]>|null>(null);
  const [Selected, setSelected] = useState<number>(-1);
  useEffect(() => {
    (async () => {
      const res = await axios.get<any>(`https://api.lolgo.gg/analyrequest/${gameId}`);
      const data: AnalyInterface = await res.data;
      const beforeKillData:FramesData<EachKillData[]> = {};
      beforeKillData[-1] = [];
      let integratedKill: EachKillData[] = [];
      let i = 0;
      while (i <= data.totFrame) {
        beforeKillData[i] = [...integratedKill];
        integratedKill = [...integratedKill, ...data.killData[i]];
        i += 1;
      }
      console.log(beforeKillData);
      data.killData[-1] = integratedKill;
      setData(data);
      setBeforeKillData(beforeKillData);
      // setSelected(data.totFrame);
    })();
  }, []);
  if (!Data || !BeforeKillData) return <Loading />;
  // console.log(Data);
  // window.asdf = (num:number) => {
  //   setSelected(num);
  // };
  return (
    <div id={styles.historyDiv}>
      <div id={styles.topperDiv}>
        <div className={styles.teamInfoDiv}>
          <TeamInfo data={Data} frame={Selected} team={100} />
        </div>
        <div className={styles.teamInfoDiv}>
          <TeamInfo data={Data} frame={Selected} team={200} />
        </div>
        <div id={styles.mapDiv}>
          <Map data={Data} close={close} frame={Selected} beforeKillData={BeforeKillData} />
        </div>
      </div>
      <div id={styles.graphDiv}>
        <Graph data={Data} frame={Selected} changeFrame={setSelected} />
      </div>
    </div>
  );
}
