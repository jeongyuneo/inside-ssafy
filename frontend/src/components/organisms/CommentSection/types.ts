import { CommentHandlersType } from '../../molecules/CommentCard/types';
import { CommentInputPropTypes } from '../../molecules/CommentInput/types';

export interface CommonCommentTypes {
  content: string;
  createdDate: string;
  editable: boolean;
  postWriter: boolean;
}

export interface ReCommentResponseTypes extends CommonCommentTypes {
  reCommentId: number;
}

export interface CommentResponseTypes extends CommonCommentTypes {
  commentId: number;
  reCommentResponses: ReCommentResponseTypes[];
}

export interface PropTypes extends CommentHandlersType, CommentInputPropTypes {
  commentIdWritingRecomment: number;
  commentResponses: CommentResponseTypes[];
}
