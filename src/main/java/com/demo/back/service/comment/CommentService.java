package com.demo.back.service.comment;

import com.demo.back.domain.comment.Comment;
import com.demo.back.domain.comment.CommentRepository;
import com.demo.back.domain.comment.recomment.RecommentRepository;
import com.demo.back.domain.post.Post;
import com.demo.back.domain.post.PostRepository;
import com.demo.back.domain.user.User;
import com.demo.back.domain.user.UserRepository;
import com.demo.back.dto.comment.recomment.response.RecommentsFindResponse;
import com.demo.back.dto.comment.request.CommentCreateRequest;
import com.demo.back.dto.comment.request.CommentUpdateRequest;
import com.demo.back.dto.comment.response.CommentsFindResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentService {

    private static final String COMMENT_NOT_FOUND = "Comment Not Found";
    private static final String POST_NOT_FOUND = "Post Not Found";
    private static final String USER_NOT_FOUND = "User Not Found";
    private static final String USER_NOT_AUTHORIZED = "User Not Authorized";
    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final RecommentRepository recommentRepository;
    private final UserRepository userRepository;

    public long addComment(long postId, long userId, CommentCreateRequest commentCreateRequest) {
        Post post = findPostById(postId);
        User user = findUserById(userId);
        return commentRepository.save(commentCreateRequest.toEntity(user, post)).getId();
    }

    public List<CommentsFindResponse> findComments(long postId, long userId) {
        Post post = findPostById(postId);
        User user = findUserById(userId);
        return commentRepository.findAllByPost(post)
                .stream()
                .map(comment -> CommentsFindResponse.builder()
                        .commentId(comment.getId())
                        .isAuthorized(comment.isAuthorized(user))
                        .content(comment.getContent())
                        .userName(comment.getUser().getName())
                        .createdDate(comment.getCreatedDate())
                        .lastModifiedDate(comment.getLastModifiedDate())
                        .recomments(findRecomments(comment, user))
                        .build())
                .collect(Collectors.toList());
    }

    public long modifyComment(long commentId, long userId, CommentUpdateRequest commentUpdateRequest) throws Exception {
        Comment comment = findCommentById(commentId);
        User user = findUserById(userId);
        if (!comment.isAuthorized(user)) {
            throw new Exception(USER_NOT_AUTHORIZED);
        }
        comment.update(commentUpdateRequest.getContent());
        return commentRepository.save(comment).getId();
    }

    @Transactional
    public boolean removeComment(long commentId, long userId) throws Exception {
        Comment comment = findCommentById(commentId);
        User user = findUserById(userId);
        if (!comment.isAuthorized(user)) {
            throw new Exception(USER_NOT_AUTHORIZED);
        }
        recommentRepository.deleteAllByComment(comment);
        commentRepository.delete(comment);
        return !commentRepository.findById(commentId).isPresent();
    }

    private List<RecommentsFindResponse> findRecomments(Comment comment, User user) {
        return recommentRepository.findAllByComment(comment)
                .stream()
                .map(recomment -> RecommentsFindResponse.builder()
                        .recommentId(recomment.getId())
                        .isAuthorized(recomment.isAuthorized(user))
                        .content(recomment.getContent())
                        .userName(recomment.getUser().getName())
                        .createdDate(recomment.getCreatedDate())
                        .lastModifiedDate(recomment.getLastModifiedDate())
                        .build()
                )
                .collect(Collectors.toList());
    }

    private Comment findCommentById(long commentId) {
        return commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException(COMMENT_NOT_FOUND));
    }

    private Post findPostById(long postId) {
        return postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException(POST_NOT_FOUND));
    }

    private User findUserById(long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException(USER_NOT_FOUND));
    }
}
