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
  backgroundColor?: string;
  changeHandler?: (e: SelectChangeEvent<string>) => void;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}
