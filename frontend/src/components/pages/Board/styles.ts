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
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  // width: 3.5rem;
  // height: 3.5rem;
  // background-color: white;
  // border: 0.1rem solid black;
  border-radius: 2rem;
  align-items: center;
  justify-content: center;
`;
