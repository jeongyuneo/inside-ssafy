import { ChangeEvent, KeyboardEvent } from 'react';

export interface CommentInputTypes {
  [key: string]: string;
  comment: string;
}

export interface CommentInputPropTypes {
  inputs: CommentInputTypes;
  clickSubmitHandler: () => void;
  changeCommentInputHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  pressEnterHandler: (e: KeyboardEvent<HTMLInputElement>) => void;
}
