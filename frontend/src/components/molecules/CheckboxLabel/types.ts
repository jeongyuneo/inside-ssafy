import { ChangeEvent } from 'react';

export interface StyledCheckboxLabelPropTypes {
  isColumn?: boolean;
}

export interface PropTypes extends StyledCheckboxLabelPropTypes {
  text: string;
  id: string;
  checked: boolean;
  toggleHandler: () => void;
}
