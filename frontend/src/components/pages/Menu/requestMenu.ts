import axios from 'axios';
import { MenuTypes } from './types';

export const requestMenu = async () => {
  try {
    const { data }: { data: MenuTypes } = await axios({
      method: 'GET',
      url: '/api/v1/menus',
    });
    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
