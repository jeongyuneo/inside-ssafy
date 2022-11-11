import React from 'react';
import Button from '../../atoms/Button';
import Text from '../../atoms/Text';
import { ButtonWrapper, PostHeadWrapper, StyledPostHeader } from './styled';
import { PostHeaderTypes } from './types';

const PostHeader = ({ title, date }: PostHeaderTypes) => {
  return (
    <StyledPostHeader>
      <ButtonWrapper>
        <Button>뒤로가기</Button>
      </ButtonWrapper>
      <PostHeadWrapper>
        <Text>{title}</Text>
        <Text>{date}</Text>
      </PostHeadWrapper>
    </StyledPostHeader>
  );
};

export default PostHeader;
