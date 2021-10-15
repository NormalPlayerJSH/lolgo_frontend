import React, { useEffect } from 'react';
import styles from './Header.module.css';
import { logoInline } from '../../Meta/logo';
import { LCUEvents } from '../../types/enum';

export default function Header() {
  return (
    <div id={styles.headerDiv}>
      <div id={styles.headerInner}>
        <img src={logoInline} alt="" id={styles.headerLogo} />
      </div>
      <div className={styles.controllerDiv}>
        <div className={styles.controllerButton} onClick={()=>{window.location.reload()}}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><path d="M0 0h24v24H0V0z" fill="none"/><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>
        </div>
        <div className={styles.controllerButton} onClick={()=>{window.require('electron').ipcRenderer.send(LCUEvents.WindowMinimize)}}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6 19h12v2H6v-2z"/></svg>
        </div>
        <div className={styles.controllerButton} onClick={()=>{window.require('electron').ipcRenderer.send(LCUEvents.WindowClose)}}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
        </div>
      </div>

    </div>
  );
}
