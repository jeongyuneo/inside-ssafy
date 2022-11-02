import React from 'react';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';
import {
  BusInfoNavigatorContainer,
  BusNumberContainer,
  StyledBusInfoNavigator,
} from './styles';
import { Proptypes } from './types';

const BusInfoNavigator = ({ busNum, clickHandler }: Proptypes) => {
  return (
    <StyledBusInfoNavigator>
      <BusInfoNavigatorContainer>
        <AiFillCaretLeft onClick={() => clickHandler('left')} color="#D1EBFA" />
        <BusNumberContainer>{busNum}호차</BusNumberContainer>
        <AiFillCaretRight
          onClick={() => clickHandler('right')}
          color="#D1EBFA"
        />
      </BusInfoNavigatorContainer>
    </StyledBusInfoNavigator>
  );
};

export default BusInfoNavigator;
