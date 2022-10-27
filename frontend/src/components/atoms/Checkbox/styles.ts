import styled, { css } from 'styled-components';
import { PropTypes } from './types';

export const StyledCheckbox = styled.input<PropTypes>`
  ${({ size }) =>
    size &&
    css`
      zoom: ${size};
    `}

  border-radius: 100%;
  accent-color: #01a7eb;
`;
