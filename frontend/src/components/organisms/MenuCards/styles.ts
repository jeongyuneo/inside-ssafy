import styled from 'styled-components';
import { StyledMenuCardsType } from './types';

export const StyledMenuCards = styled.div<StyledMenuCardsType>`
  width: 24rem;
  height: 70vh;
  background-color: ${({ backgroundColor }) => backgroundColor || '#d1ebfa'};
  display: flex;
  flex-direction: column;
  justify-contents: center;
  align-items: center;
  padding-top: 0.5rem;
  padding-bottom: 1rem;
  border-radius: 1rem;
  overflow: auto;
  &::-webkit-scrollbar {
    background-color: ${({ backgroundColor }) => backgroundColor || '#d1ebfa'};
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
    width: 1rem;
  }
  ::-webkit-scrollbar-thumb {
    width: 10px;
    background-color: #d9d9d9;
    border-radius: 1rem;
  }
  gap: 0.5rem;
`;

export const MenuCardsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-contents: center;
  gap: 0.5rem;
`;

export const MenuCardWrapper = styled.div`
  width: 20rem;
`;
