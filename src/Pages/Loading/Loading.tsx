import React from 'react';
import Loader from 'react-loader-spinner';
import styles from './Loading.module.css';
import { logoFull } from '../../Meta/logo';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export default function Loading() {
  return (
    <div id={styles.loadingDiv}>
      <div id={styles.loadingInner}>
        <img src={logoFull} alt="" id={styles.loadingLogo} />
        <Loader
          type="Grid"
          color="#FFFFFF"
          width="150rem"
          height="300rem"
        />
      </div>
    </div>
  );
}
