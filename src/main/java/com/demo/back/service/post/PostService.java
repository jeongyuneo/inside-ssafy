package com.demo.back.service.post;

import com.demo.back.domain.post.Post;
import com.demo.back.domain.post.PostRepository;
import com.demo.back.domain.user.User;
import com.demo.back.domain.user.UserRepository;
import com.demo.back.dto.post.request.PostCreateRequest;
import com.demo.back.dto.post.request.PostUpdateRequest;
import com.demo.back.dto.post.response.PostFindResponse;
import com.demo.back.dto.post.response.PostsFindResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostService {

    private static final String POST_NOT_FOUND = "Post Not Found";
    private static final String USER_NOT_FOUND = "User Not Found";
    private static final String USER_NOT_AUTHORIZED = "User Not Authorized";
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public long addPost(long userId, PostCreateRequest postCreateRequest) {
        User user = findUserById(userId);
        return postRepository.save(postCreateRequest.toEntity(user)).getId();
    }

    public PostFindResponse findPost(long postId, long userId) {
        Post post = findPostById(postId);
        User user = findUserById(userId);
        post.view();
        postRepository.save(post);
        return PostFindResponse.builder()
                .postId(post.getId())
                .likeCount(post.getLikeCount())
                .viewCount(post.getViewCount())
                .isAuthorized(post.isAuthorized(user))
                .content(post.getContent())
                .title(post.getTitle())
                .userName(post.getUser().getName())
                .createdDate(post.getCreatedDate())
                .lastModifiedDate(post.getLastModifiedDate())
                .build();
    }

    public long modifyPost(long postId, long userId, PostUpdateRequest postUpdateRequest) throws Exception {
        Post post = findPostById(postId);
        User user = findUserById(userId);
        if (!post.isAuthorized(user)) {
            throw new Exception(USER_NOT_AUTHORIZED);
        }
        post.update(postUpdateRequest.getContent(), postUpdateRequest.getTitle());
        return postRepository.save(post).getId();
    }

    public boolean removePost(long postId, long userId) throws Exception {
        Post post = findPostById(postId);
        User user = findUserById(userId);
        if (!post.isAuthorized(user)) {
            throw new Exception(USER_NOT_AUTHORIZED);
        }
        postRepository.delete(post);
        return !postRepository.findById(postId).isPresent();
    }

    public List<PostsFindResponse> findPosts() {
        return postRepository.findAll()
                .stream()
                .map(post -> PostsFindResponse.builder()
                        .postId(post.getId())
                        .likeCount(post.getLikeCount())
                        .viewCount(post.getViewCount())
                        .title(post.getTitle())
                        .userName(post.getUser().getName())
                        .createdDate(post.getCreatedDate())
                        .lastModifiedDate(post.getLastModifiedDate())
                        .build())
                .collect(Collectors.toList());
    }

    private User findUserById(long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException(USER_NOT_FOUND));
    }

    private Post findPostById(long postId) {
        return postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException(POST_NOT_FOUND));
    }
}
