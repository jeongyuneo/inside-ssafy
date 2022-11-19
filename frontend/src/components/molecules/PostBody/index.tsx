import React from 'react';
import Image from '../../atoms/Image';
import Text from '../../atoms/Text';
import Textarea from '../../atoms/Textarea';
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
        {imgSrc && (
          <ImageWrapper>
            <Image width={`100%`} src={imgSrc} alt="image" />
          </ImageWrapper>
        )}
        <ContentWrapper>
          <Textarea
            id="postContent"
            name="postContent"
            defaultValue={content}
            width="100%"
            fontSize={1}
            backgroundColor="none"
            disabled
          />
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
