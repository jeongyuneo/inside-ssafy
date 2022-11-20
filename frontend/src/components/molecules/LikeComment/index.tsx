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
const LikeComment = ({
  likeCount,
  commentCount,
  iconSize,
  fontSize,
}: PropTypes) => {
  return (
    <StyledLikeComment>
      <TextWrapper>
        <FaRegThumbsUp color="#D55555" size={iconSize || 15} />
        <Text color="#D55555" size={fontSize || 0.9}>
          {likeCount.toString()}
        </Text>
      </TextWrapper>
      <TextWrapper>
        <FaRegCommentDots color="#5B9CCE" size={iconSize || 15} />
        <Text color="#5B9CCE" size={fontSize || 0.9}>
          {commentCount.toString()}
        </Text>
      </TextWrapper>
    </StyledLikeComment>
  );
};

export default LikeComment;
