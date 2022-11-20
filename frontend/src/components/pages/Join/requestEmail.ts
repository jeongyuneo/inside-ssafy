import axios, { AxiosError } from 'axios';
import { AccountValueTypes, FailToJoin } from './types';

export const requestEmailToken = async ({ email }: AccountValueTypes) => {
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
    if (status === 200) {
      returnData.message = '인증번호가 전송되었습니다.';
      returnData.status = true;
      return returnData;
    }
    return returnData;
  } catch (e) {
    if (e instanceof AxiosError) {
      const status = e.response?.status;
      switch (status) {
        case 400:
          returnData.message = '이미 가입된 아이디입니다.';
          break;
      }
    }
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
    console.log(e);
    return returnData;
  }
};

export const joinRequest = async ({
  name,
  password,
  email,
  studentNumber,
  campus,
}: AccountValueTypes) => {
  try {
    const { status }: { status: number; data: FailToJoin } = await axios({
      method: 'POST',
      url: '/api/v1/members',
      data: {
        email,
        password,
        name,
        studentNumber,
        campus,
      },
    });
    if (status === 200) {
      alert('회원가입에 성공하였습니다.');
      return true;
    }
    return false;
  } catch (e) {
    console.log('error!');
    console.log(e);
    return false;
  }
};
