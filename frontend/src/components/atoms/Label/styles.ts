import styled, { css } from 'styled-components';
import { PropTypes } from './types';

const default_fontSize = 0.8;
const default_textColor = 'black';
export const StyledLabel = styled.label<PropTypes>`
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

  border: none;
`;
