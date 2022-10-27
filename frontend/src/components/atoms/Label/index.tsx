import React from 'react';
import { StyledLabel } from './styles';
import { PropTypes } from './types';

/**
 * children은 string 또는 Icon을 받을 수 있다.
 * 가로, 세로, 폰트 사이즈, 글자색, 배경색을 받아 css에 적용한다.
 * isText를 받으면 기본 글자색으로 검정, 배경이 사라진다.
 * clickHandler를 받아 클릭 시 해당 함수가 실행된다.
 *
 * @author jojo
 */
const Label = ({
  children,
  width,
  height,
  fontSize,
  textColor,
  backgroundColor,
  isText,
}: PropTypes) => {
  return (
    <StyledLabel
      width={width}
      height={height}
      fontSize={fontSize}
      textColor={textColor}
      backgroundColor={backgroundColor}
      isText={isText}
    >
      {children}
    </StyledLabel>
  );
};

export default Label;
