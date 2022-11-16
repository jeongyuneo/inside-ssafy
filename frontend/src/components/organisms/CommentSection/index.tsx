import React from 'react';
import CommentCard from '../../molecules/CommentCard';
import { StyledCommentSection } from './styles';
import { PropTypes, CommentResponseTypes } from './types';

/**
 * PostDetail 페이지의 Comment 섹션
 *
 * @author jojo
 */
const CommentSection = ({ commentResponses, ...restHandlers }: PropTypes) => {
  return (
    <StyledCommentSection>
      {/* {commentResponses.map(
        ({ commentId, reCommentResponses, ...rest }: CommentResponseTypes) => {
          <CommentCard
            // key={commentId}
            commentId={commentId}
            isReComment={false}
            {...restHandlers}
            {...rest}
          />;
        },
      )} */}
    </StyledCommentSection>
  );
};

export default CommentSection;
