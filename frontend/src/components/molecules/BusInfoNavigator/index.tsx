import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Text from '../../atoms/Text';
import {
  BusInfoNavigatorContainer,
  BusNumberContainer,
  StyledBusInfoNavigator,
} from './styles';
import { Proptypes } from './types';

/**
 * busNum과 clickHandler를 받아 1호차 ~ N호차까지 동적으로 렌더링
 *
 * @author jojo
 */
const BusInfoNavigator = ({ busNum, clickHandler }: Proptypes) => {
  const busNumText = busNum + '호차';
  return (
    <StyledBusInfoNavigator>
      <BusInfoNavigatorContainer>
        <FaChevronLeft size={30} onClick={() => clickHandler('left')} />
        <BusNumberContainer>
          <Text size={2.5} bold>
            {busNumText}
          </Text>
        </BusNumberContainer>
        <FaChevronRight size={30} onClick={() => clickHandler('right')} />
      </BusInfoNavigatorContainer>
    </StyledBusInfoNavigator>
  );
};

export default BusInfoNavigator;
