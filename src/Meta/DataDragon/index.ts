import { currentVersion } from './CurrentVersion';
import { ChampMeta } from '../ChampMeta';
import { SpellMeta } from '../SpellMeta';
import { PerksMeta } from '../PerksMeta';
import { PerksImage } from './PerksImage';
import EmptyImage from '../empty.png';

export const getProfileIcon = (profileIconId:number) => `http://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/profileicon/${profileIconId}.png`;

export const getChampionImage = (key:number) => {
  if (ChampMeta[key].id && ChampMeta[key].id !== 'None') return `http://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/champion/${ChampMeta[key].id}.png`;
  return EmptyImage;
};

export const getSpellImage = (key:number) => `http://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/spell/${SpellMeta[key].id}.png`;

export const getPerksImage = (id:number) => PerksImage[PerksMeta[id].key];

export const getItemImage = (itemId:number) => {
  if (itemId === 0) return EmptyImage;
  return `http://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/item/${itemId}.png`;
};

export default {
  getProfileIcon,
  getChampionImage,
  getItemImage,
  getSpellImage,
};
