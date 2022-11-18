import React from 'react';
import Textarea from '../../atoms/Textarea';
import Label from '../../atoms/Label';
import { StyledTextareaLabel } from './styles';
import { TextareaLabelPropTypes } from './types';

/**
 * Labe과 Textarea를 함께 사용이 가능하다.
 * Label의 속성과 Textarea 속성을 모두 받아서 사용이 가능하다.
 *
 * @author jini
 */
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
