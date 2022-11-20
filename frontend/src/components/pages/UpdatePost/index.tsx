import React, { ChangeEvent, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import TextareaLabel from '../../molecules/TextareaLabel';
import InputLabel from '../../molecules/InputLabel';
import Input from '../../atoms/Input';
import ButtonGroup from '../../molecules/ButtonGroup';
import Navbar from '../../molecules/Navbar';
import Image from '../../atoms/Image';
import { StyledCreatePost, FlexContainer, ImgWrapper } from './styles';
import { PostDetailType } from './types';
import getPostDetail from '../PostDetail/getPostDetail';
import navigator from '../../../utils/navigator';
import Blank from '../../../utils/Blank';
import updatePost from './updatePost';
import { GiCancel } from 'react-icons/gi';

/**
 * 유저에게 제목, 내용, 이미지 파일을 받아서 게시글을 수정합니다.
 * 제목, 내용, 이미지파일, 기존 이미지 삭제 여부를 FormData로 묶어서 Post 요청을 보냅니다.
 *
 * @author jini
 */
const UpdatePost = () => {
  const postId = 146;
  const { data: post } = useQuery<PostDetailType>(['postDetail'], () =>
    getPostDetail(postId),
  );

  const navigate = useNavigate();
  const location = useLocation();

  const [willDeleteImage, setWillDeleteImage] = useState(false);
  const [prevImg, setPrevImg] = useState(!!post?.files[0]);
  const [inputValue, setInputValue] = useState(post?.title);
  const [textareaValue, setTextareaValue] = useState(post?.content);
  const ref = useRef<HTMLInputElement>(null);
  const formData = new FormData();

  const changeTitleInfo = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const changeContentInfo = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
  };

  const changeImgHandler = () => {
    setPrevImg(false);
    setWillDeleteImage(true);
  };

  const clickEditButtonHandler = async () => {
    const postUpdateRequest = {
      title: inputValue,
      content: textareaValue,
      willDeleteImage: willDeleteImage,
    };

    const uploadFile = ref.current?.files?.[0] || '';
    formData.append('files', uploadFile);

    const json = JSON.stringify(postUpdateRequest);
    const blob = new Blob([json], { type: 'application/json' });
    formData.append('postUpdateRequest', blob);

    if (await updatePost(formData, postId)) {
      alert('게시글이 수정되었습니다.');
      navigator(navigate).back();
    } else {
      window.alert('서버가 원활하지 않습니다.');
    }
  };

  const clickIconHandler = () => {
    setPrevImg(false);
    setWillDeleteImage(true);
  };

  const buttonInfos = [
    { text: '수정하기', clickHandler: clickEditButtonHandler },
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
          defaultValue={inputValue}
          changeHandler={e => changeTitleInfo(e)}
        />
        <TextareaLabel
          id="content"
          name="content"
          width="22rem"
          defaultValue={post?.content}
          height="30rem"
          changeHandler={e => changeContentInfo(e)}
        >
          {'내용'}
        </TextareaLabel>
        <Input
          ref={ref}
          id="files"
          name="files"
          type="file"
          accept="image/*"
          width={22}
          backgroundColor="none"
          changeHandler={changeImgHandler}
        />
        {prevImg && (
          <ImgWrapper>
            {post?.files[0] && (
              <Image width={`20%`} src={post.files[0].url} alt="img" />
            )}
            <GiCancel onClick={clickIconHandler} />
          </ImgWrapper>
        )}
        <ButtonGroup width={22} height={3} buttonInfos={buttonInfos} isColumn />
        <Blank />
      </StyledCreatePost>
    </FlexContainer>
  );
};

export default UpdatePost;
