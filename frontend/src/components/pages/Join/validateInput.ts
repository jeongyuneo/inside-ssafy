import { AccountValueTypes } from './types';

export const validateInput = ({
  userName,
  studentNum,
  email,
  email_again,
  userPw,
  password_again,
}: AccountValueTypes): boolean => {
  console.log(userName + ' , ' + studentNum + ' , ' + userPw);
  const NAME_PATTERN = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

  const STUDENT_NUMBER_PATTERN = /[0-9]/;

  const PASSWORD_PATTERN = /\S{8,20}/;

  const PASSWORD_AVOID_PATTERN = /['\'"\\']/;

  if (!NAME_PATTERN.test(userName)) {
    alert('이름은 한글만 허용됩니다.');
    return false;
  }

  if (!STUDENT_NUMBER_PATTERN.test(studentNum)) {
    alert('학번은 숫자만 입력 가능합니다');
    return false;
  }

  if (email !== email_again) {
    alert('인증받은 이메일과 현재 입력된 이메일이 일치하지 않습니다');
    return false;
  }

  if (!PASSWORD_PATTERN.test(userPw)) {
    alert('비밀번호는 8자 이상, 20자 이하여야 합니다.');
    return false;
  }
  if (PASSWORD_AVOID_PATTERN.test(userPw)) {
    alert('비밀번호에 포함할 수 없는 문자가 존재합니다 ( \' 또는 " 또는 \\ )');
    return false;
  }

  if (password_again !== userPw) {
    alert('비밀번호와 비밀번호 확인이 일치하지 않습니다');
  }
  return true;
};

export const checkEmail = ({
  email,
  email_again,
}: AccountValueTypes): boolean => {
  if (email !== email_again) {
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
