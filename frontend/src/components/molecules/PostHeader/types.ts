export interface StyledPostHeaderType {
  width?: number;
}

export interface PropTypes extends StyledPostHeaderType {
  title: string;
  createTime: string;
  isMyPost: boolean;
  clickBackButtonHandler: () => void;
  clickMenuButtonHandler: () => void;
}
