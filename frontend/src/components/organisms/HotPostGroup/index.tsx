import React from 'react';
import Text from '../../atoms/Text';
import PostSummary from '../../molecules/PostSummary';
import {
  StyledHotPostGroup,
  FlexContainer,
  StyledHr,
  PostSummaryWrapper,
  TitleWrapper,
  TextWrapper,
} from './styles';
import { PostsTypes } from '../MyPosts/types';

const HotPostGroup = ({ postsInfo }: PostsTypes) => {
  return (
    <StyledHotPostGroup>
      <TitleWrapper>
        <Text bold>HOT 게시글</Text>
      </TitleWrapper>
      <StyledHr />
      <PostSummaryWrapper>
        {postsInfo?.length ? (
          postsInfo?.map(({ postId, ...rest }) => (
            <PostSummary key={postId} postId={postId} {...rest} />
          ))
        ) : (
          <TextWrapper>
            <Text>게시글이 없습니다.</Text>
          </TextWrapper>
        )}
      </PostSummaryWrapper>
    </StyledHotPostGroup>
  );
};

export default HotPostGroup;
