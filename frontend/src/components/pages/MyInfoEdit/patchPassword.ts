import axios from 'axios';
import { ChangePasswordType } from './types';

const patchPassword = async ({ password, newPassword }: ChangePasswordType) => {
  try {
    await axios({
      method: 'PATCH',
      url: '/api/v1/members',
      data: {
        password,
        newPassword,
      },
    });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export default patchPassword;
