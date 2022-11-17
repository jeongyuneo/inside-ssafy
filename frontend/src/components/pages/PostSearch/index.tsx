import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../molecules/SearchBar';
import { StyledPostSearch } from './styles';

const PostSearch = () => {
  const [searchBarInput, setSearchBarInput] = useState({
    value: 'h',
  });

  const navigate = useNavigate();

  const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
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

  const goToBeforePage = () => {
    navigate(-1);
  };

  return (
    <StyledPostSearch>
      <SearchBar
        name={'value'}
        inputs={searchBarInput}
        changeInputHandler={changeInput}
        clickSearchButtonHandler={clickSearch}
        clickBackButtonHandler={goToBeforePage}
      />
    </StyledPostSearch>
  );
};

export default PostSearch;
