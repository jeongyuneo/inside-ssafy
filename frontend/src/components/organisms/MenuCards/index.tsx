import React from 'react';
import MenuCard from '../../molecules/MenuCard';
import { MenuCardsWrapper, MenuCardWrapper, StyledMenuCards } from './styles';
import { PropTypes } from './types';

const MenuCards = ({ items }: PropTypes) => {
  return (
    <StyledMenuCards>
      <MenuCardsWrapper>
        {items.map(item => (
          <MenuCardWrapper key={item.title}>
            <MenuCard
              title={item.title}
              menus={item.menus}
              subMenus={item.subMenus}
              key={item.title}
            />
          </MenuCardWrapper>
        ))}
      </MenuCardsWrapper>
    </StyledMenuCards>
  );
};

export default MenuCards;
