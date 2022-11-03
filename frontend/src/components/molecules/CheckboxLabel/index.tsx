import React from 'react';
import Checkbox from '../../atoms/Checkbox';
import Label from '../../atoms/Label';
import { StyledCheckboxLabel } from './styles';
import { PropTypes } from './types';

/**
 * Label과 Checkbox를 div로 묶어 보여준다.
 * isColumn을 내려보내면 세로로 정렬된다.
 *
 * @author jojo
 */
const CheckboxLabel = ({
  text,
  id,
  isColumn,
  checked,
  toggleHandler,
}: PropTypes) => {
  return (
    <StyledCheckboxLabel isColumn={isColumn}>
      <Checkbox id={id} checked={checked} toggleHandler={toggleHandler} />
      <Label htmlFor={id}>{text}</Label>
    </StyledCheckboxLabel>
  );
};

export default CheckboxLabel;
