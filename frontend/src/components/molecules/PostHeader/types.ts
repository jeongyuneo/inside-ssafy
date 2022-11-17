export interface PostHeaderHandlersTypes {
  clickBackButtonHandler: () => void;
  clickMenuButtonHandler: () => void;
  clickLikeButtonHandler: () => void;
}

export interface PostHeaderTypes {
  title: string;
  createdDate: string;
  editable: boolean;
  hasPostLike: boolean;
}

export interface PropTypes extends PostHeaderTypes, PostHeaderHandlersTypes {}
