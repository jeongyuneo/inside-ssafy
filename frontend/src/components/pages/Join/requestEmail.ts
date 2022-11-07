import axios from 'axios';
import { AccountValueTypes, FailToJoin } from './types';

export const requestEmailToken = async ({ email }: AccountValueTypes) => {
  try {
    const { status }: { status: number } = await axios({
      method: 'POST',
      url: '/api/v1/members/join/token/request?email=' + email,
    });
    if (status === 200) {
      alert('인증번호가 전송되었습니다');
      return true;
    } else if (status === 400) {
      alert('이미 가입된 메일입니다.');
      return false;
    }
    alert('인증과정에 문제가 발생하였습니다');
    return false;
  } catch (e) {
    console.log('error');
    console.log(e);
    alert('인증번호 전송에 문제가 생겼습니다');
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
      alert('인증 성공하였습니다.');
      return true;
    }
    alert('인증 과정에 문제가 발생하였습니다.');
    return false;
  } catch (e) {
    alert('인증이 실패하였습니다.');
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
      alert('회원가입 성공!');
      return true;
    }
    alert('회원가입에 문제가 생겼습니다.');
    console.log(data.message);
    return false;
  } catch (e) {
    console.log('error!');
    console.log(e);
    return false;
  }
};
