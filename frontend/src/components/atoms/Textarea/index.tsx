import React from 'react';
import { StyledTextarea } from './styles';
import { PropTypes } from './types';

const Textarea = ({ id, name, changeHandler, inputs, ...rest }: PropTypes) => {
  return (
    <StyledTextarea
      id={id}
      name={name}
      value={inputs?.[name]}
      onChange={e => changeHandler?.(e)}
      {...rest}
    />
  );
};

export default Textarea;
