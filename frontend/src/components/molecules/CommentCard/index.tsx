import React from 'react';
import Text from '../../atoms/Text';
import { CommentHeader, IconButtonsWrapper, StyledCommentCard } from './styles';
import { PropTypes } from './types';
import { FaRegComment, FaRegTrashAlt } from 'react-icons/fa';

/**
 * isRecomment가 false면 댓글, true면 대댓글
 * 댓글이든 대댓글이든 고유 식별자를 commentId 하나로 통일해 내려줌
 *
 * @author jojo
 */
const CommentCard = ({
  commentId,
  content,
  createdDate,
  editable,
  isReComment,
  isPostWriter,
  clickReCommentHandler,
  clickDeleteHandler,
}: PropTypes) => {
  return (
    <StyledCommentCard isReComment={isReComment}>
      <CommentHeader>
        {isPostWriter ? (
          <Text color="blue">익명(글쓴이)</Text>
        ) : (
          <Text>익명</Text>
        )}
        <IconButtonsWrapper>
          {!isReComment && (
            <FaRegComment onClick={() => clickReCommentHandler(commentId)} />
          )}
          {editable && (
            <FaRegTrashAlt onClick={() => clickDeleteHandler(commentId)} />
          )}
        </IconButtonsWrapper>
      </CommentHeader>
      <Text>{content}</Text>
      <Text>{createdDate}</Text>
    </StyledCommentCard>
  );
};

export default CommentCard;
