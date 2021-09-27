import React from 'react';
import styles from './InGame.module.css';
import { logoFull } from '../../Meta/logo';

export default function NeedLoL() {
  return (
    <div id={styles.needLolDiv}>
      <div id={styles.needLolInner}>
        <img src={logoFull} alt="" id={styles.needLolLogo} />
        <div id={styles.needLolEmpty} />
        <div id={styles.needLolText}>
          게임 플레이 중...
        </div>
        <div id={styles.needLolEmpty} />
      </div>
    </div>
  );
}
