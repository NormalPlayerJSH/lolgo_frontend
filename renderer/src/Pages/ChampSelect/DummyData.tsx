import { Rank } from '../../types/enum';
import { ChampSelectProps } from '../../types/props';

export const DummyData:ChampSelectProps = {
  BanPickPlayerInfo: {
    myTeam: {
      ban: [1, 2, 0, 23, 5],
      pick: [
        {
          pickInfo: {
            actorCellId: 0,
            championId: 6,
            completed: true,
            isInProgress: false,
            isAllyAction: true,
            id: 0,
            pickTurn: 0,
          },
          playerInfo: {
            name: 'NormalPlayerJSH',
            tier: Rank.IRON,
            division: 1,
            summonerId: 0,
            accountId: 0,
            puuid: '',
            position: 'TOP'
          },
          isMe: true,
        },
        {
          pickInfo: {
            actorCellId: 0,
            championId: 7,
            completed: true,
            isInProgress: false,
            isAllyAction: true,
            id: 0,
            pickTurn: 0,
          },
          playerInfo: {
            name: '가나다라마바사아',
            tier: Rank.BRONZE,
            division: 2,
            summonerId: 0,
            accountId: 0,
            puuid: '',
            position: ''
          },
          isMe: false,
        },
        {
          pickInfo: {
            actorCellId: 0,
            championId: 8,
            completed: true,
            isInProgress: false,
            isAllyAction: true,
            id: 0,
            pickTurn: 0,
          },
          playerInfo: {
            name: '테스트 닉네임 3',
            tier: Rank.SILVER,
            division: 3,
            summonerId: 0,
            accountId: 0,
            puuid: '',
            position: 'MID'
          },
          isMe: false,
        },
        {
          pickInfo: {
            actorCellId: 0,
            championId: 9,
            completed: false,
            isInProgress: false,
            isAllyAction: true,
            id: 0,
            pickTurn: 0,
          },
          playerInfo: {
            name: '대충닉네임4',
            tier: Rank.GOLD,
            division: 4,
            summonerId: 0,
            accountId: 0,
            puuid: '',
            position: 'BOTTOM'
          },
          isMe: false,
        },
        {
          pickInfo: {
            actorCellId: 0,
            championId: 10,
            completed: true,
            isInProgress: true,
            isAllyAction: true,
            id: 0,
            pickTurn: 0,
          },
          playerInfo: {
            name: '대충닉네임5',
            tier: Rank.NONE,
            division: 0,
            summonerId: 0,
            accountId: 0,
            puuid: '',
            position: 'UTILITY'
          },
          isMe: false,
        },
      ],
    },
    theirTeam: {
      ban: [11, 12, 13, 14],
      pick: [
        {
          pickInfo: {
            championId: 16,
            actorCellId: 0,
            completed: true,
            isInProgress: false,
            isAllyAction: false,
            id: 0,
            pickTurn: 0,
          },
        },
        {
          pickInfo: {
            championId: 17,
            actorCellId: 0,
            completed: true,
            isInProgress: false,
            isAllyAction: false,
            id: 0,
            pickTurn: 0,
          },
        },
        {
          pickInfo: {
            championId: 18,
            actorCellId: 0,
            completed: true,
            isInProgress: false,
            isAllyAction: false,
            id: 0,
            pickTurn: 0,
          },
        },
        {
          pickInfo: {
            championId: 0,
            actorCellId: 0,
            completed: false,
            isInProgress: true,
            isAllyAction: false,
            id: 0,
            pickTurn: 0,
          },
        },
        {
          pickInfo: {
            championId: 0,
            actorCellId: 0,
            completed: false,
            isInProgress: false,
            isAllyAction: false,
            id: 0,
            pickTurn: 0,
          },
        },
      ],
    },
  },
  ChampRecommendInfo: {
    good: [21, 22, 4, 24, 25],
    bad: [26, 27, 28, 29, 30],
  },
  Me: {
    actorCellId: 0,
    championId: 6,
    completed: true,
    isInProgress: false,
    isAllyAction: true,
    id: 0,
    pickTurn: 0,
  },
  selectChampion: (n) => console.log(n),
  lockIn: () => console.log('lockin'),
  endTime: 100,
};
export default DummyData;
