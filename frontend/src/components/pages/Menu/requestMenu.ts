import axios from 'axios';
import { menus } from './testdata';
import { MenuTypes } from './types';

export const requestMenu = async () => {
  const returnData: MenuTypes = {
    menus: menus,
    startDate: '????-??-??',
    endDate: '????-??-??',
  };
  try {
    const { status, data }: { status: number; data: MenuTypes } = await axios({
      method: 'GET',
      url: '/api/v1/menus',
      data: {},
    });
    console.log(status);
    if (status === 200) {
      returnData.menus = data.menus;
      returnData.startDate = data.startDate;
      returnData.endDate = data.endDate;
      return returnData;
    }
    return returnData;
  } catch (e) {
    console.log(e);
    return returnData;
  }
};
