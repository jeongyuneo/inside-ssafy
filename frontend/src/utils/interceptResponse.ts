import axios from 'axios';
import saveAccessToken from './saveAccessToken';

const interceptResponse = () => {
  axios.interceptors.response.use(
    response => {
      return response;
    },
    async error => {
      const {
        config,
        response: { status, data },
      } = error;
      const originalConfig = config;
      originalConfig!.headers = { ...originalConfig!.headers };

      if (status === 401) {
        // refreshToken 만료
        if (data.message === '만료된 토큰입니다.') {
          localStorage.removeItem('isLogin');
          window.alert('세션이 만료되어 로그인이 필요합니다.');
          window.location.href = '/login';
        }
        // refreshToken 유효. 새로운 accessToken 받아옴
        else {
          saveAccessToken({ accessToken: data.message });
          return axios(originalConfig);
        }
      } else {
        return Promise.reject(error);
      }
    },
  );
};

export default interceptResponse;
