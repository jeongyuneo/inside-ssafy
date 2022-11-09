import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import MenuWeek from '../../molecules/MenuWeek';
import MenuCards from '../../organisms/MenuCards';
import { requestMenu } from './requestMenu';
import { MenuCardsWrapper, MenuWeekWrapper, StyledMenu } from './styles';
import { menus } from './testdata';
import { MenuTypes } from './types';

const Menu = () => {
  const DEFAULT_STATE: MenuTypes = {
    menus: menus,
    startDate: '0000-00-00',
    endDate: '0000-00-00',
  };
  const [menuOfWeek, setMenuOfWeek] = useState(DEFAULT_STATE);
  const getMenuOfTheWeek = async () => {
    const data = await requestMenu();
    setMenuOfWeek(data);
  };

  useEffect(() => {
    getMenuOfTheWeek();
  }, []);

  const menuOfTheWeek = useQuery<MenuTypes>([''], () => requestMenu());

  return (
    <StyledMenu>
      <MenuWeekWrapper>
        <MenuWeek
          startDate={menuOfWeek.startDate}
          endDate={menuOfWeek.endDate}
        ></MenuWeek>
      </MenuWeekWrapper>
      <MenuCardsWrapper>
        <MenuCards menus={menuOfWeek.menus}></MenuCards>
      </MenuCardsWrapper>
    </StyledMenu>
  );
};

export default Menu;
