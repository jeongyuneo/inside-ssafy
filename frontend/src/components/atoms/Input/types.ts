import { ChangeEvent, ChangeEventHandler } from 'react';
import { AccountValueTypes } from '../../molecules/InputLabel/types';

export interface PropTypes {
  name: string;
  width?: number;
  height?: number;
  fontSize?: number;
  textColor?: string;
  backgroundColor?: string;
  type?: string;
  id?: string;
  placeholder?: string;
  borderRadius?: number;
  paddingLeft?: number;
  inputs?: AccountValueTypes;
  value?: string;
  changeHandler?: (e: ChangeEvent<HTMLInputElement>) => void;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}
