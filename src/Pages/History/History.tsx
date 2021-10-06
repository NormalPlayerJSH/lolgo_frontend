/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './History.module.css';
import { AnalyInterface } from '../../types/analyInterface';
import Loading from '../Loading/Loading';
import TeamInfo from './TeamInfo';
import Graph from './Graph';
import Map from './Map';

export default function History(props: { gameId: number; close: () => void }) {
  const { gameId, close } = props;
  const [Data, setData] = useState<AnalyInterface | null>(null);
  const [Selected, setSelected] = useState<number>(0);
  useEffect(() => {
    (async () => {
      const res = await axios.post('http://api.lolgo.gg/analyrequest', {
        matchId: gameId,
      });
      const data: AnalyInterface = await res.data;
      setData(data);
      setSelected(data.totFrame);
    })();
  }, []);
  if (!Data) return <Loading />;
  console.log(Data);
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
          <Map />
        </div>
      </div>
      <div id={styles.graphDiv}>
        <Graph />
      </div>
    </div>
  );
}
