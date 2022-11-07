import styled from 'styled-components';

export const StyledFavoriteBusBody = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 1rem;
`;

export const CurrentBusLocation = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  height: 6.5rem;
  border: 1px solid black;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  gap: 0.5rem;
  overflow-y: auto;
`;

export const EachLocation = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 1rem;
`;

export const TextWrapper = styled.div`
  width: 70%;
`;
