import React, { ChangeEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import navigator from '../../../utils/navigator';
import TextareaLabel from '../../molecules/TextareaLabel';
import { StyledCreatePost, FlexContainer } from './styles';
import InputLabel from '../../molecules/InputLabel';
import Input from '../../atoms/Input';
import ButtonGroup from '../../molecules/ButtonGroup';
import Navbar from '../../molecules/Navbar';
import requestPost from './requestPost';
import Blank from '../../../utils/Blank';

/**
 * 유저에게 제목, 내용, 이미지 파일을 받아서 게시글을 등록합니다.
 * 제목, 내용, 이미지파일을 FormData로 묶어서 Post 요청을 보냅니다.
 *
 * @author jini
 */
const CreatePost = () => {
  const navigate = useNavigate();

  const [textareaValue, setTextareaValue] = useState('');
  const [inputValue, setInputValue] = useState({
    title: '',
  });
  const ref = useRef<HTMLInputElement>(null);

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

  const clickAddButtonHandler = async () => {
    if (inputValue.title.trim() === '' || textareaValue.trim() === '') {
      window.alert('제목 혹은 본문을 입력해주세요');
      return;
    }

    const postRequest = {
      title: inputValue.title,
      content: textareaValue,
    };

    const formData = new FormData();
    const uploadFile = ref.current?.files?.[0] || '';
    formData.append('files', uploadFile);

    const json = JSON.stringify(postRequest);
    const blob = new Blob([json], { type: 'application/json' });
    formData.append('postRequest', blob);

    if (await requestPost(formData)) {
      window.alert('게시글이 작성되었습니다.');
      navigator(navigate).board();
    } else {
      window.alert('서버가 원활하지 않습니다.');
    }
  };

  const buttonInfos = [
    { text: '등록하기', clickHandler: clickAddButtonHandler },
    { text: '나가기', clickHandler: navigator(navigate).back },
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
          width="22rem"
          height="30rem"
          changeHandler={e => changeContentInfo(e)}
        >
          {'내용'}
        </TextareaLabel>
        <Input
          id="file"
          ref={ref}
          name="file"
          type="file"
          accept="image/*"
          width={22}
          backgroundColor="none"
        />
        <ButtonGroup width={22} height={3} buttonInfos={buttonInfos} isColumn />
        <Blank />
      </StyledCreatePost>
    </FlexContainer>
  );
};

export default CreatePost;
