import { SelectChangeEvent } from '@mui/material';
import { ChangeEventHandler } from 'react';
import { AccountValueTypes } from '../../pages/Join/types';

export interface PropTypes {
  inputs: string[];
  id: string;
  labelName: string;
  value?: AccountValueTypes;
  width?: number;
  height?: number;
  fontSize?: number;
  textColor?: string;
  backgroundColor?: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  borderRadius?: number;
  paddingLeft?: number;
  changeHandler?: (e: SelectChangeEvent<string>) => void;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}
