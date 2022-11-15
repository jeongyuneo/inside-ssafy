import styled from 'styled-components';

export const ModalBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.25);
`;

export const StyledBusInfoImageModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: absolute;
  width: 70%;
  background-color: rgba(256, 256, 256, 0.9);
  border-radius: 1rem;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 7rem;
  gap: 1rem;
`;
