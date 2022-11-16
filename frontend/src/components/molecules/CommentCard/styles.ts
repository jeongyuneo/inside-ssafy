import styled, { css } from 'styled-components';
import { StyledCommentCardTypes } from './types';

export const StyledCommentCard = styled.div<StyledCommentCardTypes>`
  ${({ isReComment }) =>
    isReComment &&
    css`
      background-color: #e7e7e7;
    `}
  display: flex;
  flex-direction: column;
  width: 90%;
  padding: 1rem;
  border-radius: 1rem;
`;

export const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const IconButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;
