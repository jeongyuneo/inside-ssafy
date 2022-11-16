import { PostSummaryTypes } from '../../molecules/PostSummary/types';

export interface PropsTypes {
  items: PostSummaryTypes[];
  clickPostItemHandler: (postId: number) => void;
}
