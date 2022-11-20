import axios from 'axios';

const updatePost = async (formData: FormData, postId: number) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `/api/v1/posts/update/${postId}`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    });

    console.log(res.status);
    return true;
  } catch (e) {
    console.log(e);

    return false;
  }
};

export default updatePost;
