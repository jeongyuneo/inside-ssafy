import styled, { css } from 'styled-components';
import { PropTypes } from './types';

export const StyledButton = styled.button<PropTypes>`
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

  ${({ isText, textColor, backgroundColor }) =>
    isText
      ? css`
          color: black;
          background: none;
        `
      : css`
          color: ${textColor || 'white'};
          background-color: ${backgroundColor || '#01A7EB'};

          &:hover {
            filter: brightness(80%);
            transition: all 0.1s;
            box-shadow: 1px 1px 1px rgb(0, 0, 0, 0.5);
          }

          &:active {
            border-bottom-width: 1px;
            transition: all 0.1s;
            box-shadow: none;
          }
        `}

  border: none;
  border-radius: 1rem;
  cursor: pointer;
  font-weight: bold;
`;
