import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GameFlow, Rank } from './types/enum';
import { UserInfoI } from './types/props';
import ChampSelect from './Pages/ChampSelect/ChampSelect';
import InGame from './Pages/InGame/InGame';
import Main from './Pages/Main/Main';
import Loading from './Pages/Loading/Loading';

export default function Selector() {
  const [Phase, setPhase] = useState<GameFlow>(GameFlow.None);
  const [UserInfo, setUserInfo] = useState<UserInfoI>();
  useEffect(() => {
    (async () => {
      while (true) {
        try {
        // eslint-disable-next-line no-await-in-loop
          const { data: infoData } = await axios.get('/lol-summoner/v1/current-summoner');
          const {
            accountId, displayName: name, puuid, summonerId,
          } = infoData;
          // eslint-disable-next-line no-await-in-loop
          const { data: { queueMap: { RANKED_SOLO_5x5: rankData } } } = await axios.get('/lol-ranked/v1/current-ranked-stats');
          const { tier: tierString } = rankData;
          const tier = Rank[tierString as keyof typeof Rank];
          const division = {
            I: 1, II: 2, III: 3, IV: 4, NA: 0,
          }[rankData.division as 'I'|'II'|'III'|'IV'|'NA'] as 0|1|2|3|4;
          setUserInfo({
            accountId, name, puuid, summonerId, division, tier,
          });
          console.log({
            accountId, name, puuid, summonerId, division, tier,
          });
          break;
        } catch {
          // go
        }
      }
    })();
    const intervalNum = setInterval(() => {
      axios.get('/lol-gameflow/v1/session')
        .then((res) => { setPhase(GameFlow[res.data.phase] as unknown as GameFlow); })
        .catch(() => { setPhase(GameFlow.None); });
    }, 500);
    return () => { clearInterval(intervalNum); };
  }, []);
  if (!UserInfo) {
    return <Loading />;
  }
  switch (Phase) {
    case GameFlow.ChampSelect:
      return <ChampSelect {...{ UserInfo: UserInfo! }} />;
    case GameFlow.InProgress:
    case GameFlow.WaitingForStats:
    case GameFlow.PreEndOfGame:
      return <InGame {...{ UserInfo: UserInfo! }} />;
    default:
      return <Main {...{ UserInfo: UserInfo! }} />;
  }
}
