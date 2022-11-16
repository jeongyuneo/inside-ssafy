import React from 'react';
import { useNavigate } from 'react-router-dom';
import BoardNavbar from '../../molecules/BoardNavbar';
import { StyledBoard } from './styles';

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
