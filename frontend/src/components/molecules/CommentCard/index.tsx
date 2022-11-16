import React from 'react';
import Text from '../../atoms/Text';
import { CommentHeader, IconButtonsWrapper, StyledCommentCard } from './styles';
import { PropTypes } from './types';
import { FaRegComment } from 'react-icons/fa';
import { GrMoreVertical } from 'react-icons/gr';

/**
 * isRecomment가 false면 댓글, true면 대댓글
 *
 * @author jojo
 */
const CommentCard = ({
  writer,
  content,
  createdDate,
  editable,
  isRecomment,
}: PropTypes) => {
  return (
    <StyledCommentCard isRecomment={isRecomment}>
      <CommentHeader>
        <Text>{writer}</Text>
        <IconButtonsWrapper>
          {!isRecomment && <FaRegComment />}
          <GrMoreVertical />
        </IconButtonsWrapper>
      </CommentHeader>
      <Text>{content}</Text>
      <Text>{createdDate}</Text>
    </StyledCommentCard>
  );
};

export default CommentCard;
