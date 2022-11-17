import styled, { css } from 'styled-components';
import { PropTypes } from './types';

export const StyledHorizontalLine = styled.hr<PropTypes>`
  ${({ width }) =>
    width &&
    css`
      width: ${width};
    `}
`;
