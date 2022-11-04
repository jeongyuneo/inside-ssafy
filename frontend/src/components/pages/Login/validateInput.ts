import { LoginInputsType } from './types';

const validateInput = ({ email, password }: LoginInputsType): boolean => {
  const EMAIL_PATTERN =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  const PASSWORD_PATTERN = /\S{8,20}/;

  if (!EMAIL_PATTERN.test(email.trim())) {
    return false;
  }

  if (!PASSWORD_PATTERN.test(password)) {
    return false;
  }

  return true;
};

export default validateInput;
