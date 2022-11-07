import React from 'react';
import RefreshButton from '../../atoms/RefreshButton';
import Text from '../../atoms/Text';
import { ButtonsWrapper, StyledBusInfoHeader } from './styles';
import { PropTypes } from './types';
import { BsPlusLg } from 'react-icons/bs';

/**
 * 자주 타는 버스 정보 organism의 Header 컴포넌트
 *
 * @author jojo
 */
const FavoriteBusHeader = ({
  busNum,
  clickRefreshHandler,
  clickPlusHandler,
}: PropTypes) => {
  return (
    <StyledBusInfoHeader>
      <Text size={1.5}>{busNum + '호차'}</Text>
      <ButtonsWrapper>
        <RefreshButton
          wrapperSize={2}
          buttonSize={20}
          clickRefreshHandler={clickRefreshHandler}
        />
        <BsPlusLg onClick={clickPlusHandler} />
      </ButtonsWrapper>
    </StyledBusInfoHeader>
  );
};

export default FavoriteBusHeader;
