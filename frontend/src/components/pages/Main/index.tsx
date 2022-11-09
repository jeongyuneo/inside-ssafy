import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clickBusNumHandler from '../../../utils/clickBusNumHandler';
import FavoriteBusCarosel from '../../organisms/FavoriteBusCarosel';
import ImageTextButtonGroup from '../../organisms/ImageTextButtonGroup';

const Main = () => {
  const [busNum, setBusNum] = useState(1);
  const navigate = useNavigate();

  const clickRefreshHandler = () => {
    console.log('refresh');
  };

  const clickPlusHandler = () => {
    console.log('plus');
  };

  const clickBusNumHandlerWrapper = (direction: string) => {
    clickBusNumHandler({ direction, busNum, setBusNum });
  };

  const movePage = (address: string) => {
    navigate(`/${address}`);
  };

  const moveNewLocation = () => {
    window.open('https://edu.ssafy.com');
  };

  const imageTextInfos = [
    {
      src: './images/eduSSAFY.png',
      alt: 'edussafy',
      clickImageHandler: () => moveNewLocation(),
      children: '에듀싸피',
    },
    {
      src: './images/tayo_bus.png',
      alt: 'bus',
      clickImageHandler: () => movePage('businfo'),
      children: '셔틀 정보',
    },
    {
      src: './images/speaker.png',
      alt: 'speaker',
      clickImageHandler: () => movePage('myPage'),
      children: '익명게시판',
    },
    {
      src: './images/plate.png',
      alt: 'plate',
      clickImageHandler: () => movePage('myPage'),
      children: '식단표',
    },
  ];

  return (
    <>
      <ImageTextButtonGroup imageTextInfos={imageTextInfos} />
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
