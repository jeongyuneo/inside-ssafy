import { ButtonPropTypes } from '../../atoms/Button/types';

export interface PropTypes extends ButtonPropTypes {
  buttonInfos?: Array<{
    text: string;
    clickHandler: () => void;
  }>;
  isColumn?: boolean;
}
