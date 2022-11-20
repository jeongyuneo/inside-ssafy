import styled, { css } from 'styled-components';
import { PostsTypes } from './types';

export const StyledMyPosts = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  gap: 1rem;
`;

export const PostSummaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #d1ebfa;
  height: 25rem;
  border-radius: 1rem;
  padding: 2rem;
  gap: 1rem;
  overflow-y: auto;
`;

export const TextWrapper = styled.div<PostsTypes>`
  ${({ isContent }) =>
    isContent &&
    css`
      justify-content: center;
    `}
  display: flex;
  padding-left: 1rem;
`;
