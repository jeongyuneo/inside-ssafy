import {
  ChangeEvent,
  ChangeEventHandler,
  ForwardedRef,
  KeyboardEvent,
} from 'react';
import { CommentInputTypes } from '../../molecules/CommentInput/types';
import { SearchInputType } from '../../molecules/SearchBar/types';
import { AccountValueTypes } from '../../pages/Join/types';
import { LoginInputsType } from '../../pages/Login/types';
import { ChangePasswordType } from '../../pages/MyInfoEdit/types';
import { PostInputType } from '../../pages/CreatePost/types';

export interface PropTypes {
  name: string;
  width?: number;
  height?: number;
  fontSize?: number;
  textColor?: string;
  backgroundColor?: string;
  type?: string;
  id?: string;
  accept?: string;
  placeholder?: string;
  disabled?: boolean;
  borderRadius?: number;
  paddingLeft?: number;
  inputs?:
    | AccountValueTypes
    | LoginInputsType
    | ChangePasswordType
    | CommentInputTypes
    | PostInputType
    | SearchInputType;
  value?: string;
  ref?: ForwardedRef<HTMLInputElement>;
  changeHandler?: (e: ChangeEvent<HTMLInputElement>) => void;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  pressKeyHandler?: (e: KeyboardEvent<HTMLInputElement>) => void;
}
