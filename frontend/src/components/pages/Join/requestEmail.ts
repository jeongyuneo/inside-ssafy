import axios from 'axios';
import { AccountValueTypes, SuccessTokenType } from './types';

export const requestEmailToken = async ({ email }: AccountValueTypes) => {
  try {
    const { data }: { data: SuccessTokenType } = await axios({
      method: 'POST',
      url: '/api/v1/members/join/token/request?email=' + email,
    });
    console.log(data);
    return true;
  } catch (e) {
    console.log('error');
    console.log(e);
    return false;
  }
};

export const validateEmailToken = async ({
  validationToken,
  email,
}: AccountValueTypes) => {
  try {
    const { data }: { data: SuccessTokenType } = await axios({
      method: '',
      url: '/api/vi/members/join/token/validation',
      data: {
        email,
        validationToken,
      },
    });
    console.log(data);
    return true;
  } catch (e) {
    console.log('error!');
    console.log(e);
    return false;
  }
};
