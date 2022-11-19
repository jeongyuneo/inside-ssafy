import { CommonCommentTypes } from '../../organisms/CommentSection/types';

export interface CommentHandlersType {
  clickReCommentHandler: (comment: number) => void;
  clickDeleteHandler: (commentId: number, isReComment: boolean) => void;
}

export interface CommentCardTypes
  extends CommonCommentTypes,
    CommentHandlersType {
  commentId: number;
  commentIdWritingRecomment: number;
}

export interface StyledCommentCardTypes {
  isReComment: boolean;
  isWritingRecomment: boolean;
}

export interface PropTypes extends CommentCardTypes {
  isReComment: boolean;
}
