import React from 'react';
import Image from '../../atoms/Image';
import Text from '../../atoms/Text';
import {
  CurrentBusLocation,
  EachLocation,
  StyledFavoriteBusBody,
  TextWrapper,
} from './styles';
import { PropTypes } from './types';
import {
  BsCheckCircleFill,
  BsChevronDoubleDown,
  BsCircleFill,
} from 'react-icons/bs';

/**
 * 자주 타는 버스 정보 organism의 Header 컴포넌트
 *
 * @author jojo
 */
const FavoriteBusBody = ({ previousBusStop, nextBusStop }: PropTypes) => {
  return (
    <StyledFavoriteBusBody>
      <Image width="6rem" src="/images/favorite_bus.png" alt="bus" />
      <CurrentBusLocation>
        <EachLocation>
          <BsCheckCircleFill color="#1E90FF" />
          <TextWrapper>
            <Text bold size={1.2}>
              {previousBusStop}
            </Text>
          </TextWrapper>
        </EachLocation>
        <EachLocation>
          <BsChevronDoubleDown />
        </EachLocation>
        <EachLocation>
          <BsCircleFill color="gray" />
          <Text size={0.9}>{nextBusStop}</Text>
        </EachLocation>
      </CurrentBusLocation>
    </StyledFavoriteBusBody>
  );
};

export default FavoriteBusBody;
