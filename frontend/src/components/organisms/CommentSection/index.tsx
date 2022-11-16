import React from 'react';
import CommentCard from '../../molecules/CommentCard';
import { EachCommentGroup, ReComments, StyledCommentSection } from './styles';
import {
  PropTypes,
  CommentResponseTypes,
  ReCommentResponseTypes,
} from './types';

/**
 * PostDetail 페이지의 Comment 섹션
 *
 * @author jojo
 */
const CommentSection = ({ commentResponses, ...restHandlers }: PropTypes) => {
  return (
    <StyledCommentSection>
      {commentResponses.map(
        ({
          commentId,
          reCommentResponses,
          ...restComment
        }: CommentResponseTypes) => (
          <EachCommentGroup key={commentId}>
            <CommentCard
              commentId={commentId}
              isReComment={false}
              {...restHandlers}
              {...restComment}
            />
            {reCommentResponses.map(
              ({ reCommentId, ...restRecomment }: ReCommentResponseTypes) => (
                <ReComments key={reCommentId}>
                  <CommentCard
                    commentId={reCommentId}
                    isReComment
                    {...restRecomment}
                    {...restHandlers}
                  />
                </ReComments>
              ),
            )}
          </EachCommentGroup>
        ),
      )}
    </StyledCommentSection>
  );
};

export default CommentSection;
