export interface PropTypes {
  children: string;
  labelColor?: string;
  labelFontSize?: number;

  id: string;
  name?: string;
  index?: string;
  height?: number;
  width?: number;
  value?: string;
  type?: string;
  changeHandler?: (index: string, value: string) => void;
  placeholder?: string;
  inputFontSize?: number;
  inputTextColor?: string;
  inputBackgroundColor?: string;
}
