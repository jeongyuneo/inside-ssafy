import React from 'react';
import { StyledTextarea } from './styles';
import { PropTypes } from './types';

const Textarea = ({ id, name, changeHandler, ...rest }: PropTypes) => {
  return (
    <StyledTextarea
      id={id}
      name={name}
      onChange={e => changeHandler?.(e)}
      {...rest}
    />
  );
};

export default Textarea;
