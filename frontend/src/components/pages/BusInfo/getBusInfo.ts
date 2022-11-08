import axios from 'axios';
import { BusInfoType, PropTypes } from './types';

const getBusInfo = async ({ busNum }: PropTypes) => {
  try {
    const { data }: { data: BusInfoType } = await axios({
      method: 'GET',
      url: '/api/v1/buses',
      params: {
        number: busNum,
      },
    });
    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export default getBusInfo;
