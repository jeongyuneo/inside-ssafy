import React from 'react';
import { useNavigate } from 'react-router-dom';
import navigator from '../../../utils/navigator';
import BoardNavbar from '../../molecules/BoardNavbar';
import Navbar from '../../molecules/Navbar';
import PostsList from '../../organisms/PostsList';
import { items } from '../../organisms/PostsList/testitems';
import { StyledBoard } from './styles';

/**
 * 현재 구현할 목적으로 route만 연결한 상태
 * 아래의 코드는 Board페이지 작성시 개선하여 새롭게 만들 예정
 * 현재 만든 컴포넌트 : BoardNavBar
 *
 * @author jun
 */

const Board = () => {
  const navigate = useNavigate();

  const clickBack = () => {
    console.log('back');
  };

  const clickSearch = () => {
    console.log('search');
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
        clickBackButtonHandler={clickBack}
        clickSearchButtonHandler={clickSearch}
      ></BoardNavbar>
      <PostsList items={items} clickPostItemHandler={clickPostItem}></PostsList>
    </StyledBoard>
  );
};

export default Board;
