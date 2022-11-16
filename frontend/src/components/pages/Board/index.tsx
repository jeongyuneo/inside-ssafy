import React from 'react';
import { useNavigate } from 'react-router-dom';
import BoardNavbar from '../../molecules/BoardNavbar';
import { StyledBoard } from './styles';

/**
 * 현재 구현할 목적으로 route만 연결한 상태
 * 아래의 코드는 Board페이지 작성시 개선하여 새롭게 만들 예정
 * 현재 만든 컴포넌트 : BoardNavBar
 *
 * @author jun
 */

const clickBack = () => {
  console.log('back');
};

const clickSearch = () => {
  console.log('search');
};

const Board = () => {
  return (
    <StyledBoard>
      <BoardNavbar
        clickBackButtonHandler={clickBack}
        clickSearchButtonHandler={clickSearch}
      ></BoardNavbar>
    </StyledBoard>
  );
};

export default Board;
