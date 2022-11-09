import styled from 'styled-components';
import { MenuCardsTypes } from './types';

export const StyledMenuCards = styled.div<MenuCardsTypes>`
  width: ${({ width }) => width || 22}rem;
  height: ${({ height }) => height || 80}vh;
  background-color: ${({ backgroundColor }) => backgroundColor || '#d1ebfa'};
  display: flex;
  flex-direction: column;
  justify-contents: center;
  align-items: center;
  padding-top: 0.5rem;
  padding-bottom: 1rem;
  overflow: auto;
  &::-webkit-scrollbar {
    background-color: ${({ backgroundColor }) => backgroundColor || '#d1ebfa'};
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
