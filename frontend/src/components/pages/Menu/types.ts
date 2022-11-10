import { MenuCardTypes } from '../../molecules/MenuCard/types';
import { MenuWeekTypes } from '../../molecules/MenuWeek/types';

export interface MenuTypes extends MenuWeekTypes {
  menus: MenuCardTypes[];
}
