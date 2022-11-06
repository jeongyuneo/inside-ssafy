import styled, { css } from 'styled-components';
import { PropTypes } from './types';

export const StyledMenuCard = styled.div<PropTypes>`
  background-color: ${({ backgroundColor }) => backgroundColor || 'white'};
  display: flex;
  flex-direction: column;
  text-align-last: center;
  width: 100%;
  border-radius: 1rem;
  border: 1px solid black;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
`;

export const StyledTitle = styled.div`
  gap: 0.2rem;
  display: flex;
  flex-direction: column;
`;

export const StyledMenu = styled.div`
  gap: 0.2rem;
  display: flex;
  flex-direction: column;
`;
export const StyledSubMenu = styled.div`
  gap: 0.2rem;
  display: flex;
  flex-direction: column;
`;

export const StyledHr = styled.hr`
  margin-top: 0.2rem;
  margin-bottom: 0.3rem;
  width: 95%;
  border-bottom: 0;
  border-left: 0;
  border-right: 0;
`;
