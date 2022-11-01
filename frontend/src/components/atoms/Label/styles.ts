import styled, { css } from 'styled-components';
import { PropTypes } from './types';

const DEFAULT_FONTSIZE = 0.8;
const DEFAULT_TEXTCOLOR = 'black';
export const StyledLabel = styled.label<PropTypes>`
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

  border: none;
`;
