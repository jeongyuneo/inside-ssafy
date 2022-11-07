export interface StyledRefreshButtonPropTypes {
  wrapperSize: number;
}
export interface PropTypes extends StyledRefreshButtonPropTypes {
  buttonSize: number;
  clickRefreshHandler: () => void;
}
