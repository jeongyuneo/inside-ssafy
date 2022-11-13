import React from 'react';
import Button from '../../atoms/Button';
import Text from '../../atoms/Text';
import {
  ButtonWrapper,
  DateWrapper,
  PostWrapper,
  StyledPostHeader,
  TextWrapper,
} from './styled';
import { PropTypes } from './types';
import { GrMoreVertical } from 'react-icons/gr';

/**
 * 글의 제목과 날짜, 본인이 쓴 글인지를 인자로 받는다.
 * 왼쪽에 뒤로가기버튼, 오른쪽에 메뉴 버튼을 만들었으며
 * clickMenuButtonHandler와 clickBackButtonHandler로 이벤트를 설정할 수 있다.
 * 너비는 25rem이 default이지만 width로 조절 가능하다.
 *
 * @author jun
 */

const PostHeader = ({
  title,
  createTime,
  isMyPost,
  clickBackButtonHandler,
  clickMenuButtonHandler,
  width,
}: PropTypes) => {
  return (
    <StyledPostHeader width={width}>
      <ButtonWrapper>
        <Button isText clickHandler={clickBackButtonHandler}>
          뒤로가기
        </Button>
        {isMyPost && (
          <Button isText clickHandler={clickMenuButtonHandler}>
            <GrMoreVertical size={22} />
          </Button>
        )}
      </ButtonWrapper>
      <PostWrapper>
        <TextWrapper>
          <Text size={1.4}>{title}</Text>
        </TextWrapper>
        <DateWrapper>
          <Text size={0.8}>{createTime}</Text>
        </DateWrapper>
      </PostWrapper>
    </StyledPostHeader>
  );
};

export default PostHeader;
