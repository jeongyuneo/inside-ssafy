import React from 'react';
import { StyledInput } from './styles';
import { PropTypes } from './types';

/**
 * 원하는 값을 받아 text에 지정된 state 변수로
 * 가로, 세로, 폰트사이즈, 텍스트칼라 등의 css 를 받는다.
 * changeHandler를 받아 Input 값 수정시 함수가 작동한다.
 *
 * @author jun
 */
const Input = ({
  width,
  height,
  fontSize,
  textColor,
  backgroundColor,
  value,
  textType,
  name,
  id,
  changeHandler,
}: PropTypes) => {
  return (
    <StyledInput
      width={width}
      height={height}
      fontSize={fontSize}
      textColor={textColor}
      backgroundColor={backgroundColor}
      value={value}
      type={textType}
      name={name}
      id={id}
      onChange={e => changeHandler?.(e.target.name, e.target.value)}
    />
  );
};

export default Input;
