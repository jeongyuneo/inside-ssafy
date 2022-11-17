import React from 'react';
import { useQuery } from '@tanstack/react-query';
import CommentSection from '../../organisms/CommentSection';
import PostSection from '../../organisms/PostSection';
import getPostDetail from './getPostDetail';
import { StyledPostDetail } from './styles';
import { PostDetailTypes } from './types';
import navigator from '../../../utils/navigator';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../molecules/Navbar';

/**
 * 게시글 상세 컴포넌트
 *
 * @author jojo
 */
const PostDetail = () => {
  const navigate = useNavigate();

  const { data: post } = useQuery<PostDetailTypes>(['postDetail'], () =>
    getPostDetail(1),
  );
  console.log(post);

  const clickMenuButtonHandler = () => {
    console.log('menu click');
  };
  const clickLikeButtonHandler = () => {
    console.log('like!');
  };

  const clickReCommentHandler = () => {
    console.log('recomment!');
  };
  const clickDeleteHandler = () => {
    console.log('delete!');
  };
  return (
    <StyledPostDetail>
      {post && (
        <>
          <Navbar
            clickLogoHandler={navigator(navigate).main}
            clickMypageHandler={navigator(navigate).mypage}
          />
          <PostSection
            content={post.content}
            likeCount={post.likeCount}
            commentCount={post.commentCount}
            files={post.files}
            postId={post.postId}
            title={post.title}
            createdDate={post.createdDate}
            editable={post.editable}
            hasPostLike={post.hasPostLike}
            clickBackButtonHandler={navigator(navigate).back}
            clickMenuButtonHandler={clickMenuButtonHandler}
            clickLikeButtonHandler={clickLikeButtonHandler}
          />
          <CommentSection
            commentResponses={post.commentResponses}
            clickReCommentHandler={clickReCommentHandler}
            clickDeleteHandler={clickDeleteHandler}
          />
        </>
      )}
    </StyledPostDetail>
  );
};

export default PostDetail;
