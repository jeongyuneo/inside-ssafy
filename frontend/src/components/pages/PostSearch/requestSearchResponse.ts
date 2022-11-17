import axios from 'axios';
import { SearchBoardListTypes } from './types';

export const requestSearch = async (keyWord: string) => {
  try {
    const { data }: { data: SearchBoardListTypes } = await axios({
      method: 'GET',
      url: `/api/v1/posts/search?keyword=${keyWord}`,
    });
    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
