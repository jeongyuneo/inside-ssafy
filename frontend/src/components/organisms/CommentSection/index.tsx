import React from 'react';
import HorizontalLine from '../../../utils/HorizontalLine';
import CommentCard from '../../molecules/CommentCard';
import CommentInput from '../../molecules/CommentInput';
import {
  EachCommentGroup,
  HorizontalLineWrapper,
  ReComments,
  StyledCommentSection,
} from './styles';
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
            <HorizontalLineWrapper>
              <HorizontalLine width="90%" />
            </HorizontalLineWrapper>
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
      <CommentInput
        inputs={{ comment: 'b' }}
        clickSubmitHandler={() => console.log('click')}
        changeHandler={() => console.log('change')}
      />
    </StyledCommentSection>
  );
};

export default CommentSection;
