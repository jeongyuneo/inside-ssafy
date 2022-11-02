export interface AccountValueTypes {
  [key: string]: string;
  userId: string;
  userPw: string;
  email: string;
  studentNum: string;
}

export interface SuccessLoginType {
  accessToken: string;
  refreshToken: string;
}
