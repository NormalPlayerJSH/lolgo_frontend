import React from 'react';
import { ChampPickedProps } from '../../types/props';
import { ChampMeta } from '../../Meta/ChampMeta';

export default function ChampPicked(props:ChampPickedProps) {
  const {
    pickInfo, userInfo,
  } = props;
  const { isAllyAction, isInProgress, championId } = pickInfo;
  let name; let tier; let division;
  if (isAllyAction) {
    name = userInfo?.name;
    tier = userInfo?.tier;
    division = userInfo?.division;
  } else {
    name = '상대 팀 플레이어';
  }
  if (name === '') {
    name = '알 수 없음';
  }
  return (
    <div>
      <div>
        {ChampMeta[championId].name}
      </div>
      <div>
        {name}
      </div>
      <div>
        {isInProgress ? '선택중' : ''}
      </div>
    </div>
  );
}
