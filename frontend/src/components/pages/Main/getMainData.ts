import axios, { AxiosError } from 'axios';
import { MainDataType } from './types';

const getMainData = async () => {
  try {
    const { data }: { data: MainDataType } = await axios({
      method: 'GET',
      url: '/api/v1',
    });

    return data;
  } catch (e) {
    // 주말에는 식단표를 제공하지 않아 400 에러
    if (e instanceof AxiosError && e?.response?.status === 400) {
      console.log(e?.response?.data);
      return e?.response?.data.message;
    } else {
      console.log(e);
      throw e;
    }
  }
};

export default getMainData;
