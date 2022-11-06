import styled from 'styled-components';
import { StyledRefreshButtonPropTypes } from './types';

export const StyledRefreshButton = styled.div<StyledRefreshButtonPropTypes>`
  width: ${({ wrapperSize }) => wrapperSize}rem;
  height: ${({ wrapperSize }) => wrapperSize}rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.1rem solid gray;
  border-radius: 50%;
`;
