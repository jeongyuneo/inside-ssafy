import { ChangeEvent } from 'react';

export interface accountValueTypes {
  userId?: string;
  userPw?: string;
  email?: string;
  address?: string;
  studentNum?: string;
}

export interface PropTypes extends accountValueTypes {
  labelValue: string;
  labelColor?: string;
  labelFontSize?: number;
  id: string;
  name?: string;
  height?: number;
  width?: number;
  type?: string;
  changeHandler?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  inputFontSize?: number;
  inputTextColor?: string;
  inputBackgroundColor?: string;
  value?: string;
}
