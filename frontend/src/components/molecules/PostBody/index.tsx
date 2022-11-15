import React from 'react';
import Image from '../../atoms/Image';
import Text from '../../atoms/Text';
import LikeComment from '../LikeComment';
import {
  ContentWrapper,
  ImageWrapper,
  LikeWrapper,
  StyledPostBody,
} from './styles';
import { PropTypes } from './types';

const PostBody = ({
  contents,
  imgSrc,
  likeCount,
  commentCount,
  width,
  height,
}: PropTypes) => {
  return (
    <StyledPostBody width={width}>
      <ImageWrapper width={width}>
        {imgSrc && (
          <Image
            width={width ? `${width}rem` : '25rem'}
            height={height ? `${height}rem` : '100%'}
            src={imgSrc}
            alt="logo"
          />
        )}
      </ImageWrapper>
      <ContentWrapper>
        <Text size={1.05} isPost>
          {contents}
        </Text>
      </ContentWrapper>
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
