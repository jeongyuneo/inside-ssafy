import { ChangeEvent } from 'react';
import { AccountValueTypes } from '../../pages/Join/types';
import { LoginInputsType } from '../../pages/Login/types';
import { ChangePasswordType } from '../../pages/MyInfoEdit/types';
import { PostInputType } from '../../pages/CreatePost/types';

export interface PropTypes {
  id: string;
  name: string;
  labelValue: string;
  inputs?:
    | AccountValueTypes
    | LoginInputsType
    | ChangePasswordType
    | PostInputType;
  width?: number;
  height?: number;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  inputFontSize?: number;
  inputTextColor?: string;
  inputBackgroundColor?: string;
  labelColor?: string;
  labelFontSize?: number;
  changeHandler?: (e: ChangeEvent<HTMLInputElement>) => void;
}
