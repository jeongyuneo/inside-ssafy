export interface PropTypes {
  title: string;
  createTime: string;
  isMyPost: boolean;
  isLike: boolean;
  contents: string;
  likeCount: number;
  commentCount: number;
  imgSrc?: string;
  clickBackButtonHandler: () => void;
  clickMenuButtonHandler: () => void;
  clickLikeButtonHandler: () => void;
}
