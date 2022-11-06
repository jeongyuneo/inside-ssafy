import React from 'react';
import MenuCard from '../../molecules/MenuCard';
import { MenuCardWraps, StyledMenuCards } from './styles';
import { PropTypes } from './types';

const MenuCards = ({ items }: PropTypes) => {
  return (
    <StyledMenuCards>
      {items.map(item => (
        <MenuCardWraps key={item.title}>
          <MenuCard
            title={item.title}
            menus={item.menus}
            subMenus={item.subMenus}
            key={item.title}
          />
        </MenuCardWraps>
      ))}
    </StyledMenuCards>
  );
};

export default MenuCards;
