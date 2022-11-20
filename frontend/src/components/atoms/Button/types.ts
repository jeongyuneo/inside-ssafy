import { MouseEventHandler } from 'react';

export interface ButtonPropTypes {
  width?: number;
  height?: number;
  fontSize?: number;
  textColor?: string;
  backgroundColor?: string;
  isText?: boolean;
  disabled?: boolean;
  borderColor?: string;
  clickHandler?: MouseEventHandler<HTMLButtonElement>;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface PropTypes extends ButtonPropTypes {
  children: string | JSX.Element;
}
