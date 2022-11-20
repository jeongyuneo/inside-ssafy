import React from 'react';
import Button from '../../atoms/Button';
import Text from '../../atoms/Text';
import {
  ButtonIconWrapper,
  ButtonWrapper,
  DateWrapper,
  PostWrapper,
  StyledPostHeader,
  TextWrapper,
} from './styled';
import { PropTypes } from './types';
import { GrMoreVertical } from 'react-icons/gr';
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa';

/**
 * 글의 제목과 날짜, 본인이 쓴 글인지를 인자로 받는다.
 * 왼쪽에 뒤로가기버튼, 오른쪽에 메뉴 버튼을 만들었으며
 * 우측 하단에도 공감버튼이 있다.
 * clickMenuButtonHandler와 clickBackButtonHandler, clickLikeButtonHandler로
 * 이벤트를 설정할 수 있다.
 *
 * @author jun
 */

const PostHeader = ({
  title,
  createdDate,
  editable,
  hasPostLike,
  clickBackButtonHandler,
  clickMenuButtonHandler,
  togglePostLikeHandler,
}: PropTypes) => {
  return (
    <StyledPostHeader>
      <ButtonWrapper>
        <Button isText clickHandler={clickBackButtonHandler}>
          뒤로가기
        </Button>
      </ButtonWrapper>
      <PostWrapper>
        <TextWrapper>
          <Text size={1.4}>{title}</Text>
          {editable && (
            <Button isText clickHandler={clickMenuButtonHandler}>
              <GrMoreVertical size={22} />
            </Button>
          )}
        </TextWrapper>
        <DateWrapper>
          <Text size={0.8}>{createdDate}</Text>
          <Button
            backgroundColor={'white'}
            textColor={'#696666'}
            clickHandler={togglePostLikeHandler}
            borderColor={'#A0A0A0'}
          >
            <ButtonIconWrapper>
              {hasPostLike ? (
                <FaThumbsUp size={15} />
              ) : (
                <FaRegThumbsUp size={15} />
              )}
              {' 공감'}
            </ButtonIconWrapper>
          </Button>
        </DateWrapper>
      </PostWrapper>
    </StyledPostHeader>
  );
};

export default PostHeader;
