import { ChangeEvent } from 'react';

export interface SearchInputType {
  [key: string]: string;
  value: string;
}

export interface PropTypes {
  name: string;
  inputs?: SearchInputType;
  clickBackButtonHandler: () => void;
  clickSearchButtonHandler: () => void;
  changeInputHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}
