import { PropTypes } from '../LikeComment/types';

export interface PostSummaryItemTypes extends PropTypes {
  title: string;
  createdDate: string;
  postId: number;
}

export interface PostSummaryTypes extends PostSummaryItemTypes {
  clickPostItemHandler?: (postId: number) => void;
}
