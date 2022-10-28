import React from 'react';
import { PropTypes } from './types';
import { StyledInputLabel, StyledInputWrap, StyledLabelWrap } from './styles';
import Input from '../../atoms/Input';
import Label from '../../atoms/Label';

const InputLabel = ({
  // input
  id,
  changeHandler,
  name,
  index,
  height,
  width,
  value,
  type,
  placeholder,
  borderRadius,
  paddingLeft,
  inputFontSize,
  inputTextColor,
  inputBackgroundColor,

  // label
  children,
  labelColor,
  labelFontSize,
}: PropTypes) => {
  return (
    <StyledInputLabel>
      <StyledLabelWrap>
        <Label htmlFor={id} fontSize={labelFontSize} textColor={labelColor}>
          {children}
        </Label>
      </StyledLabelWrap>
      <StyledInputWrap>
        <Input
          id={id}
          name={name}
          index={index}
          height={height}
          width={width}
          value={value}
          changeHandler={changeHandler}
          type={type}
          placeholder={placeholder}
          borderRadius={borderRadius}
          paddingLeft={paddingLeft}
          fontSize={inputFontSize}
          textColor={inputTextColor}
          backgroundColor={inputBackgroundColor}
        />
      </StyledInputWrap>
    </StyledInputLabel>
  );
};

export default InputLabel;

//flex direction
