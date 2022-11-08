import React from 'react';
import Text from '../../atoms/Text';
import PostSummary from '../../molecules/PostSummary';
import { StyledMyPosts, PostSummaryWrapper } from './styles';
import { PostsTypes } from './types';

/**
 * 게시글을 배열로 받아서 PostSummary로 내려줍니다.
 * 내가 작성한 글 목록을 보여줍니다.
 *
 * @author jini
 */
const MyPosts = ({ postsInfo }: PostsTypes) => {
  return (
    <StyledMyPosts>
      <Text size={1.4}>내가 작성한 글</Text>
      <PostSummaryWrapper>
        {postsInfo.map(({ postId, ...rest }) => (
          <PostSummary key={postId} {...rest} />
        ))}
      </PostSummaryWrapper>
    </StyledMyPosts>
  );
};

export default MyPosts;
