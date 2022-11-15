import React from 'react';
import Input from '../../atoms/Input';
import { IoMdPaperPlane } from 'react-icons/io';
import { StyledCommentInput } from './styles';
import { PropTypes } from './types';

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
        changeHandler={changeHandler}
      />
      <IoMdPaperPlane onClick={clickSubmitHandler} />
    </StyledCommentInput>
  );
};

export default CommentInput;
