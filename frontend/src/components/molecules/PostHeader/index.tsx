import React from 'react';
import Button from '../../atoms/Button';
import Text from '../../atoms/Text';
import {
  ButtonWrapper,
  DateWrapper,
  StyledPostHeader,
  TextWrapper,
} from './styled';
import { PostHeaderTypes } from './types';
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
/>;
const PostHeader = ({ title, date, author, myName }: PostHeaderTypes) => {
  return (
    <StyledPostHeader>
      <ButtonWrapper>
        <Button>뒤로가기</Button>
        {author === myName && (
          <Button>
            <span className="material-symbols-outlined">more_vert</span>
          </Button>
        )}
      </ButtonWrapper>
      <TextWrapper>
        <Text>{title}</Text>
      </TextWrapper>
      <DateWrapper>
        <Text>{date}</Text>
      </DateWrapper>
    </StyledPostHeader>
  );
};

export default PostHeader;
