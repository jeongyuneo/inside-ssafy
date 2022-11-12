export interface LikeBusType {
  previousBusStop: string;
  nextBusStop: string;
}

export interface MainDataType {
  busLikes: number[];
  menu: {
    items: string[];
    subItems: string[];
  };
  hotPosts: Array<{
    postId: number;
    title: string;
    likeCount: number;
    commentCount: number;
    createdDate: string;
  }>;
}
