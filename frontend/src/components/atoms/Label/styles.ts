import styled, { css } from 'styled-components';
import { PropTypes } from './types';

export const StyledLabel = styled.label<PropTypes>`
  ${({ fontSize }) =>
    fontSize &&
    css`
      font-size: ${fontSize}rem;
    `}

  ${({ textColor }) =>
    css`
      color: ${textColor || 'none'};
    `}

  ${({ backgroundColor }) => css`
    background-color: ${backgroundColor};
  `}
  
  border: none;
`;
