import { ImageWrapper, StyledImage } from './styles';
import { PropTypes } from './types';
import React from 'react';

/**
 * width와 height를 단위까지 받아 이미지를 감싸는 div를 생성
 * height가 없으면 width 기준 정해진 비율로 생성
 *
 * @example <Image width="20rem" src="profile.jpg" alt="profile" />
 *
 * @author jojo
 */
const Image = ({
  width,
  height,
  src,
  alt,
  isCircle,
  clickHandler,
}: PropTypes) => {
  return (
    <ImageWrapper width={width} height={height} onClick={clickHandler}>
      <StyledImage src={src} alt={alt} isCircle={isCircle} />
    </ImageWrapper>
  );
};

export default Image;
