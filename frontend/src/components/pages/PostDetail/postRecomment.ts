import axios from 'axios';

const postRecomment = async (commentId: number, content: string) => {
  try {
    await axios({
      method: 'POST',
      url: `/api/v1/recomments/comments/${commentId}`,
      data: {
        content,
      },
    });

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export default postRecomment;
