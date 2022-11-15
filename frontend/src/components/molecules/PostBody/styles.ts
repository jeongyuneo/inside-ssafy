import styled, { css } from 'styled-components';
import { StyledPostBodyTypes } from './types';

export const StyledPostBody = styled.div<StyledPostBodyTypes>`
  ${({ width }) =>
    css`
      width: ${width || 23}rem;
    `}
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
`;

export const ImageWrapper = styled.div<StyledPostBodyTypes>`
  ${({ width }) =>
    css`
      width: ${width || 24}rem;
    `}
  height: auto;

  display: flex;
  justify-content: center;
  padding-left: 1rem;
  padding-right: 1rem;
`;

export const ContentWrapper = styled.div``;

export const LikeWrapper = styled.div`
  padding-top: 2rem;
  display: flex;
  width: 100%;
  justify-content: end;
`;
