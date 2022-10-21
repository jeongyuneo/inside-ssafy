package com.demo.back.service.comment;

import java.util.List;

import com.demo.back.dto.comment.request.CommentCreateRequestDto;
import com.demo.back.dto.comment.request.CommentUpdateRequestDto;
import com.demo.back.dto.comment.response.CommentListResponseDto;

public interface CommentService {
    public long addComment(CommentCreateRequestDto commentCreateRequestDto);
    public long modifyComment(CommentUpdateRequestDto commentUpdateRequestDto) throws Exception;
    public boolean removeComment(String userId, long commentId) throws Exception;
    public List<CommentListResponseDto> findCommentList(long postId);
}
