import React from 'react';
import MyInfo from '../../organisms/MyInfo';
import PostSummary from '../../molecules/PostSummary';
import { StyledMyPage, PostSummaryWrapper } from './styles';

const MyPage = () => {
  const name = '홍길동';
  const studentNumber = '0732206';
  const postInfos = [
    {
      postId: 1,
      title: '게시글 제목1',
      likeCount: 3,
      commentCount: 5,
      createdDate: '2022-11-08 09:12',
    },
    {
      postId: 2,
      title: '게시글 제목2',
      likeCount: 200,
      commentCount: 70,
      createdDate: '2022-11-08 01:35',
    },
    {
      postId: 3,
      title: '게시글 제목3',
      likeCount: 5,
      commentCount: 19,
      createdDate: '2022-11-08 11:18',
    },
  ];

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
      <PostSummaryWrapper>
        {postInfos.map(
          ({ postId, title, likeCount, commentCount, createdDate }) => (
            <PostSummary
              key={postId}
              title={title}
              date={createdDate}
              likeCount={likeCount.toString()}
              commentCount={commentCount.toString()}
            />
          ),
        )}
      </PostSummaryWrapper>
    </StyledMyPage>
  );
};

export default MyPage;
