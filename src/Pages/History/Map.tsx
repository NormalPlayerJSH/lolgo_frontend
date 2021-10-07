import React from 'react';
import styles from './Map.module.css';
import mapImg from '../../Meta/map.png';
import {
  AnalyInterface, EachKillData, FramesData, TeamType,
} from '../../types/analyInterface';

const mapFullSize = 15000;
const squareLength = 404;
const halfDotLength = 5;

function DotOnMap(props: {
  killData: EachKillData
  team:TeamType
  type:'before'|'now'
}) {
  const { killData, team, type } = props;
  const { x, y } = killData;
  const left = (squareLength * (x / mapFullSize)) - halfDotLength;
  const bottom = (squareLength * (y / mapFullSize)) - halfDotLength;
  return (
    <div
      className={`${styles.dotOnMap} ${type === 'now' ? styles.dotNow : styles.dotBefore}`}
      style={{
        left: `${left}rem`,
        bottom: `${bottom}rem`,
        width: `${halfDotLength * 2}rem`,
        height: `${halfDotLength * 2}rem`,
        background: team === 100 ? 'blue' : 'red',
      }}
    />
  );
}

function Map(props:{
  data: AnalyInterface,
  frame: number
  beforeKillData: FramesData<EachKillData[]>
}) {
  const { data, frame, beforeKillData } = props;
  return (
    <div className={styles.fullDiv}>
      <div className={`${styles.squareDiv} ${frame === -1 ? styles.allDot : ''}`} style={{ width: `${squareLength}rem`, height: `${squareLength}rem` }}>
        <img src={mapImg} alt="" className={styles.mapImg} />
        {data.killData[frame].map(
          (eachData) => (
            <DotOnMap
              killData={eachData}
              team={data.participantInfo[eachData.killerId].teamId}
              type="now"
            />
          ),
        )}
        {
          beforeKillData[frame].map(
            (eachData) => (
              <DotOnMap
                killData={eachData}
                team={data.participantInfo[eachData.killerId].teamId}
                type="before"
              />
            ),
          )
        }
      </div>
    </div>
  );
}

export default Map;
