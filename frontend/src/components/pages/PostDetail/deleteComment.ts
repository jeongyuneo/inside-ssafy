import axios from 'axios';

const deleteComment = async (commentId: number) => {
  console.log(commentId);

  try {
    await axios({
      method: 'DELETE',
      url: `/api/v1/comments/${commentId}`,
    });

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export default deleteComment;
