import React from 'react';
import Input from '../../atoms/Input';
import { IoMdPaperPlane } from 'react-icons/io';
import { StyledCommentInput } from './styles';
import { PropTypes } from './types';

/**
 * inputs는 key-value 하나짜리 객체
 *
 * @author jojo
 */
const CommentInput = ({
  inputs,
  clickSubmitHandler,
  changeHandler,
}: PropTypes) => {
  return (
    <StyledCommentInput>
      <Input
        name="commentInput"
        backgroundColor="#E7E7E7"
        placeholder="댓글을 입력하세요"
        inputs={inputs}
        changeHandler={changeHandler}
      />
      <IoMdPaperPlane size={20} onClick={clickSubmitHandler} />
    </StyledCommentInput>
  );
};

export default CommentInput;
