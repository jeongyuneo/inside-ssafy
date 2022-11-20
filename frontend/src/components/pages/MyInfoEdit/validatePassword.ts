import { ValidatePasswordTypes } from './types';
import patchPassword from './patchPassword';

export const validatePassword = async ({
  password,
  newPassword,
  newPasswordAgain,
}: ValidatePasswordTypes) => {
  const PASSWORD_PATTERN = /\S{8,20}/;
  const PASSWORD_AVOID_PATTERN = /['\'"\\']/;
  const returnData = {
    status: false,
    message: '',
  };

  if (!PASSWORD_PATTERN.test(newPassword)) {
    returnData.message = '비밀번호는 8자 이상, 20자 이하여야 합니다.';
    return returnData;
  } else if (PASSWORD_AVOID_PATTERN.test(newPassword)) {
    returnData.message =
      '비밀번호에 포함할 수 없는 문자가 존재합니다 ( \' 또는 " 또는 \\ )';
    return returnData;
  } else if (newPassword !== newPasswordAgain) {
    returnData.message = '비밀번호가 일치하지 않습니다.';
    return returnData;
  } else if (!(await patchPassword({ password, newPassword }))) {
    returnData.message = '비밀번호를 확인해주세요.';
    return returnData;
  } else if (password === newPassword) {
    returnData.message = '기존 비밀번호와 새 비밀번호가 동일합니다.';
    return returnData;
  } else {
    returnData.message = '비밀번호가 수정되었습니다.';
    returnData.status = true;
  }
  return returnData;
};
