import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import navigator from '../../../utils/navigator';
import Button from '../../atoms/Button';
import MenuWeek from '../../molecules/MenuWeek';
import Navbar from '../../molecules/Navbar';
import MenuCards from '../../organisms/MenuCards';
import { requestMenu } from './requestMenu';
import {
  ButtonWrapper,
  MenuCardsWrapper,
  MenuWeekWrapper,
  NavbarWrapper,
  StyledMenu,
} from './styles';
import { MenuTypes } from './types';

const Menu = () => {
  const { data: menuOfWeek } = useQuery<MenuTypes>(['requestMenuOfWeek'], () =>
    requestMenu(),
  );

  const navigate = useNavigate();

  const goToBeforePage = () => {
    navigate(-1);
  };

  return (
    <StyledMenu>
      <NavbarWrapper>
        <Navbar
          clickLogoHandler={navigator(navigate).main}
          clickMypageHandler={navigator(navigate).mypage}
        ></Navbar>
      </NavbarWrapper>
      <ButtonWrapper>
        <Button width={5} fontSize={1} clickHandler={goToBeforePage} isText>
          뒤로가기
        </Button>
      </ButtonWrapper>
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
