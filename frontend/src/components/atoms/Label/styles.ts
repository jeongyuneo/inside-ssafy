import styled, { css } from 'styled-components';
import { PropTypes } from './types';

export const StyledLabel = styled.label<PropTypes>`
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

  ${({ textColor, backgroundColor }) =>
    css`
      color: ${textColor || 'none'};
      background-color: ${backgroundColor};
    `}

  border: none;
`;
