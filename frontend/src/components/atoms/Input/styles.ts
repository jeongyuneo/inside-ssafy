import styled, { css } from 'styled-components';
import { PropTypes } from './types';

const default_fontSize = 0.8;
const default_textColor = 'black';
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
          font-size: ${fontSize || default_fontSize}rem;
        `
      : css`
          font-size: ${default_fontSize}rem;
        `}

  ${({ textColor }) =>
    textColor
      ? css`
          color: ${textColor || default_textColor};
        `
      : css`
          color: ${default_textColor};
        `}
  
  background-color: ${({ backgroundColor }) => backgroundColor || '#D1EBFA'};
  border: none;
  outline: none;
  padding-left: 0.5rem;
  border-radius: 0.4rem;
`;
