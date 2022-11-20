import axios from 'axios';

const requestLogout = async () => {
  try {
    await axios({
      method: 'POST',
      url: '/api/v1/members/logout',
    });

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export default requestLogout;
