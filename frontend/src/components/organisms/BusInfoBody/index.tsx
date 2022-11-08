import React from 'react';
import BusLine from '../../molecules/BusLine';
import { RefreshButtonWrapper, StyledBusInfoBody } from './styles';
import { PropTypes } from './types';
import RefreshButton from '../../atoms/RefreshButton';

/**
 * BusLine과 새로고침 버튼을 렌더링
 *
 * @author jojo
 */
const BusInfoBody = ({ clickRefreshHandler, ...rest }: PropTypes) => {
  return (
    <StyledBusInfoBody>
      <BusLine {...rest} />
      <RefreshButtonWrapper>
        <RefreshButton
          wrapperSize={2}
          buttonSize={20}
          clickRefreshHandler={clickRefreshHandler}
        />
      </RefreshButtonWrapper>
    </StyledBusInfoBody>
  );
};

export default BusInfoBody;
