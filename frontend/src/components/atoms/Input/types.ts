import { ChangeEventHandler } from 'react';

export interface PropTypes {
  width?: number;
  height?: number;
  fontSize?: number;
  textColor?: string;
  backgroundColor?: string;
  changeHandler?: (index: string, value: string) => void;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
  type?: string;
  name?: string;
  id?: string;
  index?: string;
  placeholder?: string;
  borderRadius?: number;
  paddingLeft?: number;
}
