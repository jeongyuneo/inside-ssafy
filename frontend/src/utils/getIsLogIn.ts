import axios from 'axios';

const getIsLogin = () => {
  return !!axios.defaults.headers.common['Authorization'];
};

export default getIsLogin;
