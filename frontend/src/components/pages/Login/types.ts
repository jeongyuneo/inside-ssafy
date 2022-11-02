export interface LoginInputsType {
  [key: string]: string;
  email: string;
  password: string;
}

export interface SuccessLoginType {
  accessToken: string;
  refreshToken: string;
}
