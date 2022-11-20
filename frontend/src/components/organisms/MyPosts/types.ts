export interface PostTypes {
  postId: number;
  title: string;
  likeCount: number;
  commentCount: number;
  createdDate: string;
}

export interface PostsTypes {
  postsInfo?: Array<PostTypes>;
  isContent?: boolean;
}

export interface PropTypes extends PostsTypes {
  clickPostItemHandler: (postId: number) => void;
}
