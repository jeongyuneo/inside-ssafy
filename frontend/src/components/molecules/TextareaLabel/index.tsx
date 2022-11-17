import React from 'react';
import Textarea from '../../atoms/Textarea';
import Label from '../../atoms/Label';
import { StyledTextareaLabel } from './styles';
import { TextareaLabelPropTypes } from './types';

const TextareaLabel = ({
  id,
  labelFontSize,
  labelTextColor,
  children,
  ...rest
}: TextareaLabelPropTypes) => {
  return (
    <StyledTextareaLabel>
      <Label htmlFor={id} fontSize={labelFontSize} textColor={labelTextColor}>
        {children}
      </Label>
      <Textarea id={id} {...rest} />
    </StyledTextareaLabel>
  );
};

export default TextareaLabel;
