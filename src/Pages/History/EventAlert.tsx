import React from 'react';
import styles from './EventAlert.module.css';
import {
  EachEliteData, EachInfoData, EachKillData, EachPlayersData, EachTowerData, TeamType,
} from '../../types/analyInterface';
import { getChampionImage } from '../../Meta/DataDragon';
import BlueBlank from '../../Meta/blueBlank.png';
import RedBlank from '../../Meta/redBlank.png';
import Empty from '../../Meta/empty.png';

const towerIcon = BlueBlank;
const dragonIcon = RedBlank;
const baronIcon = Empty;
const inhibitorIcon = getChampionImage(1);
const heraldIcon = getChampionImage(2);

const KillIcon = (team:TeamType) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="40rem" height="40rem" viewBox="0 0 24 24" fill={`${team === 100 ? '#425cea' : '#ba5657'}`}>
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" />
  </svg>
);

function EventAlert(props: {
  data:EachKillData|EachEliteData|EachTowerData,
  info: EachPlayersData<EachInfoData>
}) {
  const { data, info } = props;
  let team:TeamType = 100;
  let left = '';
  let right = '';
  if ('victimId' in data) {
    const leftChampion = info[data.killerId].championId;
    const rightChampion = info[data.victimId].championId;
    left = getChampionImage(leftChampion);
    right = getChampionImage(rightChampion);
    team = info[data.killerId].teamId;
  } else if ('towerType' in data) {
    const { teamId, towerType } = data;
    team = teamId === 100 ? 200 : 100;
    left = teamId === 100 ? RedBlank : BlueBlank;
    right = towerType === 'INHIBITOR_BUILDING' ? inhibitorIcon : towerIcon;
  } else {
    const { monsterType, killerId } = data;
    const leftChampion = info[killerId].championId;
    left = getChampionImage(leftChampion);
    if (monsterType === 'BARON_NASHOR') right = baronIcon;
    else if (monsterType === 'RIFTHERALD') right = heraldIcon;
    else right = dragonIcon;
  }
  return (
    <div className={styles.eventAlertDiv}>
      <img src={left} className={styles.iconImg} alt="" />
      {KillIcon(team)}
      <img src={right} className={styles.iconImg} alt="" />
    </div>
  );
}

export default EventAlert;
