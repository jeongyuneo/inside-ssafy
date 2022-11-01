import { ChangeEvent } from 'react';

export interface AccountValueTypes {
  [key: string]: string;
  userId: string;
  userPw: string;
  email: string;
  address: string;
  studentNum: string;
}

export interface PropTypes {
  id: string;
  name: string;
  labelValue: string;
  inputs?: AccountValueTypes;
  width?: number;
  height?: number;
  type?: string;
  placeholder?: string;
  inputFontSize?: number;
  inputTextColor?: string;
  inputBackgroundColor?: string;
  labelColor?: string;
  labelFontSize?: number;
  changeHandler?: (e: ChangeEvent<HTMLInputElement>) => void;
}
