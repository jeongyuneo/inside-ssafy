export interface ImageWrapperPropTypes {
  width: number;
  height?: number;
}
export interface ImagePropTypes {
  src: string;
  alt: string;
}
export interface PropTypes extends ImagePropTypes, ImageWrapperPropTypes {}
