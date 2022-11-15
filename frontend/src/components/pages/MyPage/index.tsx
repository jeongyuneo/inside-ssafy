import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import MyInfo from '../../organisms/MyInfo';
import Navbar from '../../molecules/Navbar';
import MyPosts from '../../organisms/MyPosts';
import { StyledMyPage } from './styles';
import getUserInfo from './getUserInfo';
import { UserInfoTypes } from './types';
import Text from '../../atoms/Text';

const MyPage = () => {
  const navigate = useNavigate();

  const { data: userInfo } = useQuery<UserInfoTypes>(['userInfo'], () =>
    getUserInfo(),
  );

  const clickEditBtnHandler = () => {
    navigate('/myinfoedit');
  };

  const clickLogoHandler = () => {
    navigate('/');
  };

  return (
    <StyledMyPage>
      <Navbar clickLogoHandler={clickLogoHandler} />
      <MyInfo
        name={userInfo ? userInfo.name : ''}
        studentNumber={userInfo ? userInfo.studentNumber : ''}
        clickEditBtnHandler={clickEditBtnHandler}
      />
      {userInfo?.postsResponses.length ? (
        <MyPosts postsInfo={userInfo.postsResponses} />
      ) : (
        <MyPosts />
      )}
    </StyledMyPage>
  );
};

export default MyPage;
