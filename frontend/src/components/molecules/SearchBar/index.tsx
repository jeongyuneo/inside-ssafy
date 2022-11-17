import React from 'react';
import { BiArrowBack, BiSearchAlt } from 'react-icons/bi';
import Input from '../../atoms/Input';
import { StyledSearchBar } from './styles';
import { PropTypes } from './types';

const SearchBar = ({
  name,
  inputs,
  clickBackButtonHandler,
  clickSearchButtonHandler,
  changeInputHandler,
}: PropTypes) => {
  return (
    <StyledSearchBar>
      <BiArrowBack size={28} onClick={clickBackButtonHandler} />
      <Input
        width={18}
        height={2.5}
        backgroundColor={'white'}
        name={name}
        inputs={inputs}
        changeHandler={changeInputHandler}
      />
      <BiSearchAlt size={28} onClick={clickSearchButtonHandler} />
    </StyledSearchBar>
  );
};

export default SearchBar;
