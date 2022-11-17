import React from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import Input from '../../atoms/Input';
import { StyledSearchBar } from './styles';
import { PropTypes } from './types';

const SearchBar = ({
  name,
  inputs,
  clickSearchButtonHandler,
  changeInputHandler,
}: PropTypes) => {
  return (
    <StyledSearchBar>
      <Input name={name} inputs={inputs} onChange={changeInputHandler} />
      <BiSearchAlt size={25} onClick={clickSearchButtonHandler} />
    </StyledSearchBar>
  );
};

export default SearchBar;
