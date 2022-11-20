import styled, { css } from 'styled-components';

export const FlexContainer = styled.div`
  height: 100vh;
  background: linear-gradient(rgb(12, 235, 176, 0.14), white);
`;

export const StyledCreatePost = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

export const ImgWrapper = styled.div`
  display: flex;
  justify-content: start;
  width: 80%;
  height: 30%;
  gap: 1rem;
`;
