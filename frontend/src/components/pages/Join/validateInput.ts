import { AccountValueTypes, ValidResponseData } from './types';

export const validateInput = (
  {
    name,
    studentNumber,
    email,
    emailAgain,
    password,
    passwordAgain,
    campus,
  }: AccountValueTypes,
  validationkey: boolean,
): ValidResponseData => {
  const NAME_PATTERN = /^[가-힣]+$/;
  const NAME_LENGTH = /^.{2,7}$/;
  const STUDENT_NUMBER_LENGTH = /^.{7,7}$/;
  const STUDENT_NUMBER_PATTERN = /^[0-9]+$/;
  const PASSWORD_PATTERN = /\S{8,20}/;
  const PASSWORD_AVOID_PATTERN = /['\'"\\']/;
  const returnData = {
    status: false,
    message: '',
  };
  if (!NAME_LENGTH.test(name)) {
    returnData.message = '올바른 이름을 입력해주세요.';
  } else if (!NAME_PATTERN.test(name)) {
    returnData.message = '이름은 한글만 허용됩니다.';
  } else if (!STUDENT_NUMBER_LENGTH.test(studentNumber)) {
    returnData.message = '학번을 확인해주세요';
  } else if (!STUDENT_NUMBER_PATTERN.test(studentNumber)) {
    returnData.message = '학번은 숫자만 입력 가능합니다';
  } else if (campus.length === 0) {
    returnData.message = '캠퍼스를 선택해주세요';
  } else if (!validationkey) {
    returnData.message = '이메일 인증이 필요합니다.';
  } else if (email !== emailAgain) {
    returnData.message = '인증받은 이메일과 현재 이메일이 다릅니다.';
    return returnData;
  } else if (!PASSWORD_PATTERN.test(password)) {
    returnData.message = '비밀번호는 8자 이상, 20자 이하여야 합니다.';
    return returnData;
  } else if (PASSWORD_AVOID_PATTERN.test(password)) {
    returnData.message =
      '비밀번호에 포함할 수 없는 문자가 존재합니다 ( \' 또는 " 또는 \\ )';
    return returnData;
  } else if (passwordAgain !== password) {
    returnData.message = '비밀번호와 비밀번호 확인이 일치하지 않습니다';
    return returnData;
  } else {
    returnData.message = '성공하였습니다.';
    returnData.status = true;
  }
  return returnData;
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

export const validateEmail = ({
  email,
}: AccountValueTypes): ValidResponseData => {
  const returnData = {
    status: true,
    message: '',
  };
  const EMAIL_PATTERN =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  if (!EMAIL_PATTERN.test(email.trim())) {
    returnData.message = '이메일 형식에 맞게 입력해주세요';
    returnData.status = false;
    console.log('이메일 유효성검사 실패');
    return returnData;
  }
  console.log('이메일 유효성검사 완료');
  return returnData;
};
