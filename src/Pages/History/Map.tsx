import React from 'react';
import styles from './Map.module.css';
import mapImg from '../../Meta/map.png';

function Map() {
  return (
    <div className={styles.fullDiv}>
      <div className={styles.squareDiv}>
        <img src={mapImg} alt="" className={styles.mapImg} />
      </div>
    </div>
  );
}

export default Map;
