import React from 'react';
import { StyledText } from './styles';
import { PropTypes } from './types';

/**
 * color와 size를 props로 받아 속성을 설정한다.(optional)
 *
 * @author jojo
 */
const Text = ({ children, color, size }: PropTypes) => {
  return (
    <StyledText color={color} size={size}>
      {children}
    </StyledText>
  );
};

export default Text;
