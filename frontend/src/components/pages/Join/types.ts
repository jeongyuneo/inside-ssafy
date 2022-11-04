export interface AccountValueTypes {
  [key: string]: string;
  name: string;
  studentNumber: string;
  email: string;
  validationToken: string;
  email_again: string;
  password: string;
  password_again: string;
}

export interface failtoJoin {
  message: string;
}
