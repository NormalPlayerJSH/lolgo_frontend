interface SpellData {
  key:string,
  id:string,
  name:string,
  description:string
}

export const SpellMeta:{[x:number]:SpellData} = {
  1: {
    key: '1',
    id: 'SummonerBoost',
    name: '정화',
    description: '챔피언에 걸린 모든 이동 불가와 (제압 및 공중으로 띄우는 효과 제외) 소환사 주문에 의한 해로운 효과를 제거하고 새로 적용되는 이동 불가 효과들의 지속시간을 3초간 65% 감소시킵니다.',
  },
  3: {
    key: '3',
    id: 'SummonerExhaust',
    name: '탈진',
    description: '적 챔피언을 지치게 만들어 3초 동안 이동 속도를 30% 느리게 하고 이 동안 가하는 피해량을 40% 낮춥니다.',
  },
  4: {
    key: '4',
    id: 'SummonerFlash',
    name: '점멸',
    description: '커서 방향으로 챔피언이 짧은 거리를 순간이동합니다.',
  },
  6: {
    key: '6',
    id: 'SummonerHaste',
    name: '유체화',
    description: '챔피언이 10초 동안 유닛과 충돌하지 않게 되며 챔피언 레벨에 따라 이동 속도가 24~48% 증가합니다. 처치 관여 시 유체화 지속시간이 늘어납니다.',
  },
  7: {
    key: '7',
    id: 'SummonerHeal',
    name: '회복',
    description: '자신과 대상 아군 챔피언의 체력을 90~345만큼 (챔피언 레벨에 따라 변동) 회복시키고 1초 동안 이동 속도가 30% 증가합니다. 최근 소환사 주문 회복의 영향을 받은 유닛의 경우 치유량이 절반만 적용됩니다.',
  },
  11: {
    key: '11',
    id: 'SummonerSmite',
    name: '강타',
    description: '대상 에픽 및 대형/중형 몬스터 또는 미니언에게 @SmiteBaseDamage@의 고정 피해를 입힙니다.',
  },
  12: {
    key: '12',
    id: 'SummonerTeleport',
    name: '순간이동',
    description: '4초 동안 정신을 집중한 다음, 챔피언이 지정한 아군 구조물, 미니언, 혹은 와드로 순간이동하고 이동 속도가 증가합니다. 순간이동의 재사용 대기시간은 챔피언 레벨에 따라 420~210초입니다.',
  },
  13: {
    key: '13',
    id: 'SummonerMana',
    name: '총명',
    description: '최대 마나량의 50%를 회복합니다. 주변 아군도 최대 마나량의 25%가 회복됩니다.',
  },
  14: {
    key: '14',
    id: 'SummonerDot',
    name: '점화',
    description: '적 챔피언을 불태워 5초 동안 70~410의 고정 피해(챔피언 레벨에 따라 변동)를 입히고 모습을 드러내며 치료 효과를 감소시킵니다.',
  },
  21: {
    key: '21',
    id: 'SummonerBarrier',
    name: '방어막',
    description: '2초 동안 방어막으로 감싸 피해를 115~455(챔피언 레벨에 따라 변동)만큼 흡수합니다.',
  },
  30: {
    key: '30',
    id: 'SummonerPoroRecall',
    name: '왕을 향해!',
    description: '포로 왕의 곁으로 빠르게 이동합니다.',
  },
  31: {
    key: '31',
    id: 'SummonerPoroThrow',
    name: '포로 던지기',
    description: '포로를 적에게 던집니다. 적이 맞으면 해당 적에게 빠르게 이동할 수 있습니다.',
  },
  32: {
    key: '32',
    id: 'SummonerSnowball',
    name: '표식',
    description: '적을 향해 직선으로 눈덩이를 던집니다. 눈덩이가 적을 맞히면 표식이 남아 절대 시야가 생기고, 표식이 붙은 대상을 향해 챔피언이 빠르게 이동할 수 있습니다.',
  },
  39: {
    key: '39',
    id: 'SummonerSnowURFSnowball_Mark',
    name: '표식',
    description: '적을 향해 직선으로 눈덩이를 던집니다. 눈덩이가 적을 맞히면 표식이 남아 절대 시야가 생기고, 표식이 붙은 대상을 향해 챔피언이 빠르게 이동할 수 있습니다.',
  },
  54: {
    key: '54',
    id: 'Summoner_UltBook_Placeholder',
    name: '게임 시작 후 결정',
    description: '',
  },
};

export default SpellMeta;
