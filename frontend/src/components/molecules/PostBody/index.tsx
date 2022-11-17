import React from 'react';
import Image from '../../atoms/Image';
import Text from '../../atoms/Text';
import LikeComment from '../LikeComment';
import {
  ContentWrapper,
  ImageWrapper,
  LikeWrapper,
  PostWrapper,
  StyledPostBody,
} from './styles';
import { PostBodyTypes } from './types';

const PostBody = ({
  content,
  imgSrc,
  likeCount,
  commentCount,
}: PostBodyTypes) => {
  return (
    <StyledPostBody>
      <PostWrapper>
        <ImageWrapper>
          {imgSrc && <Image width={`100%`} src={imgSrc} alt="logo" />}
        </ImageWrapper>
        <ContentWrapper>
          <Text size={1.05} isPost>
            {content}
          </Text>
        </ContentWrapper>
      </PostWrapper>
      <LikeWrapper>
        <LikeComment
          likeCount={likeCount}
          commentCount={commentCount}
          iconSize={20}
          fontSize={1.2}
        />
      </LikeWrapper>
    </StyledPostBody>
  );
};

export default PostBody;
