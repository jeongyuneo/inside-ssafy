import React from 'react';
import Button from '../../atoms/Button';
import Image from '../../atoms/Image';
import Text from '../../atoms/Text';
import { NavbarWrapper, StyledNavbar } from './styles';
import { PropTypes } from './types';

/**
 * 로고를 클릭하면 홈 화면으로 이동하는 Navigation bar
 *
 * @author jojo
 */
const Navbar = ({ clickLogoHandler, clickMypageHandler }: PropTypes) => {
  return (
    <NavbarWrapper>
      <StyledNavbar>
        <Image
          width="5rem"
          src="/images/iNSSA_logo3.png"
          alt="logo"
          clickHandler={clickLogoHandler}
        />
        {clickMypageHandler ? (
          <Button clickHandler={clickMypageHandler} isText>
            내 정보
          </Button>
        ) : (
          <Text>대전 캠퍼스</Text>
        )}
      </StyledNavbar>
    </NavbarWrapper>
  );
};

export default Navbar;
