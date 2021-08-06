import { currentVersion } from './CurrentVersion';
import { ChampMeta } from '../ChampMeta';
import { SpellMeta } from '../SpellMeta';
import { PerksMeta } from '../PerksMeta';
import { PerksImage } from './PerksImage';

export const getProfileIcon = (profileIconId:number) => `http://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/profileicon/${profileIconId}.png`;

export const getChampionImage = (key:number) => `http://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/champion/${ChampMeta[key].id}.png`;

export const getSpellImage = (key:number) => `http://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/spell/${SpellMeta[key].id}.png`;

export const getPerksImage = (id:number) => PerksImage[PerksMeta[id].key];

export default {
  getProfileIcon,
  getChampionImage,
  getSpellImage,
};
