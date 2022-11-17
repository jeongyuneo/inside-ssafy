import axios from 'axios';
import { InfiniteBoardListTypes } from './types';

export const requestBoardList = async (pageParam: number, size: number) => {
  try {
    const {
      data: { postsResponses, last },
    }: { data: InfiniteBoardListTypes } = await axios({
      method: 'GET',
      url: `/api/v1/posts?page=${pageParam}&size=${size}`,
    });
    return { postsResponses, nextPage: pageParam + 1, last };
  } catch (e) {
    console.log(e);
    throw e;
  }
};
