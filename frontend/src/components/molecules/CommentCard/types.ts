export interface CommentCardTypes {
  writer: string;
  content: string;
  createdDate: string;
  editable: boolean;
}

export interface StyledCommentCardTypes {
  isRecomment: boolean;
}

export interface PropTypes extends CommentCardTypes, StyledCommentCardTypes {}
