import React from 'react';
import { StyledLabel } from './styles';
import { PropTypes } from './types';

/**
 * children은 string을 받을 수 있다.
 * 가로, 세로, 폰트 사이즈, 글자색, 배경색을 받아 css에 적용한다.
 * 연결할 input의 id를 받아 해당 id를 가진 input과 연결할 수 있다.
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
  id,
}: PropTypes) => {
  return (
    <StyledLabel
      width={width}
      height={height}
      fontSize={fontSize}
      textColor={textColor}
      backgroundColor={backgroundColor}
      htmlFor={id}
    >
      {children}
    </StyledLabel>
  );
};

export default Label;
