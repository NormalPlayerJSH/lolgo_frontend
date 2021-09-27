import React from 'react';
import styles from './NeedLoL.module.css';
import { logoFull } from '../../Meta/logo';

export default function NeedLoL() {
  return (
    <div id={styles.needLolDiv}>
      <div id={styles.needLolInner}>
        <img src={logoFull} alt="" id={styles.needLolLogo} />
        <div id={styles.needLolEmpty} />
        <div id={styles.needLolText}>
          리그 오브 레전드를
          실행해주세요
        </div>
        <div id={styles.needLolEmpty} />
      </div>
    </div>
  );
}
