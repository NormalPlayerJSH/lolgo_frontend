import React from 'react';
import styles from './EventAlert.module.css';
import {
  EachEliteData, EachInfoData, EachKillData, EachPlayersData, EachTowerData, TeamType,
} from '../../types/analyInterface';
import { getChampionImage } from '../../Meta/DataDragon';
import BlueBlank from '../../Meta/blueBlank.png';
import RedBlank from '../../Meta/redBlank.png';
import getIcon from '../../Meta/icons';

const imgToIcon = (src:string) => <img src={src} className={styles.iconImg} alt="" />;

const {
  baronIcon, heraldIcon, towerIcon, dragonIcon, inhibitorIcon, killIcon,
} = getIcon('40rem');

function EventAlert(props: {
  data:EachKillData|EachEliteData|EachTowerData,
  info: EachPlayersData<EachInfoData>
}) {
  const { data, info } = props;
  let team:TeamType = 100;
  let left = <></>;
  let right = <></>;
  if ('victimId' in data) {
    const leftChampion = info[data.killerId].championId;
    const rightChampion = info[data.victimId].championId;
    left = imgToIcon(getChampionImage(leftChampion));
    right = imgToIcon(getChampionImage(rightChampion));
    team = info[data.killerId].teamId;
  } else if ('towerType' in data) {
    const { teamId, towerType } = data;
    team = teamId === 100 ? 200 : 100;
    left = imgToIcon(teamId === 100 ? RedBlank : BlueBlank);
    right = towerType === 'INHIBITOR_BUILDING' ? inhibitorIcon(teamId) : towerIcon(teamId);
  } else {
    const { monsterType, killerId } = data;
    const leftChampion = info[killerId].championId;
    left = imgToIcon(getChampionImage(leftChampion));
    team = info[killerId].teamId;
    if (monsterType === 'BARON_NASHOR') right = baronIcon();
    else if (monsterType === 'RIFTHERALD') right = heraldIcon();
    else right = dragonIcon(monsterType);
  }
  return (
    <div className={styles.eventAlertDiv}>
      {left}
      {killIcon(team)}
      {right}
    </div>
  );
}

export default EventAlert;
