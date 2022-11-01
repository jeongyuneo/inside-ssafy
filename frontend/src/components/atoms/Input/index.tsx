import React from 'react';
import { StyledInput } from './styles';
import { PropTypes } from './types';

/**
 * 원하는 값을 받아 text에 지정된 state 변수로
 * 가로, 세로, 폰트사이즈, 텍스트칼라 등의 css 를 받는다.
 * index로 지정한 key값 또는 인덱스를 가진 state에 입력값을 적용한다.
 *
 * changeHandler는 Input과 해당 index값을 인수로 전달하며
 * 값이 변경될때마다 입력값인 value와 해당 변수의 위치인 index를
 * 부모 컴포넌트로 전달한다.
 *
 * value는 input을 통해 저장하고 싶은 string의 위치를 지정하며
 * 배열의 경우 arr[index] 값을, Object의 경우 object.index 값을 설정해준다.
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
      type={type}
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
