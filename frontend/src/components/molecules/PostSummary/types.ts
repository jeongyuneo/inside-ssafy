import { PropTypes } from '../LikeComment/types';

export interface PostSummaryTypes extends PropTypes {
  title: string;
  createdDate: string;
  postId: number;
  clickPostItemHandler?: (postId: number) => void;
}
