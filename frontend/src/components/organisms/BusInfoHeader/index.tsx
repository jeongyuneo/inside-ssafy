import React from 'react';
import BusInfoNavbar from '../../molecules/BusInfoNavbar';
import BusInfoNavigator from '../../molecules/BusInfoNavigator';
import Navbar from '../../molecules/Navbar';
import { StyledBusInfoHeader } from './styles';
import { PropTypes } from './types';

/**
 * BusLine과 새로고침 버튼을 렌더링
 *
 * @author jojo
 */
const BusInfoHeader = ({
  busNum,
  liked,
  clickLogoHandler,
  clickMypageHandler,
  clickBusNumHandler,
  toggleLikeHandler,
  toggleBusInfoModalHandler,
}: PropTypes) => {
  return (
    <StyledBusInfoHeader>
      <Navbar
        clickLogoHandler={clickLogoHandler}
        clickMypageHandler={clickMypageHandler}
      />
      <BusInfoNavigator
        busNum={busNum}
        clickBusNumHandler={clickBusNumHandler}
      />
      <BusInfoNavbar
        liked={liked}
        toggleLikeHandler={toggleLikeHandler}
        toggleBusInfoModalHandler={toggleBusInfoModalHandler}
      />
    </StyledBusInfoHeader>
  );
};

export default BusInfoHeader;
