import React from 'react';
import Image from '../../atoms/Image';
import Text from '../../atoms/Text';
import { StyledImageTextButton } from './styles';
import { PropTypes } from './types';

/**
 * 이미지와 텍스트를 함께 보여줍니다.
 *
 * @author jini
 */
const ImageTextButton = ({
  children,
  clickImageHandler,
  ...rest
}: PropTypes) => {
  return (
    <StyledImageTextButton>
      <Image {...rest} width="4rem" clickHandler={clickImageHandler} />
      <Text size={0.8}>{children}</Text>
    </StyledImageTextButton>
  );
};

export default ImageTextButton;
