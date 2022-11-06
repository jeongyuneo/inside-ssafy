import styled, { css } from 'styled-components';
import { PropTypes } from './types';

export const StyledMenuCard = styled.div<PropTypes>`
  width: 100%;
  border-radius: 1rem;
  text-align: center;
  border: 1px solid black;
  background-color: ${({ backgroundColor }) => backgroundColor || 'white'};
`;

export const StyledTitle = styled.div`
  font-size: 1rem;
`;

export const StyledMenu = styled.div`
  line-height: 1.2rem;
`;
export const StyledSubMenu = styled.div`
  line-height: 1.2rem;
`;

export const StyledHr = styled.hr`
  margin: 0.5rem;
  margin-bottom: 0;
  box-shadow: 0;
  border-bottom: 0;
  border-left: 0;
  border-right: 0;
`;
