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

  ${({ isText, textColor, backgroundColor, disabled }) =>
    isText
      ? css`
          color: black;
          background: none;
        `
      : css`
          color: ${textColor || 'white'};
          background-color: ${backgroundColor || '#01A7EB'};
          ${disabled
            ? 'filter: brightness(80%)'
            : `
            // 모바일 환경이 아닐 때에만 hover 사용
            @media(hover: hover) and (pointer: fine) {
              &:hover {
                filter: brightness(80%);
                transition: all 0.1s;
                box-shadow: 1px 1px 1px rgb(0, 0, 0, 0.5);
              }
            }
            &:active {
              border-bottom-width: 1px;
              transition: all 0.1s;
              box-shadow: none;
            }
          `};
        `}

  ${({ borderColor }) =>
    borderColor
      ? css`
          border: 1px solid ${borderColor};
        `
      : css`
          border: none;
        `}
  border-radius: 1rem;
  ${({ disabled }) =>
    !disabled &&
    css`
      cursor: pointer;
    `}

  font-weight: bold;
`;
