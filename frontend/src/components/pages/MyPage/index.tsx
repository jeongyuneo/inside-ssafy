import React from 'react';
import MyInfo from '../../organisms/MyInfo';

const MyPage = () => {
  const name = '홍길동';
  const studentNumber = '0732206';

  const clickEditBtnHandler = () => {
    console.log('button clicked');
  };

  return (
    <MyInfo
      name={name}
      studentNumber={studentNumber}
      clickEditBtnHandler={clickEditBtnHandler}
    />
  );
};

export default MyPage;
