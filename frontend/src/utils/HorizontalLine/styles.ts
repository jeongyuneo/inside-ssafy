import styled, { css } from 'styled-components';
import { PropTypes } from './types';

export const StyledHorizontalLine = styled.div<PropTypes>`
  ${({ width }) =>
    width &&
    css`
      width: ${width};
    `}

  margin-top: 1rem;
`;
