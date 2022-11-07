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

const MenuCards = ({
  menus,
  width,
  height,
  backgroundColor,
  cardColor,
}: PropTypes) => {
  return (
    <StyledMenuCards
      menus={menus}
      width={width}
      height={height}
      backgroundColor={backgroundColor}
    >
      <MenuCardsWrapper>
        {menus.map(item => (
          <MenuCardWrapper key={item.date}>
            <MenuCard
              // 머지하여 menuCard와 합친 뒤 수정할 예정
              title={item.dayOfTheWeek}
              menus={item.items}
              subMenus={['숭늉']}
              key={item.date}
              backgroundColor={cardColor}
            />
          </MenuCardWrapper>
        ))}
      </MenuCardsWrapper>
    </StyledMenuCards>
  );
};

export default MenuCards;
