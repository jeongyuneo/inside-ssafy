const getIsLogin = () => {
  return !!localStorage.getItem('isLogin');
};

export default getIsLogin;
