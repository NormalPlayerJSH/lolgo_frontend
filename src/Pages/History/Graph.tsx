import React from 'react';
import {
  AreaChart, Area, Tooltip, ResponsiveContainer,
} from 'recharts';
import { AnalyInterface } from '../../types/analyInterface';
import styles from './Graph.module.css';
import EventAlert from './EventAlert';

function Graph(props: {
  data: AnalyInterface,
  frame: number,
  changeFrame: React.Dispatch<React.SetStateAction<number>>
}) {
  const { data, frame, changeFrame } = props;
  const winRateData = data.winRate.slice(0, data.totFrame + 1).map((y, x) => {
    const value = (y - 0.5) * 100;
    return {
      name: `${x}분`,
      승률: value,
    };
  });
  const gradientOffset = () => {
    const dataMax = Math.max(...winRateData.map((i) => i.승률));
    const dataMin = Math.min(...winRateData.map((i) => i.승률));

    if (dataMax <= 0) {
      return 0;
    }
    if (dataMin >= 0) {
      return 1;
    }

    return dataMax / (dataMax - dataMin);
  };

  const off = gradientOffset();
  // const objectDivLis = [<></>]
  // let i = 1;
  // while (i <= data.totFrame){
  //   objectDivLis.push((
  //     <div className={styles.objectEachDiv}>

  //     </div>
  //   ))
  //   i+=1
  // }
  return (
    <div className={styles.fullDiv}>
      {/* <div className={styles.objectDiv}>
        {
           objectDivLis
        }
      </div> */}
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={winRateData}
        >
          <Tooltip
            content={
            (p) => {
              const { active, payload, label } = p;
              if (active) changeFrame(label);
              else changeFrame(-1);
              if (active && payload && payload[0]) {
                const winRate = payload[0].value as number;
                let text = '';
                if (winRate === 0) text = '동률';
                else text = winRate > 0 ? `블루팀이 ${winRate.toFixed(1)}% 유리` : `레드팀이 ${(-winRate).toFixed(1)}% 유리`;
                const isHighlight = data.highlightData.indexOf(label) !== -1;
                return (
                  <div className={`${styles.tooltip} ${isHighlight ? styles.highlight : ''}`}>
                    <div className={styles.tooltipText}>{`${label}분 - ${text}`}</div>
                    <div className={styles.tooltipEventDiv}>
                      {data.killData[frame].map(
                        (d) => <EventAlert data={d} info={data.participantInfo} />,
                      )}
                      {[...data.eliteData, ...data.towerDataFull].map(
                        (d) => {
                          const { timestamp } = d;
                          if (
                            (((label - 1) * 60 * 1000) < timestamp)
                            && (timestamp <= label * 60 * 1000)) {
                            return <EventAlert data={d} info={data.participantInfo} />;
                          }
                          return <></>;
                        },
                      )}
                    </div>
                  </div>
                );
              }
              return <></>;
            }
          }
          />
          <defs>
            <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset={off} stopColor="#425cea" stopOpacity={1} />
              <stop offset={off} stopColor="#ba5657" stopOpacity={1} />
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="승률" stroke="#e4e4e4" fill="url(#splitColor)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Graph;
