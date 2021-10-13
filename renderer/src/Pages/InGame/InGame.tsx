import React, { useEffect } from 'react';
import styles from './InGame.module.css';
import { logoFull } from '../../Meta/logo';

export default function NeedLoL() {
  useEffect(() => {
    (document.getElementById('ingameAdDiv') as Element).innerHTML=`
    <ins class="kakao_ad_area" style="display:none;"
 data-ad-unit    = "DAN-TfCWcyh1QJIbPTs7"
 data-ad-width   = "728"
 data-ad-height  = "90"></ins>
    `;
    let scr = document.createElement('script');
    scr.type='text/javascript';
    scr.async=true;
    scr.src="//t1.daumcdn.net/kas/static/ba.min.js";
    (document.getElementById('ingameAdDiv') as Element).appendChild(scr)
  }, [])
  return (
    <div id={styles.needLolDiv}>
      <div id={styles.needLolInner}>
        <img src={logoFull} alt="" id={styles.needLolLogo} />
        <div id={styles.needLolEmpty} />
        <div id={styles.needLolText}>
          게임 플레이 중...
        </div>
        <div id={styles.needLolEmpty} />
        <div className={styles.ingameAdDiv} id="ingameAdDiv"></div>
      </div>
    </div>
  );
}
