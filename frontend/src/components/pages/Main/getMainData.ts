import axios from 'axios';
import { MainDataType } from './types';

const getMainData = async () => {
  try {
    const { data }: { data: MainDataType } = await axios({
      method: 'GET',
      url: '/api/v1',
    });

    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export default getMainData;
