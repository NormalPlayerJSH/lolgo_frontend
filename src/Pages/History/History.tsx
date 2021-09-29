/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import styles from 'History.module.css';
import axios from 'axios';
import { AnalyInterface } from '../../types/analyInterface';
import Loading from '../Loading/Loading';

export default function History(props:{gameId:number, close: ()=>void}) {
  const { gameId, close } = props;
  const [Data, setData] = useState<AnalyInterface|null>(null);
  useEffect(() => {
    (async () => {
      const res = await axios.post('http://api.lolgo.gg/analyrequest', {
        matchId: gameId,
      });
      const data:AnalyInterface = await res.data;
      setData(data);
    })();
  }, []);
  if (!Data) return <Loading />;
  console.log(Data);
  return (
    <div onClick={() => close()} style={{ fontSize: '30rem' }}>
      {gameId}
    </div>
  );
}
