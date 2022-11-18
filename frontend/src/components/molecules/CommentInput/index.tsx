import React, { ForwardedRef, forwardRef } from 'react';
import Input from '../../atoms/Input';
import { IoMdPaperPlane } from 'react-icons/io';
import { StyledCommentInput } from './styles';
import { CommentInputPropTypes } from './types';

/**
 * inputs는 key-value 하나짜리 객체
 *
 * @author jojo
 */
const CommentInput = (
  {
    inputs,
    clickSubmitHandler,
    changeCommentInputHandler,
  }: CommentInputPropTypes,
  ref: ForwardedRef<HTMLInputElement>,
) => {
  return (
    <StyledCommentInput>
      <Input
        ref={ref}
        name="comment"
        backgroundColor="#E7E7E7"
        placeholder="댓글을 입력하세요"
        inputs={inputs}
        changeHandler={changeCommentInputHandler}
      />
      <IoMdPaperPlane size={20} onClick={clickSubmitHandler} />
    </StyledCommentInput>
  );
};

export default forwardRef(CommentInput);
