import React from 'react';
import Image from '../../atoms/Image';
import Text from '../../atoms/Text';
import Button from '../../atoms/Button';
import {
  StyledMyInfo,
  TextWrapper,
  ImageTextWrapper,
  ButtonsWrapper,
} from './styles';
import { PropTypes } from './types';

const MyInfo = ({
  name,
  studentNumber,
  clickEditBtnHandler,
  clickLogoutHandler,
}: PropTypes) => {
  return (
    <StyledMyInfo>
      <ImageTextWrapper>
        <Image width="8rem" src="images/profile.png" alt="profile" isCircle />
        <TextWrapper>
          <Text size={1.3}>{name + ' 님'}</Text>
          <Text size={1.3}>{studentNumber}</Text>
        </TextWrapper>
      </ImageTextWrapper>
      <ButtonsWrapper>
        <Button width={20} height={3} clickHandler={clickEditBtnHandler}>
          비밀번호 수정
        </Button>
        <Button width={20} height={3} clickHandler={clickLogoutHandler}>
          로그아웃
        </Button>
      </ButtonsWrapper>
    </StyledMyInfo>
  );
};

export default MyInfo;
