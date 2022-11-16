import React from 'react';
import Button from '../../atoms/Button';
import { StyledBoardNavbar } from './styles';
import { PropTypes } from './types';
import { BiSearchAlt } from 'react-icons/bi';

const BoardNavbar = ({
  clickBackButtonHandler,
  clickSearchButtonHandler,
}: PropTypes) => {
  return (
    <StyledBoardNavbar>
      <Button fontSize={1} clickHandler={clickBackButtonHandler} isText>
        뒤로가기
      </Button>
      <BiSearchAlt size={25} onClick={clickSearchButtonHandler} />
    </StyledBoardNavbar>
  );
};

export default BoardNavbar;
