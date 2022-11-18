import React, { ForwardedRef, forwardRef } from 'react';
import { StyledInput } from './styles';
import { PropTypes } from './types';

/**
 * 원하는 값을 받아 text에 지정된 state 변수로
 * 가로, 세로, 폰트사이즈, 텍스트칼라 등의 css 를 받는다.
 *
 * changeHandler는 ChangeEvent<HTMLInputElement> 타입의 e값을 변수로 전달해준다.
 * value는 부모 컴포넌트에 값을 저장하고 현재 Input에 반영한다.
 *
 * value에는 값을 입력하고자 하는 변수의 값을 집어넣는다
 * value의 값은 name으로 표시한다.
 *
 * @author jun
 */
const Input = (
  {
    width,
    height,
    fontSize,
    textColor,
    backgroundColor,
    inputs,
    type,
    name,
    id,
    accept,
    placeholder,
    disabled,
    changeHandler,
    pressKeyHandler,
  }: PropTypes,
  ref: ForwardedRef<HTMLInputElement>,
) => {
  return (
    <StyledInput
      width={width}
      height={height}
      fontSize={fontSize}
      textColor={textColor}
      backgroundColor={backgroundColor}
      value={inputs?.[name]}
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      disabled={disabled}
      accept={accept}
      ref={ref}
      onChange={e => changeHandler?.(e)}
      onKeyUp={pressKeyHandler}
    />
  );
};

export default forwardRef(Input);
