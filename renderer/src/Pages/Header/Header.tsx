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
