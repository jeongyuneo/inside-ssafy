import { SelectChangeEvent } from '@mui/material';
import React, { useState } from 'react';
import SearchBar from '../../ molecules / SearchBar';
import { StyledPostSearch } from './styles';

const PostSearch = () => {
  const [searchBarInput, setSearchBarInput] = useState({
    value: '',
  });

  const changeInput = (e: SelectChangeEvent<string>) => {
    setSearchBarInput(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const clickSearch = () => {
    console.log('Search');
  };

  return (
    <StyledPostSearch>
      <SearchBar
        name={'value'}
        inputs={searchBarInput}
        changeInputHandler={changeInput}
        clickSearchButtonHandler={clickSearch}
      />
    </StyledPostSearch>
  );
};

export default PostSearch;
