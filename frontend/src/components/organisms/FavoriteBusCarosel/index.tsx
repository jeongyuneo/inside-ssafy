import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Text from '../../atoms/Text';
import FavoriteBusBody from '../../molecules/FavoriteBusBody';
import FavoriteBusHeader from '../../molecules/FavoriteBusHeader';
import {
  EmptyBusBodyContainer,
  EmptyBusContainer,
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
  errorMessage,
  busLikes,
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
      {busLikes?.length ? (
        <FlexContainer>
          <FaChevronLeft size={30} onClick={() => clickBusNumHandler('left')} />
          <FavoriteBusContainer>
            <FavoriteBusHeader
              busNum={busNum}
              clickRefreshHandler={clickRefreshHandler}
              clickPlusHandler={clickPlusHandler}
            />
            {previousBusStop ? (
              <FavoriteBusBody
                previousBusStop={previousBusStop}
                nextBusStop={nextBusStop}
              />
            ) : (
              <EmptyBusBodyContainer>{errorMessage}</EmptyBusBodyContainer>
            )}
          </FavoriteBusContainer>
          <FaChevronRight
            size={30}
            onClick={() => clickBusNumHandler('right')}
          />
        </FlexContainer>
      ) : (
        <EmptyBusContainer>
          <Text>즐겨찾기 등록한 버스가 없거나 운영 시간이 아닙니다</Text>
        </EmptyBusContainer>
      )}
    </StyledFavoriteBusCarosel>
  );
};

export default FavoriteBusCarosel;
