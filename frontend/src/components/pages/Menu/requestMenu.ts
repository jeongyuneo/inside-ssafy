import axios from 'axios';
import { MenuCardsTypes } from '../../organisms/MenuCards/types';

export const requestMenu = async () => {
  console.log('request');
  const errorData: MenuCardsTypes = {
    menus: [],
  };
  try {
    const { status, data }: { status: number; data: MenuCardsTypes } =
      await axios({
        method: 'GET',
        url: '/api/v1/menus',
      });
    console.log(status);
    if (status === 200) {
      return data;
    }
    return errorData;
  } catch (e) {
    console.log(e);
    return errorData;
  }
};
