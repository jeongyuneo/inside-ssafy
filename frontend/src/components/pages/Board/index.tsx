import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import navigator from '../../../utils/navigator';
import BoardNavbar from '../../molecules/BoardNavbar';
import Navbar from '../../molecules/Navbar';
import PostsList from '../../organisms/PostsList';
import { PostsWrapper, StyledBoard, StyledButtonWrapper } from './styles';
import { requestBoardList } from './requestBoardList';
import { CiCirclePlus } from 'react-icons/ci';

/**
 * PAGE_AMount 만큼 게시글을 불러오는 infiniteScroll을 사용한다
 *
 * @author jun
 */

const Board = () => {
  const PAGE_AMOUNT = 15;
  const [ref, inView] = useInView();

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['boardList'],
    ({ pageParam = 0 }) => requestBoardList(pageParam, PAGE_AMOUNT),
    {
      getNextPageParam: lastPage =>
        !lastPage.last ? lastPage.nextPage : undefined,
    },
  );

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  const navigate = useNavigate();

  const goToBeforePage = () => {
    navigate(-1);
  };

  const clickSearch = () => {
    console.log('search');
    // 게시글 검색 기능으로 이동
  };

  const clickPostItem = (postId: number) => {
    console.log('click : ' + postId);
    // PostDetail페이지로 이동
  };

  const clickAddPost = () => {
    console.log('AddPost');
    // PostAdd 생성
  };

  return (
    <StyledBoard>
      <Navbar
        clickLogoHandler={navigator(navigate).main}
        clickMypageHandler={navigator(navigate).mypage}
      ></Navbar>
      <BoardNavbar
        clickBackButtonHandler={goToBeforePage}
        clickSearchButtonHandler={clickSearch}
      ></BoardNavbar>
      <PostsWrapper>
        {data?.pages.map((page, index) => {
          return (
            <PostsList
              key={'page' + index}
              items={page.postsResponses}
              clickPostItemHandler={clickPostItem}
            ></PostsList>
          );
        })}
      </PostsWrapper>
      {isFetchingNextPage ? (
        <div>Loading...</div>
      ) : (
        <div ref={ref}>게시글의 끝입니다.</div>
      )}
      <StyledButtonWrapper>
        <CiCirclePlus
          style={{
            backgroundColor: 'white',
          }}
          size={42}
          onClick={clickAddPost}
        />
      </StyledButtonWrapper>
    </StyledBoard>
  );
};

export default Board;
