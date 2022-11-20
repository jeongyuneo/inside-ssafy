import React from 'react';
import { StyledHorizontalLine } from './styles';
import { PropTypes } from './types';

const HorizontalLine = ({ width }: PropTypes) => {
  return (
    <StyledHorizontalLine width={width}>
      <hr />
    </StyledHorizontalLine>
  );
};

export default HorizontalLine;
