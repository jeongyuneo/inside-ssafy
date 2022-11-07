import axios from 'axios';
import { AccountValueTypes, FailToJoin } from './types';

export const requestEmailToken = async ({ email }: AccountValueTypes) => {
  console.log('request');
  const returnData = {
    status: false,
    message: '인증에 문제가 발생하였습니다',
  };
  try {
    const { status }: { status: number } = await axios({
      method: 'POST',
      url: '/api/v1/members/join/token/request',
      data: {
        email,
      },
    });
    console.log(status);
    if (status === 200) {
      returnData.message = '인증번호가 전송되었습니다.';
      returnData.status = true;
      return returnData;
    } else if (status === 400) {
      returnData.message = '이미 가입된 메일입니다.';
      return returnData;
    }
    return returnData;
  } catch (e) {
    console.log('error');
    console.log(e);
    return returnData;
  }
};

export const validateEmailToken = async ({
  validationToken,
  email,
}: AccountValueTypes) => {
  const returnData = {
    status: false,
    message: '인증에 문제가 발생하였습니다',
  };
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
      returnData.message = '인증 성공하였습니다.';
      returnData.status = true;
      return returnData;
    }
    return returnData;
  } catch (e) {
    console.log('error!');
    console.log(e);
    return returnData;
  }
};

export const joinRequest = async ({
  name,
  password,
  email,
  studentNumber,
}: AccountValueTypes) => {
  try {
    const { status, data }: { status: number; data: FailToJoin } = await axios({
      method: 'POST',
      url: '/api/v1/members',
      data: {
        email,
        password,
        name,
        studentNumber,
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
