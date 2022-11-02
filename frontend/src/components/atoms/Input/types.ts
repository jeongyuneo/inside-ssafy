import { ChangeEvent, ChangeEventHandler } from 'react';
import { AccountValueTypes } from '../../molecules/InputLabel/types';
import { LoginInputsType } from '../../pages/Login/types';

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
  inputs?: AccountValueTypes | LoginInputsType;
  value?: string;
  changeHandler?: (e: ChangeEvent<HTMLInputElement>) => void;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}
