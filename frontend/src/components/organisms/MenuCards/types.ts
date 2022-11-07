export interface PropTypes {
  menus: menuTypes[];
  width?: number;
  height?: number;
  backgroundColor?: string;
  cardColor?: string;
}

export interface menuTypes {
  date: string;
  dayOfTheWeek: string;
  items: string[];
  subMenus: string[];
}
