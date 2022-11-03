import React from 'react';
import BusLine from '../../molecules/BusLine';
import { RefreshButton, StyledBusInfoBody } from './styles';
import { GrRefresh } from 'react-icons/gr';
import { PropTypes } from './types';

/**
 * BusLine과 새로고침 버튼을 렌더링
 *
 * @author jojo
 */
const BusInfoBody = ({ clickRefreshHandler, ...rest }: PropTypes) => {
  return (
    <StyledBusInfoBody>
      <BusLine {...rest} />
      <RefreshButton>
        <GrRefresh size={20} onClick={clickRefreshHandler} />
      </RefreshButton>
    </StyledBusInfoBody>
  );
};

export default BusInfoBody;
