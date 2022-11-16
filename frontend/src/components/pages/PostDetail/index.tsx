import { useQuery } from '@tanstack/react-query';
import React from 'react';
import CommentSection from '../../organisms/CommentSection';
import getPostDetail from './getPostDetail';
import { StyledPostDetail } from './styles';

/**
 * 게시글 상세 컴포넌트
 *
 * @author jojo
 */
const PostDetail = () => {
  const { data } = useQuery(['postDetail'], () => getPostDetail(1));

  const clickReCommentHandler = () => {
    console.log('recomment!');
  };
  const clickDeleteHandler = () => {
    console.log('delete!');
  };
  return (
    <StyledPostDetail>
      <CommentSection
        commentResponses={data.commentResponses}
        clickReCommentHandler={clickReCommentHandler}
        clickDeleteHandler={clickDeleteHandler}
      />
    </StyledPostDetail>
  );
};

export default PostDetail;
