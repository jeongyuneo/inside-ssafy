import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import navigator from '../../../utils/navigator';
import TextareaLabel from '../../molecules/TextareaLabel';
import { StyledCreatePost, FlexContainer } from './styles';
import InputLabel from '../../molecules/InputLabel';
import Input from '../../atoms/Input';
import ButtonGroup from '../../molecules/ButtonGroup';
import Navbar from '../../molecules/Navbar';

const CreatePost = () => {
  const navigate = useNavigate();
  const [textareaValue, setTextareaValue] = useState('');
  const [inputValue, setInputValue] = useState({
    title: '',
  });

  const changeContentInfo = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
  };

  const changeTitleInfo = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const clickAddButtonHandler = () => {
    console.log('addHandler clicked');
  };

  const clickExitButtonHandler = () => {
    console.log('exitHandle clicked');
  };

  const buttonInfos = [
    { text: '등록하기', clickHandler: clickAddButtonHandler },
    { text: '나가기', clickHandler: clickExitButtonHandler },
  ];

  return (
    <FlexContainer>
      <Navbar
        clickLogoHandler={navigator(navigate).main}
        clickMypageHandler={navigator(navigate).mypage}
      />
      <StyledCreatePost>
        <InputLabel
          id="title"
          name="title"
          labelValue="제목"
          width={22}
          height={3}
          inputs={inputValue}
          changeHandler={e => changeTitleInfo(e)}
        />
        <TextareaLabel
          id="content"
          name="content"
          width={22}
          height={30}
          changeHandler={e => changeContentInfo(e)}
        >
          {'내용'}
        </TextareaLabel>
        <Input
          id="file"
          name="file"
          type="file"
          accept="image/*"
          width={22}
          backgroundColor="none"
        />
        <ButtonGroup width={22} height={3} buttonInfos={buttonInfos} isColumn />
      </StyledCreatePost>
    </FlexContainer>
  );
};

export default CreatePost;
