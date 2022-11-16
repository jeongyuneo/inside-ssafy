import { CommonCommentTypes } from '../../organisms/CommentSection/types';

export interface CommentCardTypes extends CommonCommentTypes {
  commentId: number;
  clickReCommentHandler: (id?: number) => void;
  clickDeleteHandler: (id?: number) => void;
}

export interface StyledCommentCardTypes {
  isReComment: boolean;
}

export interface PropTypes extends CommentCardTypes, StyledCommentCardTypes {}
