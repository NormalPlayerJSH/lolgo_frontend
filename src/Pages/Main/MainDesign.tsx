import React from 'react';
import { MainProps } from '../../types/props';

export default function MainDesign(props:MainProps) {
  const {
    userInfo,
    profileIconId,
    matchInfo,
    totalKill,
    totalDeath,
    totalAssist,
    totalWin,
    totalLose,
  } = props;
  return (
    <div style={{ fontSize: '20rem' }}>
      {JSON.stringify(props)}
      {JSON.stringify(userInfo)}
    </div>
  );
}
