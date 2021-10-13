import React, { useEffect } from 'react';
import HistoryEach from './HistoryEach';
import { MainProps, MatchInfoI } from '../../types/props';
import { Rank } from '../../types/enum';
import { getProfileIcon } from '../../Meta/DataDragon';
import styles from './MainDesign.module.css';

export default function MainDesign(props:MainProps) {
  useEffect(() => {
    (document.getElementById('mainAd') as Element).innerHTML=`
    <ins class="kakao_ad_area" style="display:none;"
 data-ad-unit    = "DAN-qU8CTiIWPiiLnM7f"
 data-ad-width   = "250"
 data-ad-height  = "250"></ins>
    `;
    let scr = document.createElement('script');
    scr.type='text/javascript';
    scr.async=true;
    scr.src="//t1.daumcdn.net/kas/static/ba.min.js";
    (document.getElementById('mainAd') as Element).appendChild(scr)
  }, [])
  const {
    setHistoryId, userInfo, profileIconId, matchInfo,
    totalKill, totalDeath, totalAssist, totalWin, totalLose,
  } = props;
  const rankInfo = () => {
    if (userInfo.tier === Rank.NONE) return '';
    return `${Rank[userInfo.tier]} ${userInfo.division}`;
  };
  const getKDA = () => {
    if (totalDeath === 0) return '-';
    return ((totalKill + totalAssist) / totalDeath).toFixed(2);
  };
  const getKDAExplain = () => {
    const totalGame = totalWin + totalLose;
    if (totalGame === 0) return '자료 없음';
    const avgKill = (totalKill / totalGame).toFixed(1);
    const avgDeath = (totalDeath / totalGame).toFixed(1);
    const avgAssist = (totalAssist / totalGame).toFixed(1);
    return `${avgKill}/${avgDeath}/${avgAssist}`;
  };
  const getRate = () => {
    const totalGame = totalWin + totalLose;
    if (totalGame === 0) return '-';
    const ratePercent = ((totalWin / totalGame) * 100).toFixed();
    return `${ratePercent}%`;
  };
  const getRateExplain = () => `${totalWin}W ${totalLose}L`;

  return (
    <div id={styles.mainDiv}>
      <div id={styles.mainInner}>
        <div id={styles.mainProfile}>
          <img src={getProfileIcon(profileIconId)} alt="" id={styles.mainProfileIcon} />
          <div id={styles.mainNames}>
            <div id={styles.mainName}>{userInfo.name}</div>
            <div id={styles.mainRank}>{rankInfo()}</div>
          </div>
        </div>
        <div id={styles.mainHistoryDiv}>
          <div id={styles.mainHistoriesDiv}>
            {
              matchInfo.map(
                (match:MatchInfoI) => (
                  <HistoryEach
                    matchInfo={match}
                    matchOnClick={setHistoryId}
                    key={match.gameId}
                  />
                ),
              )
            }
          </div>
          <div className={styles.mainRightWrapper}>
            <div id={styles.mainHistoryTotalDiv}>
              <div id={styles.totalInner}>
                <div id={styles.kda}>
                  <div className={styles.totalName}>평점</div>
                  <div id={styles.kdaData} className={styles.totalData}>{getKDA()}</div>
                  <div className={styles.totalExplain}>{getKDAExplain()}</div>
                </div>
                <div id={styles.rate}>
                  <div className={styles.totalName}>승률</div>
                  <div id={styles.rateData} className={styles.totalData}>{getRate()}</div>
                  <div className={styles.totalExplain}>{getRateExplain()}</div>
                </div>
              </div>
            </div>
            <div className={styles.mainAdDiv} id="mainAd">
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
