import axios from 'axios';

const saveAccessToken = ({ accessToken }: { accessToken: string }) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
};

export default saveAccessToken;
