import React from 'react';
import PostBody from '../../molecules/PostBody';
import PostHeader from '../../molecules/PostHeader';
import { StyledPostSection } from './styles';
import { PropTypes } from './types';

const PostSection = ({
  content,
  likeCount,
  commentCount,
  files,
  ...postHeaderRest
}: PropTypes) => {
  return (
    <StyledPostSection>
      <PostHeader {...postHeaderRest} />
      <PostBody
        content={content}
        imgSrc={files[0]?.url}
        likeCount={likeCount}
        commentCount={commentCount}
      />
    </StyledPostSection>
  );
};

export default PostSection;
