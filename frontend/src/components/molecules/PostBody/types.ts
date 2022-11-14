export interface StyledPostBodyTypes {
  width?: number;
  height?: number;
}

export interface PropTypes extends StyledPostBodyTypes {
  contents: string;
  likeCount: number;
  commentCount: number;
  imgSrc?: string;
}
