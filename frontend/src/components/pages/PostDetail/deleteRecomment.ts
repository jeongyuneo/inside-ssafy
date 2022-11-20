import axios from 'axios';

const deleteRecomment = async (commentId: number) => {
  try {
    await axios({
      method: 'DELETE',
      url: `/api/v1/recomments/${commentId}`,
    });

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export default deleteRecomment;
