import axios from 'axios';

const postBusLike = async (busNum: number) => {
  try {
    await axios({
      method: 'POST',
      url: '/api/v1/buses/like',
      data: {
        number: busNum,
      },
    });

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export default postBusLike;
