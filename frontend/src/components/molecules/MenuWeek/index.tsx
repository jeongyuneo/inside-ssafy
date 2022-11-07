import React from 'react';
import Text from '../../atoms/Text';
import { StyledMenuWeek, TextWrapper } from './styles';
import { PropTypes } from './types';

/**
 * MenuWeek 컴포넌트
 *
 * @author jun
 */
const MenuWeek = ({ startDate, endDate }: PropTypes) => {
  return (
    <StyledMenuWeek>
      <TextWrapper>
        <Text size={1.6}> 이번주 식단</Text>
        <Text size={1}>{`${startDate} ~ ${endDate}`}</Text>
      </TextWrapper>
    </StyledMenuWeek>
  );
};

export default MenuWeek;
