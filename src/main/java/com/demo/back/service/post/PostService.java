package com.demo.back.service.post;

import java.util.List;

import com.demo.back.dto.post.request.PostCreateRequestDto;
import com.demo.back.dto.post.request.PostUpdateRequestDto;
import com.demo.back.dto.post.response.PostDetailResponseDto;
import com.demo.back.dto.post.response.PostListResponseDto;

public interface PostService {
    public long addPost(PostCreateRequestDto postCreateDto);
    public PostDetailResponseDto findPost(long postId);
    public long modifyPost(PostUpdateRequestDto postUpdateRequestDto) throws Exception;
    public boolean removePost(String userId, long postId) throws Exception;
    public List<PostListResponseDto> findPostList();
}
