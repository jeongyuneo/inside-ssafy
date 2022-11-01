import { mainModule } from 'process';
import React from 'react';
import { StyledInput } from './styles';
import { PropTypes } from './types';

/**
 * 원하는 값을 받아 text에 지정된 state 변수로
 * 가로, 세로, 폰트사이즈, 텍스트칼라 등의 css 를 받는다.
 *
 * changeHandler는 ChangeEvent<HTMLInputElement> 타입의 e값을 변수로 전달해준다.
 * value는 부모 컴포넌트에 값을 저장하고 현재 Input에 반영한다.
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
  type,
  name,
  id,
  placeholder,
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
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      onChange={e => changeHandler?.(e)}
    />
  );
};

export default Input;
