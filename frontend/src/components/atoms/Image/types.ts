export interface ImageWrapperPropTypes {
  width: string;
  height?: string;
  clickHandler?: () => void;
}

export interface ImagePropTypes {
  src: string;
  alt: string;
  isCircle?: boolean;
}

export interface PropTypes extends ImagePropTypes, ImageWrapperPropTypes {}
