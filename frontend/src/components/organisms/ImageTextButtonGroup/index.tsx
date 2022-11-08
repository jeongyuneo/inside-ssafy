import React from 'react';
import ImageTextButton from '../../molecules/ImageTextButton';
import { StyledImageTextButtonGroup } from './styles';
import { useNavigate } from 'react-router-dom';

/**
 * imageInfos 정보에 따라 화면을 렌더링합니다.
 *
 * @author jini
 */
const ImageTextButtonGroup = () => {
  const navigate = useNavigate();
  const movePage = (address: string) => {
    navigate(`/${address}`);
  };

  const moveNewLocation = () => {
    window.open('https://edu.ssafy.com');
  };

  const imageInfos = [
    {
      src: './images/eduSSAFY.png',
      alt: 'edussafy',
      clickHandler: () => moveNewLocation(),
      text: '에듀싸피',
    },
    {
      src: './images/tayo_bus.png',
      alt: 'bus',
      clickHandler: () => movePage('businfo'),
      text: '셔틀 정보',
    },
    {
      src: './images/speaker.png',
      alt: 'speaker',
      clickHandler: () => movePage('myPage'),
      text: '익명게시판',
    },
    {
      src: './images/plate.png',
      alt: 'plate',
      clickHandler: () => movePage('myPage'),
      text: '식단표',
    },
  ];

  return (
    <StyledImageTextButtonGroup>
      {imageInfos.map(({ src, alt, clickHandler, text }) => {
        return (
          <ImageTextButton
            key={src}
            src={src}
            alt={alt}
            clickImageHandler={clickHandler}
          >
            {text}
          </ImageTextButton>
        );
      })}
    </StyledImageTextButtonGroup>
  );
};

export default ImageTextButtonGroup;
