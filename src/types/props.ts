import { AxiosInstance } from 'axios';
import { Rank } from './enum';

export interface UserInfoI{
  name:string,
  summonerId:number,
  accountId:number,
  puuid:string,
  tier:Rank,
  division:0|1|2|3|4
}

export interface ChampSelectPlayerInfoI{
  myTeam:[number],
  theirTeam:[number],
  myTeamInfo:{
    [x:number]:UserInfoI
  },
  myCellId:number
}

export interface PickInfoI{
  actorCellId:number,
  championId:number,
  completed:boolean,
  isInProgress:boolean,
  isAllyAction:boolean
}

export interface BanPickInfoI{
  ourBan:[number?],
  theirBan:[number?],
  [x:number]:PickInfoI
}

export interface ChampPickedProps{
  pickInfo:PickInfoI,
  userInfo?:UserInfoI
}

export interface ChampRequestInfoI{
  bans:[number?],
  ally:[number?],
  enemy:[number?]
}

export interface ChampRecommendInfoI{
  good:[number],
  bad:[number]
}

export interface RootProps{
  LCUInstance:AxiosInstance,
}
