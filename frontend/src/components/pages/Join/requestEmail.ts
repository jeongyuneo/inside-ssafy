import axios, { AxiosResponse } from 'axios';
import { AccountValueTypes, failtoJoin } from './types';

export const requestEmailToken = async ({ email }: AccountValueTypes) => {
  try {
    const { status }: { status: number } = await axios({
      method: 'POST',
      url: '/api/v1/members/join/token/request?email=' + email,
    });
    if (status === 200) {
      return true;
    }
    return false;
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
    const { status }: { status: number } = await axios({
      method: 'POST',
      url: '/api/v1/members/join/token/validation',
      data: {
        email,
        validationToken,
      },
    });
    if (status === 200) {
      return true;
    }
    return false;
  } catch (e) {
    console.log('error!');
    console.log(e);
    return false;
  }
};

export const joinRequest = async ({
  name,
  password,
  email,
  studentNumber,
}: AccountValueTypes) => {
  try {
    const { status, data }: { status: number; data: failtoJoin } = await axios({
      method: 'POST',
      // url: '/api/v1/members',
      url: 'asdfasdfj;aegj;weiosjf',
      data: {
        email,
        password,
        name,
        studentNumber,
      },
    });
    console.log(status);
    console.log(data.message);
    if (status === 200) {
      return true;
    }
    return false;
  } catch (e) {
    console.log('error!');
    console.log(e);
    return false;
  }
};
