import React from 'react';
import Text from '../../atoms/Text';
import {
  StyledHr,
  StyledMenu,
  StyledMenuCard,
  StyledSubMenu,
  StyledTitle,
} from './styles';
import { PropTypes } from './types';

/**
 * Text 컴포넌트의 나열
 * 요일이나 제목은 title,
 * 메뉴는 menus,
 * 바나나와 요구르트 등 후식으로 나오는 메뉴는 sub_menus에 표시한다.
 *
 * fontSize 와 backgroundColor는 조절이 가능하다.
 *
 * width 가 100%이기 때문에 사용시 Wrap과 padding을 사용해 조절할 것
 *
 * @author jun
 */

const MenuCard = ({
  title,
  menus,
  sub_menus,
  width,
  height,
  backgroundColor,
  fontSize,
}: PropTypes) => {
  return (
    <StyledMenuCard
      title={title}
      menus={menus}
      sub_menus={sub_menus}
      width={width}
      height={height}
      backgroundColor={backgroundColor}
    >
      <StyledTitle>
        <Text size={fontSize ? fontSize + 0.2 : 1} bold={true}>
          {title}
        </Text>
      </StyledTitle>
      <StyledHr />
      <StyledMenu>
        {menus.length == 0 ? (
          <Text bold={true}>미운영</Text>
        ) : (
          menus.map(menu => {
            return (
              <Text size={fontSize ? fontSize : 0.8} key={menu}>
                {menu}
              </Text>
            );
          })
        )}
      </StyledMenu>
      <StyledHr />
      <StyledSubMenu>
        {sub_menus.length == 0 ? (
          <Text> </Text>
        ) : (
          sub_menus.map(sub_menu => {
            return (
              <Text size={fontSize ? fontSize : 0.8} key={sub_menu}>
                {sub_menu}
              </Text>
            );
          })
        )}
      </StyledSubMenu>
    </StyledMenuCard>
  );
};

export default MenuCard;
