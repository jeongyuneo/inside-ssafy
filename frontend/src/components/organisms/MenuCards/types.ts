import { MenuCardTypes } from '../../molecules/MenuCard/types';

export interface PropTypes {
  menus: MenuCardTypes[];
  width?: number;
  height?: number;
  backgroundColor?: string;
  cardColor?: string;
}
