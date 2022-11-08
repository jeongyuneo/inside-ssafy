import React from 'react';
import MyInfo from '../../organisms/MyInfo';
import { StyledMyPage } from './styles';

const MyPage = () => {
  const name = '홍길동';
  const studentNumber = '0732206';

  const clickEditBtnHandler = () => {
    console.log('button clicked');
  };

  return (
    <StyledMyPage>
      <MyInfo
        name={name}
        studentNumber={studentNumber}
        clickEditBtnHandler={clickEditBtnHandler}
      />
    </StyledMyPage>
  );
};

export default MyPage;
