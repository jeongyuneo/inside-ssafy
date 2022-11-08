export interface PropTypes {
  menus: MenuTypes[];
  width?: number;
  height?: number;
  backgroundColor?: string;
  cardColor?: string;
}

export interface MenuTypes {
  date: string;
  dayOfTheWeek: string;
  items: string[];
  subMenus: string[];
}
