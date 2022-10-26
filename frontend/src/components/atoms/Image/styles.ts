import styled from 'styled-components';
import { ImageWrapperPropTypes } from './types';

export const ImageWrapper = styled.div<ImageWrapperPropTypes>`
  width: ${({ width }) => width}rem;
  height: ${({ height }) => height || '100%'};
`;

export const StyledImage = styled.img``;
