export enum LCUEvents{
  LCUConnected='LCUConnected',
  LCUClosed='LCUClosed',
  NeedLCU='NeedLCU',
  WindowClose='WindowClose',
  WindowMinimize='WindowMinimize'
}

export enum GameFlow{
  None,
  Lobby,
  Matchmaking,
  ChampSelect,
  InProgress,
  WaitingForStats,
  PreEndOfGame,
  EndOfGame,
}

export enum Rank{
  NONE,
  IRON,
  BRONZE,
  SILVER,
  GOLD,
  PLATINUM,
  DIAMOND,
  MASTER,
  GRANDMASTER,
  CHALLENGER,
}

const enums = {
  LCUEvents,
  GameFlow,
  Rank,
};

export default enums;
