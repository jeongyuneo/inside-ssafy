import React from 'react';
import { StyledButton } from './styles';
import { PropTypes } from './types';

/**
 * children은 string 또는 Icon을 받을 수 있다.
 * 가로, 세로, 폰트 사이즈, 글자색, 배경색을 받아 css에 적용한다.
 * clickHandler를 받아 클릭 시 해당 함수가 실행된다.
 *
 * @author jojo
 */
const Button = ({
  children,
  width,
  height,
  fontSize,
  textColor,
  backgroundColor,
  clickHandler,
}: PropTypes) => {
  return (
    <StyledButton
      width={width}
      height={height}
      fontSize={fontSize}
      textColor={textColor}
      backgroundColor={backgroundColor}
      onClick={clickHandler}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
