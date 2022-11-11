import React from 'react';
import Button from '../../atoms/Button';
import Text from '../../atoms/Text';
import {
  ButtonWrapper,
  DateWrapper,
  PostWrapper,
  StyledPostHeader,
  TextWrapper,
} from './styled';
import { PropTypes } from './types';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';

const PostHeader = ({ title, createTime, myPost, width }: PropTypes) => {
  return (
    <StyledPostHeader
      title={title}
      createTime={createTime}
      myPost={myPost}
      width={width}
    >
      <ButtonWrapper>
        <Button isText>뒤로가기</Button>
        {myPost && (
          <Button isText>
            <DensityMediumIcon />
          </Button>
        )}
      </ButtonWrapper>
      <PostWrapper>
        <TextWrapper>
          <Text size={1.4}>{title}</Text>
        </TextWrapper>
        <DateWrapper>
          <Text size={0.8}>{createTime}</Text>
        </DateWrapper>
      </PostWrapper>
    </StyledPostHeader>
  );
};

export default PostHeader;
