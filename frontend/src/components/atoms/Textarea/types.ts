import { ChangeEvent, ChangeEventHandler } from 'react';

export interface PropTypes {
  id: string;
  name: string;
  defaultValue?: string;
  width?: string;
  height?: string;
  fontSize?: number;
  backgroundColor?: string;
  placeholder?: string;
  disabled?: boolean;
  changeHandler?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
}
