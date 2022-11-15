import { ChangeEvent, ChangeEventHandler } from 'react';
import { CommentInputTypes } from '../../molecules/CommentInput/types';
import { AccountValueTypes } from '../../pages/Join/types';
import { LoginInputsType } from '../../pages/Login/types';
import { ChangePasswordType } from '../../pages/MyInfoEdit/types';

export interface PropTypes {
  name: string;
  width?: number;
  height?: number;
  fontSize?: number;
  textColor?: string;
  backgroundColor?: string;
  type?: string;
  id?: string;
  placeholder?: string;
  disabled?: boolean;
  borderRadius?: number;
  paddingLeft?: number;
  inputs?:
    | AccountValueTypes
    | LoginInputsType
    | ChangePasswordType
    | CommentInputTypes;
  value?: string;
  changeHandler?: (e: ChangeEvent<HTMLInputElement>) => void;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}
