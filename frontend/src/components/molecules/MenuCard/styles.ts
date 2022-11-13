import styled, { css } from 'styled-components';
import { StyledMenuCardType } from './types';

export const StyledMenuCard = styled.div<StyledMenuCardType>`
  background-color: ${({ backgroundColor }) => backgroundColor || 'white'};
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-radius: 1rem;
  border: 1px solid black;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
`;

export const StyledTitle = styled.div`
  display: flex;
`;

export const StyledMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
`;
export const StyledSubMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
`;

export const StyledHr = styled.hr`
  margin-top: 0.2rem;
  margin-bottom: 0.3rem;
  width: 95%;
  border-bottom: 0;
  border-left: 0;
  border-right: 0;
`;

export const StyledBr = styled.br``;
