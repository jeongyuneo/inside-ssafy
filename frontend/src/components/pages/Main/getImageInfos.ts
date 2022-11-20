import { NavigateFunction } from 'react-router-dom';

export const getImageInfos = (
  navigate: NavigateFunction,
  clickShuttleInfoButtonHandler: () => void,
) => {
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
      clickImageHandler: () => clickShuttleInfoButtonHandler(),
      children: '셔틀 정보',
    },
    {
      src: './images/speaker.png',
      alt: 'speaker',
      clickImageHandler: () => movePage('board'),
      children: '익명게시판',
    },
    {
      src: './images/plate.png',
      alt: 'plate',
      clickImageHandler: () => movePage('menu'),
      children: '식단표',
    },
  ];

  return imageTextInfos;
};
