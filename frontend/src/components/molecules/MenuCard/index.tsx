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
 * Text 컴포넌트를 나열해 식단을 표시
 * width 가 100%이기 때문에 사용시 Wrap과 padding을 사용해 조절할 것
 *
 * @author jun
 */
const MenuCard = ({
  title,
  menus,
  subMenus,
  width,
  height,
  backgroundColor,
  fontSize,
}: PropTypes) => {
  return (
    <StyledMenuCard
      title={title}
      menus={menus}
      subMenus={subMenus}
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
        {!menus.length ? (
          <Text bold={true}>미운영</Text>
        ) : (
          menus.map(menu => (
            <Text size={fontSize ? fontSize : 0.8} key={menu}>
              {menu}
            </Text>
          ))
        )}
      </StyledMenu>
      <StyledHr />
      <StyledSubMenu>
        {subMenus.length &&
          subMenus.map(subMenu => (
            <Text size={fontSize ? fontSize : 0.8} key={subMenu}>
              {subMenu}
            </Text>
          ))}
      </StyledSubMenu>
    </StyledMenuCard>
  );
};

export default MenuCard;
