import styled, { css } from 'styled-components';
import { PropTypes } from './types';

export const StyledPostHeader = styled.div<PropTypes>`
  ${({ width }) =>
    css`
      width: ${width || 25}rem;
    `}
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const ButtonWrapper = styled.div`
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const PostWrapper = styled.div``;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  padding-right: 0.5rem;
`;
