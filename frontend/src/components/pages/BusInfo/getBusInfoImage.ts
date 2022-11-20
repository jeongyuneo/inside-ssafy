import axios from 'axios';
import { BusInfoImageType, PropTypes } from './types';

const getBusInfoImage = async ({ busNum }: PropTypes) => {
  try {
    const { data }: { data: BusInfoImageType } = await axios({
      method: 'GET',
      url: '/api/v1/buses/route/image',
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

export default getBusInfoImage;
