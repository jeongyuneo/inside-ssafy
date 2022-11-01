import React from 'react';
import { PropTypes } from './types';
import { StyledInputLabel, StyledInputWrap, StyledLabelWrap } from './styles';
import Input from '../../atoms/Input';
import Label from '../../atoms/Label';

/**
 * Input 컴포넌트와 label 컴포넌트를 합친 컴포넌트
 * @author jun
 */

const InputLabel = ({
  id,
  inputFontSize,
  inputTextColor,
  inputBackgroundColor,
  labelValue,
  labelColor,
  labelFontSize,
  ...inputPropsRest
}: PropTypes) => {
  return (
    <StyledInputLabel>
      <StyledLabelWrap>
        <Label htmlFor={id} fontSize={labelFontSize} textColor={labelColor}>
          {labelValue}
        </Label>
      </StyledLabelWrap>
      <StyledInputWrap>
        <Input
          id={id}
          fontSize={inputFontSize}
          textColor={inputTextColor}
          backgroundColor={inputBackgroundColor}
          {...inputPropsRest}
        />
      </StyledInputWrap>
    </StyledInputLabel>
  );
};

export default InputLabel;
