import styled, { css } from 'styled-components';

export const StyledPostHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const ButtonWrapper = styled.div`
  padding-left: 0.5rem;
  padding-right: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: start;
`;

export const PostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 1rem;
  padding-right: 1rem;
  justify-content: space-between;
`;

export const DateWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: end;
  padding-right: 1rem;
  padding-left: 1rem;
`;
