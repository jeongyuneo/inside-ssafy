import React, { useEffect, useState } from 'react';
import MenuWeek from '../../molecules/MenuWeek';
import MenuCards from '../../organisms/MenuCards';
import { requestMenu } from './requestMenu';
import { MenuCardsWrapper, MenuWeekWrapper, StyledMenu } from './styles';
import { menus } from './testdata';
import { MenuTypes } from './types';

const Menu = () => {
  const defaultState: MenuTypes = {
    menus: menus,
    startDate: '0000-00-00',
    endDate: '0000-00-00',
  };
  const [menuOfTheWeek, setMenuOfTheWeek] = useState(defaultState);
  const getMenuOfTheWeek = async () => {
    const data = await requestMenu();
    setMenuOfTheWeek(data);
  };

  useEffect(() => {
    getMenuOfTheWeek();
  }, []);

  return (
    <StyledMenu>
      <MenuWeekWrapper>
        <MenuWeek
          startDate={menuOfTheWeek.startDate}
          endDate={menuOfTheWeek.endDate}
        ></MenuWeek>
      </MenuWeekWrapper>
      <MenuCardsWrapper>
        <MenuCards menus={menuOfTheWeek.menus} width={24}></MenuCards>
      </MenuCardsWrapper>
    </StyledMenu>
  );
};

export default Menu;
