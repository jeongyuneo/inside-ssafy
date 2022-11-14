import React from 'react';
import { Navigate } from 'react-router-dom';
import getIsLogin from '../getIsLogIn';
import { PropTypes } from './types';

/**
 * 비로그인 상태에서만 접근 가능한 컴포넌트. 로그인 한 상태면 메인 페이지로 redirect
 *
 * @author jojo
 */
const PublicRoute = ({ children, redirectPath = '/' }: PropTypes) => {
  const isLogin = getIsLogin();
  return isLogin ? <Navigate to={redirectPath} /> : children;
};

export default PublicRoute;
