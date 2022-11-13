import { MouseEventHandler } from 'react';

export interface PropTypes {
  title: string;
  createTime: string;
  myPost: boolean;
  width?: number;
  clickBackButtonHandler?: MouseEventHandler<HTMLButtonElement>;
  clickMenuButtonHandler?: MouseEventHandler<HTMLButtonElement>;
}
