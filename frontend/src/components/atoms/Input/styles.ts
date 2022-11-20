import styled, { css } from 'styled-components';
import { PropTypes } from './types';

const DEFAULT_FONTSIZE = 0.8;
const DEFAULT_TEXTCOLOR = 'black';
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

  ${({ fontSize }) => css`
    font-size: ${fontSize || DEFAULT_FONTSIZE}rem;
  `}

  ${({ textColor }) => css`
    color: ${textColor || DEFAULT_TEXTCOLOR};
  `}
  
  background-color: ${({ backgroundColor, disabled }) =>
    disabled ? '#C0DAE9' : backgroundColor || '#D1EBFA'};
  border: none;
  outline: none;
  padding-left: 0.5rem;
  border-radius: 1rem;
`;
