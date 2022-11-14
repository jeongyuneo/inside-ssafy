import React from 'react';
import { Navigate } from 'react-router-dom';
import getIsLogin from '../getIsLogIn';
import { PropTypes } from './types';

/**
 * 로그인 되어 있을 때만 접근 가능한 컴포넌트. 비로그인 상태면 로그인 페이지로 redirect
 *
 * @author jojo
 */
const PrivateRoute = ({ children, redirectPath = '/login' }: PropTypes) => {
  const isLogin = getIsLogin();
  return isLogin ? children : <Navigate to={redirectPath} />;
};

export default PrivateRoute;
