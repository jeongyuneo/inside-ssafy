import styled, { css } from 'styled-components';
import { PropTypes } from './types';

export const StyledText = styled.div<PropTypes>`
  ${({ color }) =>
    color &&
    css`
      color: ${color};
    `}

  ${({ size }) =>
    size &&
    css`
      font-size: ${size}rem;
    `}
`;
