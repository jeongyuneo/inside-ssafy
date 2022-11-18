import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import navigator from '../../../utils/navigator';
import Text from '../../atoms/Text';
import Navbar from '../../molecules/Navbar';
import SearchBar from '../../molecules/SearchBar';
import PostsList from '../../organisms/PostsList';
import { NavbarWrapper } from '../Menu/styles';
import { requestSearch } from './requestSearchResponse';
import { PostListWrapper, SearchBarWrapper, StyledPostSearch } from './styles';

const PostSearch = () => {
  const [searchBarInput, setSearchBarInput] = useState({
    value: '',
  });

  const [items, setItems] = useState<any>(null);

  const navigate = useNavigate();

  const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchBarInput(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const clickSearch = async () => {
    if (searchBarInput.value.length === 0 || searchBarInput.value === '') {
      console.log('Search');
      setItems(null);
      return;
    }
    const searchResponse = await requestSearch(searchBarInput.value);
    if (searchResponse) {
      setItems(searchResponse.postsResponses);
    }
  };

  const goToBeforePage = () => {
    navigate(-1);
  };

  const clickPostItems = (postId: number) => {
    navigate('/postdetail', { state: { postId: postId } });
  };

  return (
    <StyledPostSearch>
      <NavbarWrapper>
        <Navbar
          clickLogoHandler={navigator(navigate).main}
          clickMypageHandler={navigator(navigate).mypage}
        ></Navbar>
      </NavbarWrapper>
      <SearchBarWrapper>
        <SearchBar
          name={'value'}
          inputs={searchBarInput}
          changeInputHandler={changeInput}
          clickSearchButtonHandler={clickSearch}
          clickBackButtonHandler={goToBeforePage}
        />
      </SearchBarWrapper>
      <PostListWrapper>
        {items ? (
          <PostsList items={items} clickPostItemHandler={clickPostItems} />
        ) : (
          <Text>게시글이 존재하지 않습니다.</Text>
        )}
      </PostListWrapper>
    </StyledPostSearch>
  );
};

export default PostSearch;
