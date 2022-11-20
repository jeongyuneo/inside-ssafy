import React from 'react';
import Text from '../../atoms/Text';
import PostSummary from '../../molecules/PostSummary';
import {
  StyledHotPostGroup,
  StyledHr,
  PostSummaryWrapper,
  TitleWrapper,
  TextWrapper,
} from './styles';
import { PropTypes } from '../MyPosts/types';

const HotPostGroup = ({ postsInfo, clickPostItemHandler }: PropTypes) => {
  return (
    <StyledHotPostGroup>
      <TitleWrapper>
        <Text bold>HOT 게시글</Text>
      </TitleWrapper>
      <StyledHr />
      <PostSummaryWrapper>
        {postsInfo?.length ? (
          postsInfo?.map(({ postId, ...rest }) => (
            <PostSummary
              key={postId}
              postId={postId}
              iconSize={12}
              fontSize={0.7}
              clickPostItemHandler={clickPostItemHandler}
              {...rest}
            />
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
