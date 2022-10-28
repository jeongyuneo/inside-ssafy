import React from 'react';
import { StyledInput } from './styles';
import { PropTypes } from './types';

/**
 * 원하는 값을 받아 text에 지정된 state 변수로
 * 가로, 세로, 폰트사이즈, 텍스트칼라 등의 css 를 받는다.
 * borderRadius로 테두리를 둥글게 만들고
 * paddingLeft로 맨 왼쪽과 글자와의 간격을 둔다.
 * index로 지정한 key값 또는 인덱스를 가진 state에 입력값을 적용한다.
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
  index,
  placeholder,
  changeHandler,
  borderRadius,
  paddingLeft,
}: PropTypes) => {
  return (
    <StyledInput
      width={width}
      height={height}
      borderRadius={borderRadius}
      fontSize={fontSize}
      textColor={textColor}
      backgroundColor={backgroundColor}
      value={value}
      type={textType}
      name={name}
      id={id}
      index={index}
      placeholder={placeholder}
      paddingLeft={paddingLeft}
      onChange={e =>
        changeHandler?.(e.target.value, index ? index : (index = 'none'))
      }
    />
  );
};

export default Input;
