import axios from 'axios';

const deletePostLike = async (postId: number) => {
  try {
    await axios({
      method: 'DELETE',
      url: `/api/v1/posts/like/${postId}`,
    });

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export default deletePostLike;
