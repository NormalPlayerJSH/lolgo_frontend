import React from 'react';
import styles from './Header.css';
import { logoInline } from '../../Meta/logo';

export default function Header() {
  return (
    <div id={styles.headerDiv}>
      <div id={styles.headerInner}>
        <img src={logoInline} alt="" id={styles.headerLogo} />
      </div>
    </div>
  );
}
