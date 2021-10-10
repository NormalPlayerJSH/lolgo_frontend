/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { MatchInfoI } from '../../types/props';
import { getChampionImage, getPerksImage, getSpellImage } from '../../Meta/DataDragon';
import styles from './HistoryEach.module.css';

export default function HistoryEach(props:{
  matchInfo: MatchInfoI, matchOnClick:(gameId:number)=>void}) {
  const { matchInfo, matchOnClick } = props;
  const getGameType = () => {
    if (matchInfo.gameType === 'CUSTOM_GAME') return '사용자 설정';
    switch (matchInfo.queueId) {
      case 430:
        return '일반게임';
      case 420:
        return '솔랭/듀오';
      case 440:
        return '자유랭크';
      case 450:
        return '무작위 총력전';
      default:
        switch (matchInfo.gameMode) {
          case 'TUTORIAL':
            return '튜토리얼';
          case 'URF':
            return 'URF';
          case 'ULTBOOK':
            return '궁극기 주문서';
          default:
            return '일반게임';
        }
    }
  };

  const getCSInfo = () => {
    const CSPerMin = ((matchInfo.creepScore / matchInfo.duration) * 60).toFixed(1);
    return `CS ${matchInfo.creepScore}(${CSPerMin})`;
  };

  const getDurationInfo = () => {
    const durationMinute = (matchInfo.duration / 60).toFixed();
    const durationSeconds = matchInfo.duration % 60;
    return `${durationMinute}분 ${durationSeconds}초`;
  };

  const getPlayTimeInfo = () => {
    const { playDate } = matchInfo;
    const delta = Date.now() - playDate;
    const minute = delta / (1000 * 60);
    const hour = minute / 60;
    const day = hour / 24;
    const month = day / 30;
    const year = month / 12;
    if (year >= 1) return `${year.toFixed()}년 전`;
    if (month >= 1) return `${month.toFixed()}개월 전`;
    if (day >= 1) return `${day.toFixed()}일 전`;
    if (hour >= 1) return `${hour.toFixed()}시간 전`;
    if (minute >= 1) return `${minute.toFixed()}분 전`;
    return '1분 전';
  };

  return (
    <div
      id={styles.historyDiv}
      onClick={(e) => { matchOnClick(matchInfo.gameId); }}
    >
      <div id={styles.historyInner}>
        <div id={styles.resultNType}>
          <div id={styles.type}>{getGameType()}</div>
          <div
            id={styles.result}
            className={
            matchInfo.isWin ? styles.win : styles.lose
          }
          >
            {matchInfo.isWin ? '승' : '패'}
          </div>
        </div>
        <div id={styles.champImg}>
          <img src={getChampionImage(matchInfo.championId)} alt="" />
        </div>
        <div id={styles.kdaInner}>
          <div id={styles.kda}>
            {`${matchInfo.kill}/${matchInfo.death}/${matchInfo.assist}`}
          </div>
        </div>
        <div id={styles.spellNPerks}>
          <div className={styles.spellNPerksLine}>
            <div className={styles.spellPerk}>
              <img src={getSpellImage(matchInfo.spell1)} alt="" />
            </div>
            <div className={styles.spellPerk}>
              <img src={getSpellImage(matchInfo.spell2)} alt="" />
            </div>
          </div>
          <div className={styles.spellNPerksLine}>
            <div className={styles.spellPerk}>
              <img src={getPerksImage(matchInfo.perk1)} alt="" />
            </div>
            <div id={styles.perk2} className={styles.spellPerk}>
              <img src={getPerksImage(matchInfo.perk2)} alt="" />
            </div>
          </div>
        </div>
        <div id={styles.stat}>
          <div id={styles.level}>{`레벨 ${matchInfo.level}`}</div>
          <div id={styles.CS}>{getCSInfo()}</div>
        </div>
        <div id={styles.time}>
          <div id={styles.before}>{getPlayTimeInfo()}</div>
          <div id={styles.duration}>{getDurationInfo()}</div>
        </div>
      </div>
    </div>
  );
}
