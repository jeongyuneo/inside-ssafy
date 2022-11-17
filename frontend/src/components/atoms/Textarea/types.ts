import { ChangeEvent, ChangeEventHandler } from 'react';

export interface PropTypes {
  id: string;
  name: string;
  width?: number;
  height?: number;
  fontSize?: number;
  backgroundColor?: string;
  textareaValue?: string;
  placeholder?: string;
  changeHandler?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
}
