import React from 'react';
import styles from './TeamInfo.module.css';
import { AnalyInterface, EachKdaData, TeamType } from '../../types/analyInterface';
import { TrinketItemList } from '../../Meta/ItemMeta';
import { getChampionImage, getItemImage } from '../../Meta/DataDragon';

function getEditedItemList(itemList:number[]) {
  let trinketItem = 0;
  const listSet = new Set(itemList);
  listSet.forEach((item) => {
    if (TrinketItemList[item]) trinketItem = item;
  });
  if (trinketItem !== 0) listSet.delete(trinketItem);
  const normalList = [...listSet, 0, 0, 0, 0, 0, 0]
    .slice(0, 6) as [number, number, number, number, number, number];
  return {
    normalList,
    trinketItem,
  };
}

function EachItem(props: {itemId: number}) {
  const { itemId } = props;
  return (
    <img src={getItemImage(itemId)} alt="" className={styles.eachItemImg} />
  );
}

function PlayerInfo(props: {
  itemData: {
    normalList: [number, number, number, number, number, number]
    trinketItem: number
  }
  championId: number
  kdaInfo: EachKdaData,
  gold: number
}) {
  const {
    itemData, championId, kdaInfo, gold,
  } = props;
  const { normalList, trinketItem } = itemData;
  return (
    <div className={styles.eachPlayerDiv}>
      <div className={styles.playerChampImg}>
        <div className={styles.playerChampImgInner}>
          <img src={getChampionImage(championId)} alt="" className={styles.playerChampImgImg} />
        </div>
      </div>
      <div className={styles.playerOthers}>
        <div className={styles.playerKDA}>
          <div>{`${kdaInfo.k}/${kdaInfo.d}/${kdaInfo.a}`}</div>
        </div>
        <div className={styles.playerItems}>
          <div className={styles.normalItems}>
            <div className={`${styles.normalItemsOneLine} ${styles.itemTop}`}>
              {[0, 1, 2].map((num) => (
                <EachItem itemId={normalList[num]} />
              ))}
            </div>
            <div className={`${styles.normalItemsOneLine} ${styles.itemBottom}`}>
              {[3, 4, 5].map((num) => (
                <EachItem itemId={normalList[num]} />
              ))}
            </div>
          </div>
          <div className={styles.trinketItem}>
            <EachItem itemId={trinketItem} />
          </div>
        </div>
        <div className={styles.playerGold}>
          <div>{`${gold.toLocaleString()} G`}</div>
        </div>
      </div>
    </div>
  );
}

function TeamInfo(props: {
  data: AnalyInterface;
  team: TeamType;
  frame: number;
}) {
  const { data, team, frame: tempFrame } = props;
  const frame = tempFrame === -1 ? data.totFrame : tempFrame;
  const isWin = team === data.win;
  return (
    <div className={styles.fullDiv}>
      <div className={styles.teamDiv}>
        <div className={`${styles.winOrLose} ${isWin ? styles.win : styles.lose}`}>{isWin ? '승리' : '패배'}</div>
        <div className={styles.teamSide}>{team === 100 ? '블루팀' : '레드팀'}</div>
      </div>
      <div className={styles.playerDiv}>
        {Object.keys(data.participantInfo).map((k) => {
          const key: number = k as unknown as number;
          const { championId, teamId } = data.participantInfo[key as unknown as number];
          // console.log({ teamId, team });
          if (teamId === team) {
            return (
              <PlayerInfo
                itemData={getEditedItemList(data.itemData[frame][key])}
                championId={championId}
                kdaInfo={data.kdaData[frame][key]}
                gold={data.goldData[frame][key]}
              />
            );
          }
          return <></>;
        })}
      </div>
    </div>
  );
}

export default TeamInfo;
