import React from 'react';
import MenuCard from '../../molecules/MenuCard';
import { MenuCardsWrapper, MenuCardWrapper, StyledMenuCards } from './styles';
import { PropTypes } from './types';

/**
 * 식단표 정보를 출력
 * 배경색, 카드색, 높이, 너비를 추가로 입력하여 조절 가능
 *
 * @author jun
 */

const MenuCards = ({ menus, cardColor, ...menuRest }: PropTypes) => {
  return (
    <StyledMenuCards menus={menus} {...menuRest}>
      <MenuCardsWrapper>
        {menus.map(
          ({ dayOfTheWeek, subItems, items, backgroundColor, ...menuRest }) => (
            <MenuCardWrapper key={dayOfTheWeek}>
              <MenuCard
                dayOfTheWeek={dayOfTheWeek}
                items={items}
                subItems={subItems}
                key={dayOfTheWeek}
                backgroundColor={cardColor}
                {...menuRest}
              />
            </MenuCardWrapper>
          ),
        )}
      </MenuCardsWrapper>
    </StyledMenuCards>
  );
};

export default MenuCards;
