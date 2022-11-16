export interface CommentCardTypes {
  commentId: number;
  content: string;
  createdDate: string;
  editable: boolean;
  isPostWriter: boolean;
  clickReCommentHandler: (id?: number) => void;
  clickDeleteHandler: (id?: number) => void;
}

export interface StyledCommentCardTypes {
  isReComment: boolean;
}

export interface PropTypes extends CommentCardTypes, StyledCommentCardTypes {}
