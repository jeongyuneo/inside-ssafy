import React, { useState } from 'react';
import clickBusNumHandler from '../../../utils/clickBusNumHandler';
import FavoriteBusCarosel from '../../organisms/FavoriteBusCarosel';
import ImageTextButtonGroup from '../../organisms/ImageTextButtonGroup';

const Main = () => {
  const [busNum, setBusNum] = useState(1);

  const clickRefreshHandler = () => {
    console.log('refresh');
  };

  const clickPlusHandler = () => {
    console.log('plus');
  };

  const clickBusNumHandlerWrapper = (direction: string) => {
    clickBusNumHandler({ direction, busNum, setBusNum });
  };

  return (
    <>
      <ImageTextButtonGroup />
      <FavoriteBusCarosel
        busNum={busNum}
        previousBusStop="충대 정문"
        nextBusStop="유성온천역 7번 출구"
        clickRefreshHandler={clickRefreshHandler}
        clickPlusHandler={clickPlusHandler}
        clickBusNumHandler={clickBusNumHandlerWrapper}
      />
    </>
  );
};

export default Main;
