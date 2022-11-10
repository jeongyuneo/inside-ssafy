import { useQuery } from '@tanstack/react-query';
import React from 'react';
import MenuWeek from '../../molecules/MenuWeek';
import MenuCards from '../../organisms/MenuCards';
import { requestMenu } from './requestMenu';
import { MenuCardsWrapper, MenuWeekWrapper, StyledMenu } from './styles';
import { MenuTypes } from './types';

const Menu = () => {
  const { data: menuOfWeek } = useQuery<MenuTypes>(['requestMenuOfWeek'], () =>
    requestMenu(),
  );

  return (
    <StyledMenu>
      <MenuWeekWrapper>
        <MenuWeek
          startDate={menuOfWeek?.startDate}
          endDate={menuOfWeek?.endDate}
        ></MenuWeek>
      </MenuWeekWrapper>
      <MenuCardsWrapper>
        <MenuCards menus={menuOfWeek?.menus}></MenuCards>
      </MenuCardsWrapper>
    </StyledMenu>
  );
};

export default Menu;
