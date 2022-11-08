import React from 'react';
import { useNavigate } from 'react-router-dom';
import MyInfo from '../../organisms/MyInfo';
import Navbar from '../../molecules/Navbar';
import { StyledMyPage } from './styles';

const MyPage = () => {
  const navigate = useNavigate();
  const name = '홍길동';
  const studentNumber = '0732206';

  const clickEditBtnHandler = () => {
    console.log('button clicked');
  };

  const clickLogoHandler = () => {
    navigate('/');
  };

  return (
    <StyledMyPage>
      <Navbar clickLogoHandler={clickLogoHandler} />
      <MyInfo
        name={name}
        studentNumber={studentNumber}
        clickEditBtnHandler={clickEditBtnHandler}
      />
    </StyledMyPage>
  );
};

export default MyPage;
