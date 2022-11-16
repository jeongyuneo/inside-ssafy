export interface ChangePasswordType {
  [key: string]: string;
  password: string;
  newPassword: string;
}

export interface ValidatePasswordTypes extends ChangePasswordType {
  newPasswordAgain: string;
}
