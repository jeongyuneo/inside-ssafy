import { MenuCardTypes } from '../../molecules/MenuCard/types';

export interface PropsTypes extends StyledMenuCardsType {
  menus?: MenuCardTypes[];
}

export interface StyledMenuCardsType {
  width?: number;
  height?: number;
  backgroundColor?: string;
  cardColor?: string;
}
