import { ChangeEvent } from 'react';

export interface SearchInputType {
  [key: string]: string;
  value: string;
}

export interface PropTypes {
  name: string;
  inputs?: SearchInputType;
  changeInputHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  clickSearchButtonHandler: () => void;
}
