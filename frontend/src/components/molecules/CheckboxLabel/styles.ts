import styled, { css } from 'styled-components';
import { StyledCheckboxLabelPropTypes } from './types';

export const StyledCheckboxLabel = styled.div<StyledCheckboxLabelPropTypes>`
  ${({ isColumn }) =>
    isColumn &&
    css`
      flex-direction: column;
    `}

  display: flex;
  gap: 1rem;
  align-items: center;
`;
