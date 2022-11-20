import axios from 'axios';

const deletePost = async (postId: number) => {
  try {
    await axios({
      method: 'DELETE',
      url: `/api/v1/posts/${postId}`,
    });

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export default deletePost;
