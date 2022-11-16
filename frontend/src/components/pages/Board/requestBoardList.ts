import axios from 'axios';
import { PostSummaryItemTypes } from '../../molecules/PostSummary/types';

export const requestMenu = async (page: number, size: number) => {
  try {
    const { data }: { data: PostSummaryItemTypes[] } = await axios({
      method: 'GET',
      url: `/api/v1/posts?page=${page}&size=${size}`,
    });
    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
