import axios from 'axios';

const postComment = async (postId: number, content: string) => {
  try {
    await axios({
      method: 'POST',
      url: `/api/v1/comments/posts/${postId}`,
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

export default postComment;
