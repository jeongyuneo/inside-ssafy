import React from 'react';
import PostSummary from '../../molecules/PostSummary';
import { StyledPostsList } from './styles';
import { PropsTypes } from './types';

const PostsList = ({ items, clickPostItemHandler }: PropsTypes) => {
  return (
    <StyledPostsList>
      {items?.map(({ title, createdDate, postId, likeCount, commentCount }) => {
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
      })}
    </StyledPostsList>
  );
};

export default PostsList;
