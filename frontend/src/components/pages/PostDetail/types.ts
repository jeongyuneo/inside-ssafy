import { CommentResponseTypes } from '../../organisms/CommentSection/types';
import { PostSectionTypes } from '../../organisms/PostSection/types';

export interface PostDetailTypes extends PostSectionTypes {
  commentResponses: CommentResponseTypes[];
}
