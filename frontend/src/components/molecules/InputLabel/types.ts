export interface PropTypes {
  // labelInfo
  children: string;
  labelColor?: string;
  labelFontSize?: number;
  // InputInfo
  id: string;
  name?: string;
  index?: string;
  height?: number;
  width?: number;
  value?: string;
  type?: string;
  changeHandler?: (index: string, value: string) => void;
  placeholder?: string;
  borderRadius?: number;
  paddingLeft?: number;
  inputFontSize?: number;
  inputTextColor?: string;
  inputBackgroundColor?: string;
}
