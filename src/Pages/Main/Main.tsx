import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MainProps, UserInfoI, MatchInfoI } from '../../types/props';
import Loading from '../Loading/Loading';
import MainDesign from './MainDesign';

export default function Main(props:{userInfo:UserInfoI, profileIconId:number}) {
  const { userInfo, profileIconId } = props;
  const [MainPropsData, setMainPropsData] = useState<MainProps>();
  useEffect(() => {
    (async () => {
      while (true) {
        try {
          let totalKill = 0; let totalDeath = 0; let totalAssist = 0; let totalWin = 0; let
            totalLose = 0;
          // eslint-disable-next-line no-await-in-loop
          const res = await axios.get('/lol-match-history/v1/products/lol/current-summoner/matches');
          const { games } = res.data.games;
          const matchInfo:[MatchInfoI] = games.map((game:any) => {
            const {
              gameDuration, gameId, gameCreation, gameMode, gameType, participants, queueId,
            } = game;
            const {
              championId, spell1Id, spell2Id, stats,
            } = participants[0];
            const {
              kills, deaths, assists, champLevel, win,
              totalMinionsKilled, neutralMinionsKilled, perk0, perkSubStyle,
            } = stats;
            const cs = totalMinionsKilled + neutralMinionsKilled;
            totalKill += kills;
            totalDeath += deaths;
            totalAssist += assists;
            if (win) {
              totalWin += 1;
            } else {
              totalLose += 1;
            }
            const ret:MatchInfoI = {
              duration: gameDuration,
              gameId,
              playDate: gameCreation,
              gameMode,
              gameType,
              queueId,
              championId,
              spell1: spell1Id,
              spell2: spell2Id,
              level: champLevel,
              kill: kills,
              death: deaths,
              assist: assists,
              isWin: win,
              creepScore: cs,
              perk1: perk0,
              perk2: perkSubStyle,
            };
            return ret;
          });
          const newMainProp:MainProps = {
            userInfo,
            profileIconId,
            matchInfo,
            totalKill,
            totalDeath,
            totalAssist,
            totalWin,
            totalLose,
          };
          console.log(newMainProp);
          setMainPropsData(newMainProp);
          break;
        } catch {
          // go
        }
      }
    })();
  }, []);

  if (!MainPropsData) {
    return <Loading />;
  }
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MainDesign {...MainPropsData} />;
}
