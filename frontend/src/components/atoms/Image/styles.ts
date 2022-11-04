import styled, { css } from 'styled-components';
import { ImageWrapperPropTypes } from './types';

export const ImageWrapper = styled.div<ImageWrapperPropTypes>`
  width: ${({ width }) => width};
  height: ${({ height }) => height || '100%'};
  ${({ onClick }) =>
    onClick &&
    css`
      cursor: pointer;
    `}
`;

export const StyledImage = styled.img`
  width: 100%;
  height: 100%;
`;
