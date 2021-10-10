/* eslint-disable react/require-default-props */
import React from 'react';
import { ChampMeta } from '../../Meta/ChampMeta';
import { getChampionImage } from '../../Meta/DataDragon';
import { Rank } from '../../types/enum';
import { PickInfoI, UserInfoI } from '../../types/props';
import styles from './ChampPick.module.css';

export default function ChampPick(props:{
  pickInfo: PickInfoI,
  playerInfo?: UserInfoI,
  isAlly: boolean,
  isMe?: boolean,
  index?: number
}) {
  const {
    pickInfo, playerInfo, isAlly, isMe, index,
  } = props;
  const getClassName = () => {
    if (isAlly) return styles.allyPick;
    return styles.enemyPick;
  };
  const getName = () => {
    if (isAlly) {
      return playerInfo?.name;
    }
    return `${(index as number) + 1}번 소환사`;
  };
  const getNameClass = () => {
    if (isMe) return styles.bold;
    return styles.normal;
  };
  const getChampionName = () => {
    if (pickInfo.isInProgress) {
      return '선택 중...';
    }
    return ChampMeta[pickInfo.championId].name;
  };
  const getChampionClass = () => {
    if (pickInfo.completed || pickInfo.isInProgress) return styles.show;
    return styles.dontShow;
  };
  const getTier = () => {
    if (!isAlly) return '';
    if (playerInfo?.tier === Rank.NONE) return '';
    return `${Rank[(playerInfo?.tier) as Rank].charAt(0)}${playerInfo?.division}`;
  };
  const getDoingClass = () => {
    if (pickInfo.isInProgress) return styles.doing;
    return styles.notDoing;
  };
  return (
    <div id={styles.ChampPickDiv} className={getClassName()}>
      <div id={styles.ChampImgDiv}>
        <img src={getChampionImage(pickInfo.championId)} alt="" id={styles.ChampImg} />
      </div>
      <div id={styles.name}>
        <div id={styles.nick} className={getNameClass()}>{getName()}</div>
        <div id={styles.champName} className={getChampionClass()}>{getChampionName()}</div>
      </div>
      <div id={styles.tier}>
        {getTier()}
      </div>
      <div id={styles.doingBar} className={getDoingClass()} />
    </div>
  );
}
