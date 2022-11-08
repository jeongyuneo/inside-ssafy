import React from 'react';
import MenuWeek from '../../molecules/MenuWeek';
import MenuCards from '../../organisms/MenuCards';
import { MenuCardsWrapper, MenuWeekWrapper, StyledMenu } from './styles';
import { menus } from './testdata';

const Menu = () => {
  return (
    <StyledMenu>
      <MenuWeekWrapper>
        <MenuWeek startDate={`2022-11-08`} endDate={`2022-11-09`}></MenuWeek>
      </MenuWeekWrapper>
      <MenuCardsWrapper>
        <MenuCards menus={menus}></MenuCards>
      </MenuCardsWrapper>
    </StyledMenu>
  );
};
