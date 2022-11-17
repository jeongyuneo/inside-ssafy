import React from 'react';
import PostSummary from '../../molecules/PostSummary';
import { StyledPostsList } from './styles';
import { PropsTypes } from './types';

const PostsList = ({ items, clickPostItemHandler }: PropsTypes) => {
  return (
    <StyledPostsList>
      {items ? (
        items.map(({ title, createdDate, postId, likeCount, commentCount }) => {
          return (
            <PostSummary
              title={title}
              createdDate={createdDate}
              postId={postId}
              likeCount={likeCount}
              commentCount={commentCount}
              clickPostItemHandler={clickPostItemHandler}
              key={title + postId}
            ></PostSummary>
          );
        })
      ) : (
        <div>게시판이 없습니다.</div>
      )}
    </StyledPostsList>
  );
};

export default PostsList;
