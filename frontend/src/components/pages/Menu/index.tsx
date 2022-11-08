import React, { useEffect, useState } from 'react';
import MenuWeek from '../../molecules/MenuWeek';
import MenuCards from '../../organisms/MenuCards';
import { MenuCardsTypes } from '../../organisms/MenuCards/types';
import { requestMenu } from './requestMenu';
import { MenuCardsWrapper, MenuWeekWrapper, StyledMenu } from './styles';
import { menus } from './testdata';

const Menu = () => {
  const date = Date.now();
  const [menuOfTheWeek, setMenuOfTheWeek] = useState({
    menus,
    startDate: date,
    endDate: date,
  });
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
        <MenuWeek startDate={`2022-11-08`} endDate={`2022-11-09`}></MenuWeek>
      </MenuWeekWrapper>
      <MenuCardsWrapper>
        <MenuCards menus={menuOfTheWeek.menus}></MenuCards>
      </MenuCardsWrapper>
    </StyledMenu>
  );
};

export default Menu;
