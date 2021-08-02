/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  UserInfoI, ChampSelectPlayerInfoI, BanPickInfoI, ChampPickedProps, PickInfoI,
  ChampRequestInfoI, ChampRecommendInfoI,
} from '../../types/props';
import { Rank } from '../../types/enum';
import ChampPicked from './ChampPicked';

export default function ChampSelect(props:{UserInfo:UserInfoI}) {
  const { UserInfo } = props;
  const [PlayerInfo, setPlayerInfo] = useState<ChampSelectPlayerInfoI>();
  const [BanPickInfo, setBanPickInfo] = useState<BanPickInfoI>();
  const [ChampRequestInfo, setChampRequestInfo] = useState<ChampRequestInfoI>();
  const [ChampRecommendInfo, setChampRecommendInfo] = useState<ChampRecommendInfoI>();
  useEffect(() => {
    (async () => {
      while (true) {
        try {
          let myCellId = -1;
          // eslint-disable-next-line no-await-in-loop
          const { data } = await axios.get('/lol-champ-select/v1/session');
          const { myTeam, theirTeam } = data;
          const infoMyTeam = myTeam.map((teamData:any) => teamData.cellId as number);
          const infoTheirTeam = theirTeam.map((teamData:any) => teamData.cellId as number);
          const myTeamSummonerIds = myTeam.map((teamData:any) => teamData.summonerId as number);
          // eslint-disable-next-line no-await-in-loop
          const { data: myTeamInfoData } = await axios.get(`/lol-summoner/v2/summoners/?ids=${JSON.stringify(myTeamSummonerIds)}`);
          const myTeamPUUID = myTeamInfoData.map((userData:any) => userData.puuid);
          // eslint-disable-next-line no-await-in-loop
          const { data: myTeamRankData } = await axios.get(`/lol-ranked/v1/ranked-stats/?puuids=${JSON.stringify(myTeamPUUID)}`);
          const myTeamInfo:{[x:number]:UserInfoI} = {};
          myTeamInfoData.map((userData:any, idx:number) => {
            const {
              accountId, displayName: name, puuid, summonerId,
            } = userData;
            const rankData = myTeamRankData[puuid].queueMap.RANKED_SOLO_5x5;
            const { tier: tierString } = rankData;
            const tier = Rank[tierString as keyof typeof Rank];
            const division = {
              I: 1, II: 2, III: 3, IV: 4, NA: 0,
            }[rankData.division as 'I'|'II'|'III'|'IV'|'NA'] as 0|1|2|3|4;
            const user = {
              accountId, name, puuid, summonerId, division, tier,
            };
            if (summonerId === UserInfo.summonerId) myCellId = infoMyTeam[idx];
            myTeamInfo[infoMyTeam[idx]] = user;
            return user;
          });
          setPlayerInfo({
            myTeam: infoMyTeam,
            theirTeam: infoTheirTeam,
            myTeamInfo,
            myCellId,
          });
          console.log({
            myTeam: infoMyTeam,
            theirTeam: infoTheirTeam,
            myTeamInfo,
            myCellId,
          });
          break;
        } catch {
          // Just do again
        }
      }
    })();
    const intervalNum = setInterval(() => {
      axios.get('/lol-champ-select/v1/session')
        .then(({ data }) => {
          const { actions } = data;
          const newBanPickInfo:BanPickInfoI = {
            ourBan: [],
            theirBan: [],
          };
          const newChampRequestInfo:ChampRequestInfoI = {
            bans: [],
            ally: [],
            enemy: [],
          };
          for (const littleActions of actions) {
            for (const {
              actorCellId, championId, completed, id, isAllyAction, isInProgress, pickTurn, type,
            } of littleActions) {
              if (type === 'pick') {
                newBanPickInfo[actorCellId as number] = {
                  actorCellId, championId, completed, isAllyAction, isInProgress,
                };
                if (championId !== 0) {
                  if (isAllyAction) {
                    newChampRequestInfo.ally.push(championId);
                  } else {
                    newChampRequestInfo.enemy.push(championId);
                  }
                }
              } else if (type === 'ban') {
                if (isAllyAction) {
                  newBanPickInfo.ourBan.push(championId);
                } else {
                  newBanPickInfo.theirBan.push(championId);
                }
                if (championId !== 0) {
                  newChampRequestInfo.bans.push(championId);
                }
              }
            }
          }
          console.log(newBanPickInfo);
          console.log(newChampRequestInfo);
          setBanPickInfo(newBanPickInfo);
          setChampRequestInfo(newChampRequestInfo);
        })
        .catch((err) => { console.log(err); });
    }, 500);
    return () => { clearInterval(intervalNum); };
  }, []);
  useEffect(() => {
    if (ChampRequestInfo) {
      (async () => {
        const { data } = await axios.post('http://api.lolgo.gg/champrequest', ChampRequestInfo);
        console.log(data);
        setChampRecommendInfo(data);
      })();
    }
  }, [ChampRequestInfo]);
  const BanPickChecker = (cellId:number, isAllyAction:boolean):PickInfoI => {
    if ((BanPickInfo as BanPickInfoI)[cellId]) return (BanPickInfo as BanPickInfoI)[cellId];
    return {
      actorCellId: cellId,
      championId: 0,
      completed: false,
      isInProgress: false,
      isAllyAction,
    };
  };
  if (!BanPickInfo) return <div>로딩중</div>;
  return (
    <div>
      <div>
        아군
        {
          PlayerInfo?.myTeam.map((cellId) => (
            <>
              <ChampPicked
                pickInfo={BanPickChecker(cellId, true)}
                userInfo={PlayerInfo.myTeamInfo[cellId]}
              />
              <br />
            </>
          ))
        }
        <div>
          {BanPickInfo.ourBan}
        </div>
      </div>
      <br />
      <br />
      <div>
        상대
        {
          PlayerInfo?.theirTeam.map((cellId) => (
            <>
              <ChampPicked pickInfo={BanPickChecker(cellId, false)} />
              <br />
            </>
          ))
        }
        <div>
          {BanPickInfo.theirBan}
        </div>
      </div>
    </div>
  );
}
