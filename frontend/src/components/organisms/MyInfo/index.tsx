import React from 'react';
import Image from '../../atoms/Image';
import Text from '../../atoms/Text';
import Button from '../../atoms/Button';
import { StyledMyInfo, TextWrapper, ImageTextWrapper } from './styles';
import { PropTypes } from './types';

const MyInfo = ({ name, studentNumber, clickEditBtnHandler }: PropTypes) => {
  return (
    <StyledMyInfo>
      <ImageTextWrapper>
        <Image width="150px" src="images/iNSSA_logo3.png" alt="logo" />
        <TextWrapper>
          <Text color="black" size={1.3}>
            {name + ' 님'}
          </Text>
          <Text color="black" size={1.3}>
            {studentNumber}
          </Text>
        </TextWrapper>
      </ImageTextWrapper>
      <Button width={20} height={3} clickHandler={clickEditBtnHandler}>
        비밀번호 수정
      </Button>
    </StyledMyInfo>
  );
};

export default MyInfo;
