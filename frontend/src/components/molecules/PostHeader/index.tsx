import React from 'react';
import { StyledPostHeader } from './styled';

const PostHeader = () => {
  return (
    <StyledPostHeader>
      <Button>뒤로가기</Button>
      <Text>{title}</Text>
    </StyledPostHeader>
  );
};

export default PostHeader;
