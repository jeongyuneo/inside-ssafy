import { ChangeEvent, ChangeEventHandler } from 'react';

export interface PropTypes {
  width?: number;
  height?: number;
  fontSize?: number;
  textColor?: string;
  backgroundColor?: string;
  changeHandler?: (e: ChangeEvent<HTMLInputElement>) => void;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  type?: string;
  name?: string;
  id?: string;
  placeholder?: string;
  borderRadius?: number;
  paddingLeft?: number;

  value?: string;
}
