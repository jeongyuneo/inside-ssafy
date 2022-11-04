export interface ImageWrapperPropTypes {
  width: string;
  height?: string;
  clickHandler?: () => void;
}

export interface ImagePropTypes {
  src: string;
  alt: string;
}

export interface PropTypes extends ImagePropTypes, ImageWrapperPropTypes {}
