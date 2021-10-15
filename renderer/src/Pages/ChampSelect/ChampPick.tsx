/* eslint-disable react/require-default-props */
import React from 'react';
import { ChampMeta } from '../../Meta/ChampMeta';
import { getChampionImage } from '../../Meta/DataDragon';
import { Rank } from '../../types/enum';
import { ChampSelectOurTeamUserInfoI, PickInfoI, UserInfoI } from '../../types/props';
import styles from './ChampPick.module.css';

const positionName: {[position:string]: string} = {
  'TOP': '탑',
  'JUNGLE': '정글',
  'MIDDLE': '미드',
  'BOTTOM': '원딜',
  'UTILITY': '서포터'
}

export default function ChampPick(props:{
  pickInfo: PickInfoI,
  playerInfo: ChampSelectOurTeamUserInfoI,
  isMe: boolean
}|{
  pickInfo: PickInfoI,
  index: number
}) {
  const { pickInfo } = props;
  const isAlly = 'playerInfo' in props
  const getClassName = () => {
    if (isAlly) return styles.allyPick;
    return styles.enemyPick;
  };
  const getName = () => {
    if (isAlly) {
      return props.playerInfo.name;
    }
    return `${(props.index as number) + 1}번 소환사`;
  };
  const getNameClass = () => {
    if (isAlly && props.isMe) return styles.bold;
    return styles.normal;
  };
  const getChampionName = () => {
    if (pickInfo.completed || pickInfo.isInProgress){
      if (pickInfo.isInProgress) {
        return '선택 중...';
      }
      return ChampMeta[pickInfo.championId].name;
    } return ''
  };
  const getChampionClass = () => {
    if (pickInfo.completed || pickInfo.isInProgress) return styles.show;
    return styles.show;
  };
  const getPositionChampionName = () => {
    // if(isAlly) console.log(props.playerInfo.position)
    const champName = getChampionName();
    if (isAlly && props.playerInfo.position in positionName) {
      if(champName==='') return positionName[props.playerInfo.position]
      return `${positionName[props.playerInfo.position]} - ${champName}`
    }
    return champName
  }
  const getTier = () => {
    if (!isAlly) return '';
    if (props.playerInfo.tier === Rank.NONE) return '';
    return `${Rank[(props.playerInfo.tier) as Rank].charAt(0)}${props.playerInfo.division}`;
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
        <div id={styles.champName} className={getChampionClass()}>{getPositionChampionName()}</div>
      </div>
      <div id={styles.tier}>
        {getTier()}
      </div>
      <div id={styles.doingBar} className={getDoingClass()} />
    </div>
  );
}
