import styled from 'styled-components';

export const StyledBoard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: linear-gradient(rgb(12, 235, 176, 0.14), white);
  padding-top: 1rem;
  align-items: center;
  gap: 1rem;
`;

export const PostsWrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 1rem;
`;

export const StyledButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 1.5rem;
  right: 2rem;
  width: 3.5rem;
  height: 3.5rem;
  background: ${`#01A7EB`};
  border-radius: 2rem;
  box-shadow: 2px 2px 10px rgb(0, 0, 0, 0.5);
`;
