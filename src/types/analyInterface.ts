export type TowerType =
  | 'OUTER_TURRET'
  | 'INNER_TURRET'
  | 'BASE_TURRET'
  | 'NEXUS_TURRET'
  | 'INHIBITOR_BUILDING';

export type TeamType = 100|200;

export type LaneType = 'TOP_LANE' | 'MID_LANE' | 'BOT_LANE';

export type MonsterType =
  | 'FIRE_DRAGON'
  | 'EARTH_DRAGON'
  | 'WATER_DRAGON'
  | 'AIR_DRAGON'
  | 'ELDER_DRAGON'
  | 'RIFTHERALD'
  | 'BARON_NASHOR';

export interface FramesData<T> {
  [frame: number]: T;
}

export interface EachPlayersData<T> {
  [participantId: number]: T;
}

export interface EachInfoData {
  summonerName: string;
  championId: number;
  teamId: TeamType
}

export interface EachKdaData {
  k: number;
  d: number;
  a: number;
}

export interface EachKillData {
  killerId: number;
  victimId: number;
  assistId: number[];
  x: number;
  y: number;
}

export interface EachTowerData {
  timestamp: number;
  towerType: TowerType;
  laneType: LaneType;
  teamId: TeamType;
}

export interface EachEliteData {
  timestamp: number;
  monsterType: MonsterType;
  killerId: number;
}

export interface AnalyInterface {
  win: TeamType
  participantInfo: EachPlayersData<EachInfoData>;
  totTime: number;
  totFrame: number;
  highlightData: number[];
  winRate: number[];
  kdaData: FramesData<EachPlayersData<EachKdaData>>;
  killData: FramesData<EachKillData[]>;
  towerDataFull: EachTowerData[];
  itemData: FramesData<EachPlayersData<number[]>>;
  goldData: FramesData<EachPlayersData<number>>;
  eliteData: EachEliteData[];
}
