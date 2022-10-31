import React from 'react';
import { PropTypes } from './types';
import { StyledInputLabel, StyledInputWrap, StyledLabelWrap } from './styles';
import Input from '../../atoms/Input';
import Label from '../../atoms/Label';

/**
 * Input 컴포넌트와 label 컴포넌트를 합친 컴포넌트
 * label의 htmlFor와 input의 id를 id로 통합하였다
 * fontSize와 textColor, backgroundColor 와 같이 두 컴포넌트가 중복되는부분은
 * inputFontSize, labelTextColor, inputBackgroundColor 등
 *
 * @author jun
 */

const InputLabel = ({
  // input
  id,
  inputFontSize,
  inputTextColor,
  inputBackgroundColor,

  // label
  children,
  labelColor,
  labelFontSize,
  ...inputPropsRest
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
