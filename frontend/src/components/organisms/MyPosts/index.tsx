import React from 'react';
import Text from '../../atoms/Text';
import PostSummary from '../../molecules/PostSummary';
import { StyledMyPosts, PostSummaryWrapper, TextWrapper } from './styles';
import { PostsTypes } from './types';

/**
 * 게시글을 배열로 받아서 PostSummary로 내려줍니다.
 * 내가 작성한 글 목록을 보여줍니다.
 * 내가 작성한 글이 없으면 게시글이 없습니다. 를 보여줍니다.
 *
 * @author jini
 */
const MyPosts = ({ postsInfo }: PostsTypes) => {
  return (
    <StyledMyPosts>
      <TextWrapper>
        <Text size={1.4}>내가 작성한 글</Text>
      </TextWrapper>
      <PostSummaryWrapper>
        {postsInfo?.length ? (
          postsInfo?.map(({ postId, ...rest }) => (
            <PostSummary key={postId} postId={postId} {...rest} />
          ))
        ) : (
          <TextWrapper isContent>
            <Text>게시글이 없습니다.</Text>
          </TextWrapper>
        )}
      </PostSummaryWrapper>
    </StyledMyPosts>
  );
};

export default MyPosts;
