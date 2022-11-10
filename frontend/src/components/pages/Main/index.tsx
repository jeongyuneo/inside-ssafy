import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clickBusNumHandler from '../../../utils/clickBusNumHandler';
import navigator from '../../../utils/navigator';
import Navbar from '../../molecules/Navbar';
import FavoriteBusCarosel from '../../organisms/FavoriteBusCarosel';
import ImageTextButtonGroup from '../../organisms/ImageTextButtonGroup';
import { getImageInfos } from './getImageInfos';
import { StyledMain } from './styles';

const Main = () => {
  const [busNum, setBusNum] = useState(1);
  const navigate = useNavigate();

  const clickRefreshHandler = () => {
    console.log('refresh');
  };

  const clickBusNumHandlerWrapper = (direction: string) => {
    clickBusNumHandler({ direction, busNum, setBusNum });
  };

  return (
    <StyledMain>
      <Navbar
        clickLogoHandler={navigator(navigate).main}
        clickMypageHandler={navigator(navigate).mypage}
      />
      <ImageTextButtonGroup imageTextInfos={getImageInfos(navigate)} />
      <FavoriteBusCarosel
        busNum={busNum}
        previousBusStop="충대 정문"
        nextBusStop="유성온천역 7번 출구"
        clickRefreshHandler={clickRefreshHandler}
        clickPlusHandler={navigator(navigate, { state: { busNum } }).busInfo}
        clickBusNumHandler={clickBusNumHandlerWrapper}
      />
    </StyledMain>
  );
};

export default Main;
