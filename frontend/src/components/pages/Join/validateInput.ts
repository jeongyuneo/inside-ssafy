import { JoinInputsType } from './types';

const validateInput = ({
  email,
  password,
  student_number,
  name,
}: JoinInputsType): boolean => {
  const NAME_PATTERN = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

  const STUDENT_NUMBER_PATTERN = /[0-9]/;

  const PASSWORD_PATTERN = /\S{8,20}/;

  const PASSWORD_AVOID_PATTERN = /'"\\{8,20}/;

  const EMAIL_PATTERN =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  if (!NAME_PATTERN.test(name)) {
    return false;
  }

  if (!STUDENT_NUMBER_PATTERN.test(student_number)) {
    return false;
  }

  if (!EMAIL_PATTERN.test(email.trim())) {
    return false;
  }

  if (PASSWORD_AVOID_PATTERN || !PASSWORD_PATTERN.test(password)) {
    return false;
  }

  return true;
};

const isEmpty = (str: string) => {
  if (str.length == 0) {
    return true;
  }
  return false;
};
const isTooLong = (str: string, limit: number) => {
  if (str.length > limit) {
    return true;
  }
  return false;
};

const checkId = (str: string) => {
  if (isEmpty(str)) {
    console.log('아이디가 비어있습니다');
  } else if (isEmpty(str)) {
    console.log('아이디가 너무 깁니다.');
  }
};

export default validateInput;
