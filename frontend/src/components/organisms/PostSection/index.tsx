import React from 'react';
import PostBody from '../../molecules/PostBody';
import PostHeader from '../../molecules/PostHeader';
import { StyledPostSection } from './styles';
import { PropTypes } from './types';

const PostSection = ({
  contents,
  likeCount,
  commentCount,
  imgSrc,
  ...headRest
}: PropTypes) => {
  return (
    <StyledPostSection>
      <PostHeader {...headRest} />
      <PostBody
        contents={contents}
        imgSrc={imgSrc}
        likeCount={likeCount}
        commentCount={commentCount}
      />
    </StyledPostSection>
  );
};

export default PostSection;
