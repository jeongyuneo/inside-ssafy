export interface AccountValueTypes {
  [key: string]: string;
  userName: string;
  studentNum: string;
  email: string;
  validationToken: string;
  email_again: string;
  userPw: string;
  password_again: string;
}

export interface SuccessTokenType {
  accessToken: string;
  refreshToken: string;
}
