import axios from 'axios';

const deleteBusLike = async (busNum: number) => {
  try {
    await axios({
      method: 'DELETE',
      url: '/api/v1/buses/like',
      params: {
        number: busNum,
      },
    });

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export default deleteBusLike;
