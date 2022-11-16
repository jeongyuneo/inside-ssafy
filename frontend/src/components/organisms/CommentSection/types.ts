interface CommonCommentTypes {
  content: string;
  createdDate: string;
  editable: boolean;
  isPostWriter: boolean;
}

export interface ReCommentResponseTypes extends CommonCommentTypes {
  reCommentId: number;
}

export interface CommentResponseTypes extends CommonCommentTypes {
  commentId: number;
  reCommentResponses: ReCommentResponseTypes[];
}

export interface PropTypes {
  commentResponses: CommentResponseTypes[];
  clickReCommentHandler: (id?: number) => void;
  clickDeleteHandler: (id?: number) => void;
}
