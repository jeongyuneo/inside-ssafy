import { AccountValueTypes } from './types';

export const validateInput = (
  {
    name,
    studentNumber,
    email,
    emailAgain,
    password,
    passwordAgain,
  }: AccountValueTypes,
  validationkey: boolean,
): boolean => {
  const ASCII_PATTERN = /[ -~]/;
  const NAME_LENGTH = /^.{2,7}$/;
  const STUDENT_NUMBER_PATTERN = /[0-9]/;
  const PASSWORD_PATTERN = /\S{8,20}/;
  const PASSWORD_AVOID_PATTERN = /['\'"\\']/;

  if (!NAME_LENGTH.test(name)) {
    alert('올바른 이름을 입력해주세요.');
    return false;
  }

  if (ASCII_PATTERN.test(name)) {
    alert('이름은 한글만 허용됩니다.');
    return false;
  }

  if (!STUDENT_NUMBER_PATTERN.test(studentNumber)) {
    alert('학번은 숫자만 입력 가능합니다');
    return false;
  }

  if (!validationkey) {
    alert('이메일 인증이 필요합니다.');
    return false;
  }

  if (email !== emailAgain) {
    alert('인증받은 이메일과 현재 이메일이 다릅니다.');
    return false;
  }

  if (!PASSWORD_PATTERN.test(password)) {
    alert('비밀번호는 8자 이상, 20자 이하여야 합니다.');
    return false;
  }
  if (PASSWORD_AVOID_PATTERN.test(password)) {
    alert('비밀번호에 포함할 수 없는 문자가 존재합니다 ( \' 또는 " 또는 \\ )');
    return false;
  }

  if (passwordAgain !== password) {
    alert('비밀번호와 비밀번호 확인이 일치하지 않습니다');
    return false;
  }
  return true;
};

export const checkEmail = ({
  email,
  emailAgain,
}: AccountValueTypes): boolean => {
  if (email !== emailAgain) {
    alert('인증받은 이메일과 현재 입력된 이메일이 일치하지 않습니다');
    return false;
  }
  return true;
};

export const emailValidation = ({ email }: AccountValueTypes): boolean => {
  const EMAIL_PATTERN =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  if (!EMAIL_PATTERN.test(email.trim())) {
    alert('이메일 형식에 맞게 입력해주세요');
    return false;
  }
  return true;
};
