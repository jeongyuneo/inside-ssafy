import axios from 'axios';

const requestPost = async (formData: FormData) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/posts',
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

export default requestPost;
