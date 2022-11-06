import React from 'react';
import { GrRefresh } from 'react-icons/gr';
import { StyledRefreshButton } from './styles';
import { PropTypes } from './types';

/**
 * 원 모양의 새로고침 버튼 컴포넌트
 *
 * @author jojo
 */
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
