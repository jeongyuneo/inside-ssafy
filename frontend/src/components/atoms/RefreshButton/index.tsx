import React from 'react';
import { GrRefresh } from 'react-icons/gr';
import { StyledRefreshButton } from './styles';
import { PropTypes } from './types';

const RefreshButton = ({
  wrapperSize,
  buttonSize,
  clickRefreshHandler,
}: PropTypes) => {
  return (
    <StyledRefreshButton wrapperSize={wrapperSize}>
      <GrRefresh size={buttonSize} onClick={clickRefreshHandler} />
    </StyledRefreshButton>
  );
};

export default RefreshButton;
