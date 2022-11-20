import axios from 'axios';

const requestPost = async (formData: FormData) => {
  try {
    const { data } = await axios({
      method: 'POST',
      url: '/api/v1/posts',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    });

    return data.postId;
  } catch (e) {
    console.log(e);
    return -1;
  }
};

export default requestPost;
