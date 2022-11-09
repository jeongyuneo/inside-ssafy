import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Text from '../../atoms/Text';
import FavoriteBusBody from '../../molecules/FavoriteBusBody';
import FavoriteBusHeader from '../../molecules/FavoriteBusHeader';
import {
  FavoriteBusContainer,
  FlexContainer,
  StyledFavoriteBusCarosel,
  TextFlexContainer,
} from './styles';
import { PropTypes } from './types';

/**
 * 자주 타는 버스 정보 캐러셀
 *
 * @author jojo
 */
const FavoriteBusCarosel = ({
  busNum,
  previousBusStop,
  nextBusStop,
  clickRefreshHandler,
  clickPlusHandler,
  clickBusNumHandler,
}: PropTypes) => {
  return (
    <StyledFavoriteBusCarosel>
      <TextFlexContainer>
        <Text size={1.1} bold>
          자주 타는 버스 정보
        </Text>
      </TextFlexContainer>
      <FlexContainer>
        <FaChevronLeft size={30} onClick={() => clickBusNumHandler('left')} />
        <FavoriteBusContainer>
          <FavoriteBusHeader
            busNum={busNum}
            clickRefreshHandler={clickRefreshHandler}
            clickPlusHandler={clickPlusHandler}
          />
          <FavoriteBusBody
            previousBusStop={previousBusStop}
            nextBusStop={nextBusStop}
          />
        </FavoriteBusContainer>
        <FaChevronRight size={30} onClick={() => clickBusNumHandler('right')} />
      </FlexContainer>
    </StyledFavoriteBusCarosel>
  );
};

export default FavoriteBusCarosel;
