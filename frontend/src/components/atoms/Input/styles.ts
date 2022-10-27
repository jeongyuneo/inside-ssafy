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
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    filter: brightness(90%);
    transition: all 0.1s;
    box-shadow: 1px 1px 1px rgb(0, 0, 0, 0.5);
  }
`;
