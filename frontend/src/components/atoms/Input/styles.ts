import styled, { css } from 'styled-components';
import { PropTypes } from './types';

export const StyledInput = styled.input<PropTypes>`
  ${({ width }) =>
    width &&
    css`
      width: ${width}rem;
    `}

  ${({ height }) =>
    height &&
    css`
      height: ${height}rem;
    `}

  ${({ fontSize }) =>
    fontSize &&
    css`
      font-size: ${fontSize}rem;
    `}

  color: ${({ textColor }) => textColor || 'black'};
  background-color: ${({ backgroundColor }) => backgroundColor || '#D1EBFA'};
  border: none;
  outline: none;
  padding-left: 0.5rem;
  border-radius: 0.4rem;
`;
