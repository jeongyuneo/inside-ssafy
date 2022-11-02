import styled, { css } from 'styled-components';
import { PropTypes } from './types';

export const StyledButtonGroup = styled.div<PropTypes>`
  ${({ isColumn }) =>
    isColumn &&
    css`
      flex-direction: column;
    `}

  display: flex;
  gap: 1rem;
`;
