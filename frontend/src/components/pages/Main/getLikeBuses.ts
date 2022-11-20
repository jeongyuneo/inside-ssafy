import axios, { AxiosError } from 'axios';
import { LikeBusType } from './types';

const getLikeBuses = async (busNum?: number) => {
  try {
    const { data }: { data: LikeBusType } = await axios({
      method: 'GET',
      url: '/api/v1/buses/like',
      params: {
        number: busNum,
      },
    });
    console.log(data);

    return data;
  } catch (e) {
    // 운행 시간이 아닐 때 400 에러
    if (e instanceof AxiosError && e?.response?.status === 400) {
      console.log(e?.response?.data);
      return e?.response?.data;
    } else {
      console.log(e);
      throw e;
    }
  }
};

export default getLikeBuses;
