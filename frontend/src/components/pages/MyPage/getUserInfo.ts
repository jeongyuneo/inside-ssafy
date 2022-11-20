import axios from 'axios';
import { UserInfoTypes } from './types';

const getUserInfo = async () => {
  try {
    const { data }: { data: UserInfoTypes } = await axios({
      method: 'GET',
      url: '/api/v1/members',
    });
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export default getUserInfo;
