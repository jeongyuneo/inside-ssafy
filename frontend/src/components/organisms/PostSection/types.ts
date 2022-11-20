import { PostBodyTypes } from '../../molecules/PostBody/types';
import {
  PostHeaderHandlersTypes,
  PostHeaderTypes,
} from '../../molecules/PostHeader/types';

interface FileTypes {
  url: string;
}

export interface PostSectionTypes extends PostHeaderTypes, PostBodyTypes {
  postId: number;
  files: FileTypes[];
}

export interface PropTypes extends PostSectionTypes, PostHeaderHandlersTypes {}
