import { ChangeEvent } from 'react';

export interface CommentInputTypes {
  [key: string]: string;
  comment: string;
}

export interface PropTypes {
  inputs: CommentInputTypes;
  clickSubmitHandler: () => void;
  changeHandler?: (e: ChangeEvent<HTMLInputElement>) => void;
}
