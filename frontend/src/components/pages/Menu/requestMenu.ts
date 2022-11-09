import axios from 'axios';
import { MenuTypes } from './types';

export const requestMenu = async () => {
  const returnData: MenuTypes = {
    menus: [
      {
        date: '',
        dayOfTheWeek: '?',
        items: [],
        subItems: [],
      },
    ],
    startDate: '????-??-??',
    endDate: '????-??-??',
  };
  try {
    const { data }: { data: MenuTypes } = await axios({
      method: 'GET',
      url: '/api/v1/menus',
    });
    returnData.startDate = data.startDate;
    returnData.endDate = data.endDate;
    return returnData;
  } catch (e) {
    console.log(e);
    return returnData;
  }
};
