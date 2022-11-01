import styled, { css } from 'styled-components';
import { PropTypes } from './types';

const DEFAULT_FONTSIZE = 1;
const DEFAULT_TEXTCOLOR = 'black';
export const StyledLabel = styled.label<PropTypes>`
  ${({ fontSize }) => css`
    font-size: ${fontSize || DEFAULT_FONTSIZE}rem;
  `}

  ${({ textColor }) =>
    textColor
      ? css`
          color: ${textColor};
        `
      : css`
          color: ${DEFAULT_TEXTCOLOR};
        `}

  border: none;
`;
