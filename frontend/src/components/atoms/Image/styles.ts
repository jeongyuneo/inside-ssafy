import styled, { css } from 'styled-components';
import { ImageWrapperPropTypes, ImagePropTypes } from './types';

export const ImageWrapper = styled.div<ImageWrapperPropTypes>`
  ${({ onClick }) =>
    onClick &&
    css`
      cursor: pointer;
    `}
  width: ${({ width }) => width};
  height: ${({ height }) => height || '100%'};
`;

export const StyledImage = styled.img<ImagePropTypes>`
  ${({ isCircle }) =>
    isCircle &&
    css`
      object-fit: cover;
      border-radius: 50%;
    `}
  width: 100%;
  height: 100%;
`;
