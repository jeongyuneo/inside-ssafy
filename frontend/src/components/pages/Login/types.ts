export interface LoginInputsType {
  [key: string]: string;
  email: string;
  password: string;
}

export interface SuccessLoginType {
  accessToken: string;
}

export interface SaveEmailType {
  checked: boolean;
  email: string;
}
