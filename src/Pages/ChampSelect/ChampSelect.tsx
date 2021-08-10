/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import {
  UserInfoI, ChampSelectPlayerInfoI, BanPickInfoI, PickInfoI,
  ChampRequestInfoI, ChampRecommendInfoI, BanPickPlayerInfoI,
} from '../../types/props';
import { Rank } from '../../types/enum';
import ChampSelectDesign from './ChampSelectDesign';
import Loading from '../Loading/Loading';

const parseChampData = (data:any, myCellId:number) => {
  const { actions, timer } = data;
  const { internalNowInEpochMs, adjustedTimeLeftInPhase } = timer;
  const newBanPickInfo:BanPickInfoI = {
    ourBan: [],
    theirBan: [],
    endTime: 0,
  };
  const newChampRequestInfo:ChampRequestInfoI = {
    bans: [],
    ally: [],
    enemy: [],
    position: 'MIDDLE',
  };
  newBanPickInfo.endTime = internalNowInEpochMs + adjustedTimeLeftInPhase;
  for (const littleActions of actions) {
    for (const {
      actorCellId, championId, completed, id, isAllyAction, isInProgress, pickTurn, type,
    } of littleActions) {
      if (type === 'pick') {
        newBanPickInfo[actorCellId as number] = {
          actorCellId, championId, completed, isAllyAction, isInProgress, id, pickTurn,
        };
        if (championId !== 0) {
          if (isAllyAction && (actorCellId !== myCellId)) {
            newChampRequestInfo.ally.push(championId);
          } else if (!isAllyAction) {
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
  return { newBanPickInfo, newChampRequestInfo };
};

export default function ChampSelect(props:{UserInfo:UserInfoI}) {
  const { UserInfo } = props;
  const { data: PickData, isValidating } = useSWR('/lol-champ-select/v1/session', (url) => axios.get(url).then((res) => res.data), {
    refreshInterval: 250,
    dedupingInterval: 0,
  });
  const [PlayerInfo, setPlayerInfo] = useState<ChampSelectPlayerInfoI>();
  const [BanPickInfo, setBanPickInfo] = useState<BanPickInfoI>({
    ourBan: [],
    theirBan: [],
    endTime: 0,
  });
  const [ChampRequestInfo, setChampRequestInfo] = useState<ChampRequestInfoI>();
  const [ChampRecommendInfo, setChampRecommendInfo] = useState<ChampRecommendInfoI>({
    good: [0, 0, 0, 0, 0],
    bad: [0, 0, 0, 0, 0],
  });
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
  }, []);
  useEffect(() => {
    if (PickData && PlayerInfo) {
      const { newBanPickInfo, newChampRequestInfo } = parseChampData(
        PickData, PlayerInfo.myCellId,
      );
      setBanPickInfo(newBanPickInfo);
      if (JSON.stringify(newChampRequestInfo) !== JSON.stringify(ChampRequestInfo)) {
        setChampRequestInfo(newChampRequestInfo);
      }
    }
  }, [PickData, PlayerInfo]);
  useEffect(() => {
    if (ChampRequestInfo) {
      console.log(ChampRequestInfo);
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
      id: 0,
      pickTurn: 1,
    };
  };
  if (!BanPickInfo || !PlayerInfo) return <Loading />;
  const LockIn = () => {
    const myId = BanPickInfo[PlayerInfo.myCellId].id;
    axios.post(`/lol-champ-select/v1/session/actions/${myId}/complete`);
  };
  const selectChamp = (championId:number) => {
    const myInfo = BanPickInfo[PlayerInfo.myCellId];
    const newInfo = { ...myInfo, championId };
    axios.patch(`/lol-champ-select/v1/session/actions/${myInfo.id}`, newInfo).catch(console.log);
  };
  const BanPickPlayerInfo: BanPickPlayerInfoI = {
    myTeam: {
      ban: BanPickInfo.ourBan,
      pick: PlayerInfo.myTeam.map((cellNum) => ({
        pickInfo: BanPickChecker(cellNum, true),
        playerInfo: PlayerInfo.myTeamInfo[cellNum],
        isMe: cellNum === PlayerInfo.myCellId,
      })),
    },
    theirTeam: {
      ban: BanPickInfo.theirBan,
      pick: PlayerInfo.theirTeam.map((cellNum) => ({
        pickInfo: BanPickChecker(cellNum, false),
      })),
    },
  };
  return (
    <ChampSelectDesign
      BanPickPlayerInfo={BanPickPlayerInfo}
      ChampRecommendInfo={ChampRecommendInfo}
      Me={BanPickChecker(PlayerInfo.myCellId, true)}
      selectChampion={selectChamp}
      lockIn={LockIn}
      endTime={BanPickInfo.endTime}
    />
  );
}
