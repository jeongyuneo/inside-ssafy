import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import CommentSection from '../../organisms/CommentSection';
import PostSection from '../../organisms/PostSection';
import getPostDetail from './getPostDetail';
import { StyledPostDetail } from './styles';
import { PostDetailTypes } from './types';
import navigator from '../../../utils/navigator';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../molecules/Navbar';
import deletePostLike from './deletePostLike';
import postPostLike from './postPostLike';

/**
 * 게시글 상세 컴포넌트
 *
 * @author jojo
 */
const PostDetail = () => {
  const navigate = useNavigate();
  const postId = 1;

  const [postLiked, setPostLiked] = useState(false);

  const { data: post } = useQuery<PostDetailTypes>(['postDetail'], () =>
    getPostDetail(postId),
  );
  console.log(post);

  const clickMenuButtonHandler = () => {
    console.log('menu click');
  };

  const clickReCommentHandler = () => {
    console.log('recomment!');
  };
  const clickDeleteHandler = () => {
    console.log('delete!');
  };

  const togglePostLikeHandler = async () => {
    console.log(postLiked);

    const isSuccessful: boolean = await (postLiked
      ? deletePostLike(postId)
      : postPostLike(postId));

    isSuccessful && setPostLiked(prev => !prev);
  };

  useEffect(() => {
    post && setPostLiked(post.hasPostLike);
  }, [post]);
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
            togglePostLikeHandler={togglePostLikeHandler}
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
