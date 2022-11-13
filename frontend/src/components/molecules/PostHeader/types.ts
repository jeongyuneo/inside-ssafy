import { MouseEventHandler } from 'react';

export interface PropTypes {
  title: string;
  createTime: string;
  myPost: boolean;
  width?: number;
  backButtonClickHandler?: MouseEventHandler<HTMLButtonElement>;
  menuButtonClickHandler?: MouseEventHandler<HTMLButtonElement>;
}
