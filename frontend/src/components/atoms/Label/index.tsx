import React from 'react';
import { StyledLabel } from './styles';
import { PropTypes } from './types';

/**
 * children은 string 또는 Icon을 받을 수 있다.
 * 가로, 세로, 폰트 사이즈, 글자색, 배경색을 받아 css에 적용한다.
 *
 * @author jun
 */
const Label = ({
  children,
  width,
  height,
  fontSize,
  textColor,
  backgroundColor,
}: PropTypes) => {
  return (
    <StyledLabel
      width={width}
      height={height}
      fontSize={fontSize}
      textColor={textColor}
      backgroundColor={backgroundColor}
    >
      {children}
    </StyledLabel>
  );
};

export default Label;
