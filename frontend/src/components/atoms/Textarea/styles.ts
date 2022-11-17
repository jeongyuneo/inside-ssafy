import styled, { css } from 'styled-components';
import { PropTypes } from './types';

const DEFAULT_FONTSIZE = 0.8;
export const StyledTextarea = styled.textarea<PropTypes>`
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

  ${({ fontSize }) => css`
    font-size: ${fontSize || DEFAULT_FONTSIZE}rem;
  `}

  ${({ backgroundColor }) => css`
    background: ${backgroundColor || '#D1EBFA'};
  `}

  resize: none;
  border-radius: 1rem;
  border: none;
  outline: none;
`;
