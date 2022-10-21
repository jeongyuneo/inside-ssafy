package com.demo.back.service.post;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import com.demo.back.domain.post.Post;
import com.demo.back.domain.post.PostRepository;
import com.demo.back.domain.user.User;
import com.demo.back.domain.user.UserRepository;
import com.demo.back.dto.post.request.PostCreateRequestDto;
import com.demo.back.dto.post.request.PostUpdateRequestDto;
import com.demo.back.dto.post.response.PostDetailResponseDto;
import com.demo.back.dto.post.response.PostListResponseDto;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {
    private static final String POST_NOT_FOUND_EXCEPTION = "Post Not Found";
    private static final String USER_NOT_FOUND_EXCEPTION = "User Not Found";
    private static final String USER_NOT_AUTHORIZED_EXCEPTION = "User Not Authorized";
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    @Override
    public long addPost(PostCreateRequestDto postCreateDto) {
        User user = findUserById(postCreateDto.getUserId());
        return postRepository.save(postCreateDto.toEntity(user)).getId();
    }

    @Override
    public PostDetailResponseDto findPost(long postId) {
        Post post = findPostById(postId);
        post.addViewCnt();
        postRepository.save(post);
        return PostDetailResponseDto.builder()
                .id(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .writer(post.getWriter().getName())
                .registDate(post.getRegistDate())
                .viewCnt(post.getViewCnt())
                .build();
    }

    @Override
    public long modifyPost(PostUpdateRequestDto postUpdateRequestDto) throws Exception {
        User user = findUserById(postUpdateRequestDto.getUserId());
        Post post = findPostById(postUpdateRequestDto.getPostId());
        if (!post.isControllable(user)) {
            throw new Exception(USER_NOT_AUTHORIZED_EXCEPTION);
        }
        post.update(postUpdateRequestDto);
        return postRepository.save(post).getId();
    }

    @Override
    public boolean removePost(String userId, long postId) throws Exception {
        User user = findUserById(userId);
        Post post = findPostById(postId);
        if (!post.isControllable(user)) {
            throw new Exception(USER_NOT_AUTHORIZED_EXCEPTION);
        }
        postRepository.delete(post);
        return !postRepository.findById(postId).isPresent();
    }

    @Override
    public List<PostListResponseDto> findPostList() {
        List<Post> entityList = postRepository.findAll();
        List<PostListResponseDto> list = new ArrayList<>();
        for (Post post : entityList) {
            list.add(PostListResponseDto.builder()
                            .id(post.getId())
                            .title(post.getTitle())
                            .registDate(post.getRegistDate())
                            .viewCnt(post.getViewCnt())
                            .writer(post.getWriter().getName())
                    .build());
        }
        return list;
    }

    private User findUserById(String userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException(USER_NOT_FOUND_EXCEPTION));
    }

    private Post findPostById(long postId) {
        return postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException(POST_NOT_FOUND_EXCEPTION));
    }
}
