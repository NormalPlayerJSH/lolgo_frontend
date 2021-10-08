import React from 'react';
import styles from './Map.module.css';
import mapImg from '../../Meta/map.png';
import {
  AnalyInterface, EachKillData, FramesData, EachEliteData, EachTowerData,
} from '../../types/analyInterface';
import { getIcons } from '../../Meta/icons';

const mapFullSize = 15000;
const squareLength = 404;
const halfDotLength = 5;
const halfObjectLength = 12;
const blueColor = '#425cea';
const redColor = '#ba5657';

const {
  towerIcon, baronIcon, heraldIcon, inhibitorIcon, dragonIcon,
} = getIcons(`${(halfObjectLength * 2) - 3}rem`);

function Map(props:{
  data: AnalyInterface,
  frame: number
  beforeKillData: FramesData<EachKillData[]>
}) {
  const { data, frame, beforeKillData } = props;

  function DotOnMap(p: {
    data: EachKillData|EachEliteData|EachTowerData
    type:'before'|'now'|'object'
  }) {
    const { data: d, type } = p;
    const typeToClass = {
      before: styles.dotBefore,
      now: styles.dotNow,
      object: styles.dotObject,
    };
    let halfLength = 0;
    let x = 0;
    let y = 0;
    let bgColor = 'white';
    let innerElement = <></>;
    if ('victimId' in d) {
      const team = data.participantInfo[d.killerId].teamId;
      halfLength = halfDotLength;
      x = d.x;
      y = d.y;
      bgColor = team === 100 ? blueColor : redColor;
    } else if ('towerType' in d) {
      halfLength = halfObjectLength;
      x = 7500;
      y = 7500;
      bgColor = d.teamId === 200 ? blueColor : redColor;
      innerElement = d.towerType === 'INHIBITOR_BUILDING' ? inhibitorIcon() : towerIcon();
    } else {
      halfLength = halfObjectLength;
      x = 7500;
      y = 7500;
      const tId = data.participantInfo[d.killerId].teamId;
      bgColor = tId === 100 ? blueColor : redColor;
      if (d.monsterType === 'BARON_NASHOR') innerElement = baronIcon(true);
      else if (d.monsterType === 'RIFTHERALD') innerElement = heraldIcon(true);
      else innerElement = dragonIcon();
    }

    const left = (squareLength * (x / mapFullSize)) - halfLength;
    const bottom = (squareLength * (y / mapFullSize)) - halfLength;
    return (
      <div
        className={`${styles.dotOnMap} ${typeToClass[type]}`}
        style={{
          left: `${left}rem`,
          bottom: `${bottom}rem`,
          width: `${halfLength * 2}rem`,
          height: `${halfLength * 2}rem`,
          background: `${bgColor}`,
        }}
      >
        {innerElement}
      </div>
    );
  }

  return (
    <div className={styles.fullDiv}>
      <div className={`${styles.squareDiv} ${frame === -1 ? styles.allDot : ''}`} style={{ width: `${squareLength}rem`, height: `${squareLength}rem` }}>
        <img src={mapImg} alt="" className={styles.mapImg} />
        {data.killData[frame].map(
          (eachData) => (
            <DotOnMap
              data={eachData}
              type="now"
            />
          ),
        )}
        {
          beforeKillData[frame].map(
            (eachData) => (
              <DotOnMap
                data={eachData}
                type="before"
              />
            ),
          )
        }
        {[...data.eliteData, ...data.towerDataFull].map(
          (d) => {
            const { timestamp } = d;
            if (
              (((frame - 1) * 60 * 1000) < timestamp)
                            && (timestamp <= frame * 60 * 1000)) {
              return <DotOnMap data={d} type="object" />;
            }
            return <></>;
          },
        )}
      </div>
    </div>
  );
}

export default Map;
