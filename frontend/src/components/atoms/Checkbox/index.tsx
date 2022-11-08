import React from 'react';
import { StyledCheckbox } from './styles';
import { PropTypes } from './types';

/**
 * label의 htmlFor 속성과 같은 id를 받아 label과 연결한다.
 * size를 받아 css zoom 속성을 이용해 크기를 조절한다.
 *
 * @author jojo
 */
const Checkbox = ({ id, size, checked, toggleHandler }: PropTypes) => {
  return (
    <StyledCheckbox
      id={id}
      size={size}
      type="checkbox"
      checked={checked}
      onChange={toggleHandler}
    />
  );
};

export default Checkbox;
