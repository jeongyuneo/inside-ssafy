import React from 'react';
import Text from '../../atoms/Text';
import { CommentHeader, IconButtonsWrapper, StyledCommentCard } from './styles';
import { PropTypes } from './types';
import { FaComment, FaRegComment, FaRegTrashAlt } from 'react-icons/fa';

/**
 * isRecomment가 false면 댓글, true면 대댓글
 * 댓글이든 대댓글이든 고유 식별자를 commentId 하나로 통일해 내려줌
 *
 * @author jojo
 */
const CommentCard = ({
  commentId,
  campus,
  content,
  createdDate,
  editable,
  isReComment,
  hasReComment,
  postWriter,
  commentIdWritingRecomment,
  clickReCommentHandler,
  clickDeleteHandler,
}: PropTypes) => {
  const isWritingRecomment = commentIdWritingRecomment === commentId;

  return (
    <StyledCommentCard
      isReComment={isReComment}
      hasReComment={hasReComment}
      isWritingRecomment={isWritingRecomment}
    >
      {!!campus ? (
        <>
          <CommentHeader>
            {postWriter ? (
              <Text color="blue">{`글쓴이(${campus})`}</Text>
            ) : (
              <Text>{`익명(${campus})`}</Text>
            )}
            <IconButtonsWrapper>
              {!isReComment &&
                (isWritingRecomment ? (
                  <FaComment onClick={() => clickReCommentHandler(commentId)} />
                ) : (
                  <FaRegComment
                    onClick={() => clickReCommentHandler(commentId)}
                  />
                ))}
              {editable && (
                <FaRegTrashAlt
                  onClick={() => clickDeleteHandler(commentId, isReComment)}
                />
              )}
            </IconButtonsWrapper>
          </CommentHeader>
          <Text>{content}</Text>
          <Text>{createdDate}</Text>
        </>
      ) : (
        <>
          <CommentHeader>
            <Text color="gray">(삭제)</Text>
          </CommentHeader>
          <Text color="gray">삭제된 댓글입니다</Text>
        </>
      )}
    </StyledCommentCard>
  );
};

export default CommentCard;
