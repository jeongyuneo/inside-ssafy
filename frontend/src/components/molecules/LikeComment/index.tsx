import React from 'react';
import { FaRegThumbsUp, FaRegCommentDots } from 'react-icons/fa';
import { StyledLikeComment, TextWrapper } from './styles';
import Text from '../../atoms/Text';
import { PropTypes } from './types';

/**
 * 좋아요와 댓글의 수를 나타낸다.
 * 사용할 때는 likeCount,commentCount를 string 으로 변환해서 사용한다.
 *
 * @author jini
 */
const LikeComment = ({ likeCount, commentCount }: PropTypes) => {
  return (
    <StyledLikeComment>
      <TextWrapper>
        <FaRegThumbsUp color="red" size={15} />
        <Text color={'red'} size={0.9}>
          {likeCount}
        </Text>
      </TextWrapper>
      <TextWrapper>
        <FaRegCommentDots color="#1E90FF" size={15} />
        <Text color={'#1E90FF'} size={0.9}>
          {commentCount}
        </Text>
      </TextWrapper>
    </StyledLikeComment>
  );
};

export default LikeComment;
