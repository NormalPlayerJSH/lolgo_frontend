/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ChampPick from './ChampPick';
import { getChampionImage } from '../../Meta/DataDragon';
import { ChampSelectProps } from '../../types/props';
import styles from './ChampSelectDesign.module.css';
import { ChampMeta } from '../../Meta/ChampMeta';

const getBansComp = (banLis: number[]) => [0, 1, 2, 3, 4].map((idx) => {
  let url = '';
  if (banLis[idx]) url = getChampionImage(banLis[idx]);
  else url = getChampionImage(0);
  return (
    <div className={styles.banDiv}>
      <img src={url} alt="" className={styles.banImg} />
    </div>
  );
});

const getRecommendsComp = (
  lis: number[],
  selectChampion: (championId: number) => void,
) => lis.map((championId) => (
  <div
    className={styles.oneRecommend}
    onClick={() => selectChampion(championId)}
  >
    <img
      src={getChampionImage(championId)}
      alt=""
      className={styles.recommendImg}
    />
    <div className={styles.recommendBG}>
      <div className={styles.recommendName}>{ChampMeta[championId].name}</div>
    </div>
  </div>
));

export default function ChampSelectDesign(props: ChampSelectProps) {
  const {
    ChampRecommendInfo,
    BanPickPlayerInfo,
    Me,
    lockIn,
    selectChampion,
    endTime,
  } = props;
  const { good, bad } = ChampRecommendInfo;
  const { myTeam, theirTeam } = BanPickPlayerInfo;
  const { ban: myTeamBan, pick: myTeamPick } = myTeam;
  const { ban: theirTeamBan, pick: theirTeamPick } = theirTeam;
  const getMyStatusClass = () => {
    if (Me.isInProgress) return styles.doing;
    return styles.notDoing;
  };
  const getTimeRemain = () => {
    const remainTime = (endTime - Date.now()) / 1000;
    if (remainTime > 0) return remainTime.toFixed();
    return '0';
  };
  const LockInOnClick = () => {
    if (Me.isInProgress) {
      lockIn();
    }
  };
  const SelectChampionOnClick = (championId: number) => {
    if (Me.isInProgress) {
      selectChampion(championId);
    }
  };
  return (
    <div id={styles.ChampSelectDiv} className={getMyStatusClass()}>
      <div id={styles.ChampSelectInner}>
        <div id={styles.top}>
          <div id={styles.ourBanDiv} className={styles.bansDiv}>
            {getBansComp(myTeamBan)}
          </div>
          <div id={styles.timerDiv}>
            <div id={styles.timerText}>{getTimeRemain()}</div>
          </div>
          <div id={styles.theirBanDiv} className={styles.bansDiv}>
            {getBansComp(theirTeamBan)}
          </div>
        </div>
        <div id={styles.mid}>
          <div id={styles.ourPickDiv} className={styles.pickDiv}>
            {myTeamPick.map((oneInfo) => (
              <ChampPick {...oneInfo} isAlly />
            ))}
          </div>
          <div id={styles.recommend}>
            <div id={styles.bestPick} className={styles.recommends}>
              <div id={styles.bestText} className={styles.recommendText}>
                BEST
              </div>
              <div id={styles.bestPickDiv} className={styles.recommendDiv}>
                {getRecommendsComp(good, SelectChampionOnClick)}
              </div>
            </div>
            <div id={styles.recommendLine} />
            <div id={styles.worstPick} className={styles.recommends}>
              <div id={styles.worstText} className={styles.recommendText}>
                WORST
              </div>
              <div id={styles.worstPickDiv} className={styles.recommendDiv}>
                {getRecommendsComp(bad, SelectChampionOnClick)}
              </div>
            </div>
          </div>
          <div id={styles.theirPickDiv} className={styles.pickDiv}>
            {theirTeamPick.map((oneInfo, idx) => (
              <ChampPick {...oneInfo} isAlly={false} index={idx} />
            ))}
          </div>
        </div>
        <div id={styles.bot}>
          <div id={styles.selectImgDiv}>
            <img
              src={getChampionImage(Me.championId)}
              alt=""
              id={styles.selectImg}
            />
          </div>
          <div id={styles.selectBtn} onClick={LockInOnClick}>
            <div id={styles.selectText}>선택 완료</div>
          </div>
        </div>
      </div>
    </div>
  );
}
