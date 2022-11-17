import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import navigator from '../../../utils/navigator';
import BoardNavbar from '../../molecules/BoardNavbar';
import Navbar from '../../molecules/Navbar';
import PostsList from '../../organisms/PostsList';
import { PostsWrapper, StyledBoard } from './styles';
import { requestBoardList } from './requestBoardList';
import { PostSummaryItemTypes } from '../../molecules/PostSummary/types';
import { items } from '../../organisms/PostsList/testitems';

/**
 * 현재 구현할 목적으로 route만 연결한 상태
 * 아래의 코드는 Board페이지 작성시 개선하여 새롭게 만들 예정
 * 현재 만든 컴포넌트 : BoardNavBar
 *
 * @author jun
 */

const Board = () => {
  const PAGE_AMOUNT = 5;

  const [query, setQuery] = useState(null);
  const [amount, setAmount] = useState(5);
  const [ref, inView] = useInView();

  /*
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  */
  const { data, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    [query], // queryKey
    ({ pageParam = 0 }) => requestBoardList(pageParam, PAGE_AMOUNT), // queryFn
    {
      getNextPageParam: lastPage =>
        !lastPage.isLast ? lastPage.items : undefined,
    },
  );

  useEffect(() => {
    if (inView) fetchNextPage();
    console.log('inView');
  }, [inView]);

  const navigate = useNavigate();

  const goToBeforePage = () => {
    navigate(-1);
  };

  const clickSearch = () => {
    console.log('search');
    console.log(data?.pages);
    console.log(data?.pages[0].items);
    console.log(data?.pageParams);
  };

  const clickPostItem = (postId: number) => {
    console.log('click : ' + postId);
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
            !page.isLast && (
              <PostsList
                key={'page' + index}
                items={page.items}
                clickPostItemHandler={clickPostItem}
              ></PostsList>
            )
          );
        })}
      </PostsWrapper>
      {isFetchingNextPage ? (
        <div>Loading...</div>
      ) : (
        <div ref={ref}>게시글의 끝입니다.</div>
      )}
    </StyledBoard>
  );
};

export default Board;
