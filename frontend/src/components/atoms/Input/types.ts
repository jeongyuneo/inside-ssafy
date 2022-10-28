import { ChangeEventHandler } from 'react';

export interface PropTypes {
  width?: number;
  height?: number;
  fontSize?: number;
  textColor?: string;
  backgroundColor?: string;
  changeHandler?: (name: string, value: string) => void;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
  textType?: string;
  name?: string;
  id?: string;
  placeholder?: string;
  borderRadius?: number;
}
