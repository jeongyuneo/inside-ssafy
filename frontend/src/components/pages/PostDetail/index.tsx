import React, { ChangeEvent, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import CommentSection from '../../organisms/CommentSection';
import PostSection from '../../organisms/PostSection';
import getPostDetail from './getPostDetail';
import { StyledPostDetail } from './styles';
import { PostDetailTypes } from './types';
import navigator from '../../../utils/navigator';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../molecules/Navbar';
import deletePostLike from './deletePostLike';
import postPostLike from './postPostLike';
import deleteRecomment from './deleteRecomment';
import deleteComment from './deleteComment';
import useFocus from '../../../hooks/useFocus';
import postComment from './postComment';
import postRecomment from './postRecomment';

/**
 * 게시글 상세 컴포넌트
 *
 * @author jojo
 */
const PostDetail = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const postId: number = location.state.postId;

  const [commentIdWritingRecomment, setCommentIdWritingRecomment] =
    useState(-1);
  const [postLiked, setPostLiked] = useState(false);
  const [inputs, setInputs] = useState({
    comment: '',
  });
  const { ref, setIsFocused } = useFocus();

  const { data: post } = useQuery<PostDetailTypes>(
    ['postDetail', postLiked],
    () => getPostDetail(postId),
  );
  console.log(post);

  const clickMenuButtonHandler = () => {
    console.log('menu click');
  };

  const clickReCommentHandler = (commentId: number) => {
    setIsFocused(prev => !prev);
    commentIdWritingRecomment === -1
      ? setCommentIdWritingRecomment(commentId)
      : setCommentIdWritingRecomment(-1);
  };

  const clickDeleteHandler = (commentId: number, isReComment: boolean) => {
    if (confirm('삭제하시겠습니까?')) {
      isReComment ? deleteRecomment(commentId) : deleteComment(commentId);
    }
  };

  const clickSubmitHandler = async () => {
    if (inputs.comment.trim() === '') {
      return;
    }

    commentIdWritingRecomment === -1
      ? await postComment(postId, inputs.comment)
      : await postRecomment(commentIdWritingRecomment, inputs.comment);

    queryClient.invalidateQueries(['postDetail', postLiked]);

    setInputs(prev => ({
      ...prev,
      comment: '',
    }));
  };

  const changeCommentInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs(prev => ({
      ...prev,
      comment: e.target.value,
    }));
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
            ref={ref}
            inputs={inputs}
            commentResponses={post.commentResponses}
            commentIdWritingRecomment={commentIdWritingRecomment}
            clickReCommentHandler={clickReCommentHandler}
            clickDeleteHandler={clickDeleteHandler}
            clickSubmitHandler={clickSubmitHandler}
            changeCommentInputHandler={changeCommentInputHandler}
          />
        </>
      )}
    </StyledPostDetail>
  );
};

export default PostDetail;
