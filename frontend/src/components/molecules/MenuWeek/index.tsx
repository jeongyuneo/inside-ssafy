import React from 'react';
import Text from '../../atoms/Text';
import { StyledMenuWeek, TextWrapper } from './styles';
import { MenuWeekTypes } from './types';

/**
 * MenuWeek 컴포넌트
 *
 * @author jun
 */
const MenuWeek = ({ startDate, endDate }: MenuWeekTypes) => {
  return (
    <StyledMenuWeek>
      <TextWrapper>
        <Text size={1.6} bold>
          이번주 식단
        </Text>
        <Text size={1}>{`${startDate} ~ ${endDate}`}</Text>
      </TextWrapper>
    </StyledMenuWeek>
  );
};

export default MenuWeek;
