import axios from 'axios';

const requestLogin = async () => {
  try {
    const result: any = await axios({
      method: 'POST',
      url: '/api/v1/members/login',
      data: {
        email: 'ssafy@ssafy.com',
        password: 'ssafy',
      },
    });
    console.log(result);
    return result;
  } catch (e) {
    console.log(e);
  }
};

export default requestLogin;
