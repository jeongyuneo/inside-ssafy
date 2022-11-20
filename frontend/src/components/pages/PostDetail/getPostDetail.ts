import axios from 'axios';

const getPostDetail = async (postNum: number) => {
  try {
    const { data } = await axios({
      method: 'GET',
      url: '/api/v1/posts/' + postNum,
    });

    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export default getPostDetail;
