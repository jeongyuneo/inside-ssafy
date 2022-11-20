import axios from 'axios';

const postPostLike = async (postId: number) => {
  try {
    await axios({
      method: 'POST',
      url: `/api/v1/posts/like/${postId}`,
    });

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export default postPostLike;
