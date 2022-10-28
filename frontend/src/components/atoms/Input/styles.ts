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

  ${({ paddingLeft }) =>
    paddingLeft &&
    css`
      padding-left: ${paddingLeft}rem;
    `}

  ${({ borderRadius }) =>
    borderRadius &&
    css`
      border-radius: ${borderRadius}rem;
    `}
`;
