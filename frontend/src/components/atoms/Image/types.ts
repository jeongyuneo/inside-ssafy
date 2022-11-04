export interface ImageWrapperPropTypes {
  width: string;
  height?: string;
}

export interface ImagePropTypes {
  src: string;
  alt: string;
}

export interface PropTypes extends ImagePropTypes, ImageWrapperPropTypes {}
