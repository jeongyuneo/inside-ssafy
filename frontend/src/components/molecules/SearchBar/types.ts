export interface SearchInputType {
  [key: string]: string;
  value: string;
}

export interface PropTypes {
  name: string;
  inputs?: SearchInputType;
  clickSearchButtonHandler: () => void;
}
