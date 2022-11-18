import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import navigator from '../../../utils/navigator';
import BoardNavbar from '../../molecules/BoardNavbar';
import Navbar from '../../molecules/Navbar';
import PostsList from '../../organisms/PostsList';
import { PostsWrapper, StyledBoard, StyledButtonWrapper } from './styles';
import { requestBoardList } from './requestBoardList';
import { AiFillEdit } from 'react-icons/ai';
import Text from '../../atoms/Text';

/**
 * PAGE_AMOUNT 만큼 게시글을 불러오는 infiniteScroll을 사용한다
 * 현재 페이지 이동 clickEvent는 주석처리하였다(이후 연결 예정)
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
    navigate('/postsearch');
  };

  const clickPostItem = (postId: number) => {
    navigate('/postdetail', { state: { postId: postId } });
  };

  const clickAddPost = () => {
    navigate('/createpost');
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
        <Text>Loading...</Text>
      ) : (
        <div ref={ref}>게시글의 끝입니다.</div>
      )}
      <StyledButtonWrapper>
        <AiFillEdit color={'#01a7eb'} size={25} onClick={clickAddPost} />
      </StyledButtonWrapper>
    </StyledBoard>
  );
};

export default Board;
