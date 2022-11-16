import { PostSummaryItemTypes } from '../../molecules/PostSummary/types';

export interface PropsTypes {
  items: PostSummaryItemTypes[];
  clickPostItemHandler: (postId: number) => void;
}
