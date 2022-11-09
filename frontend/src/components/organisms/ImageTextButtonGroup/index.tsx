import React from 'react';
import ImageTextButton from '../../molecules/ImageTextButton';
import { StyledImageTextButtonGroup } from './styles';
import { ImageTextButtonGroupTypes } from './types';

/**
 * imageInfos 정보에 따라 화면을 렌더링합니다.
 *
 * @author jini
 */
const ImageTextButtonGroup = ({
  imageTextInfos,
}: ImageTextButtonGroupTypes) => {
  return (
    <StyledImageTextButtonGroup>
      {imageTextInfos.map(({ src, alt, clickImageHandler, children }) => {
        return (
          <ImageTextButton
            key={src}
            src={src}
            alt={alt}
            clickImageHandler={clickImageHandler}
          >
            {children}
          </ImageTextButton>
        );
      })}
    </StyledImageTextButtonGroup>
  );
};

export default ImageTextButtonGroup;
