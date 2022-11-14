export interface MenuCardTypes extends StyledMenuCardType {
  dayOfTheWeek: string;
  items?: string[];
  subItems?: string[];
  date?: string;
}

export interface StyledMenuCardType {
  width?: number;
  height?: number;
  fontSize?: number;
  backgroundColor?: string;
}
