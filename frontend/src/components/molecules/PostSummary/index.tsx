import React from 'react';
import LikeComment from '../LikeComment';
import Text from '../../atoms/Text';
import { StyledPostSummary, IconTextWrapper } from './styles';
import { PostSummaryTypes } from './types';

const PostSummary = ({ title, date, ...rest }: PostSummaryTypes) => {
  return (
    <StyledPostSummary>
      <Text size={1}>{title}</Text>
      <IconTextWrapper>
        <LikeComment {...rest}></LikeComment>
        <Text size={0.7}>{date}</Text>
      </IconTextWrapper>
    </StyledPostSummary>
  );
};

export default PostSummary;
