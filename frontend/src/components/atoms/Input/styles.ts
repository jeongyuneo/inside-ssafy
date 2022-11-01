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

  ${({ fontSize }) =>
    fontSize
      ? css`
          font-size: ${fontSize}rem;
        `
      : css`
          font-size: ${DEFAULT_FONTSIZE}rem;
        `}

  ${({ textColor }) =>
    textColor
      ? css`
          color: ${textColor || DEFAULT_TEXTCOLOR};
        `
      : css`
          color: ${DEFAULT_TEXTCOLOR};
        `}
  
  background-color: ${({ backgroundColor }) => backgroundColor || '#D1EBFA'};
  border: none;
  outline: none;
  padding-left: 0.5rem;
  border-radius: 0.4rem;
`;
