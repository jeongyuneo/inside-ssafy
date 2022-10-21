package com.demo.back.service.comment;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

import com.demo.back.domain.comment.Comment;
import com.demo.back.domain.comment.CommentRepository;
import com.demo.back.domain.post.Post;
import com.demo.back.domain.post.PostRepository;
import com.demo.back.domain.user.User;
import com.demo.back.domain.user.UserRepository;
import com.demo.back.dto.comment.request.CommentCreateRequestDto;
import com.demo.back.dto.comment.request.CommentUpdateRequestDto;
import com.demo.back.dto.comment.response.CommentListResponseDto;
import com.demo.back.dto.comment.response.KidCommentListResponseDto;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {
    private static final String COMMENT_NOT_FOUND_EXCEPTION= "Comment Not Found";
    private static final String POST_NOT_FOUND_EXCEPTION = "Post Not Found";
    private static final String USER_NOT_FOUND_EXCEPTION = "User Not Found";
    private static final String USER_NOT_AUTHORIZED_EXCEPTION = "User Not Authorized";
    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    @Override
    public long addComment(CommentCreateRequestDto commentCreateRequestDto) {
        User user = findUserById(commentCreateRequestDto.getWriter());
        Post post = findPostById(commentCreateRequestDto.getPost());
        return commentRepository.save(commentCreateRequestDto.toEntity(user, post)).getId();
    }

    @Override
    public long modifyComment(CommentUpdateRequestDto commentUpdateRequestDto) throws Exception {
        User user = findUserById(commentUpdateRequestDto.getWriter());
        Comment comment = findCommentById(commentUpdateRequestDto.getCommentId());
        if (!comment.isControllable(user)) {
            throw new Exception(USER_NOT_AUTHORIZED_EXCEPTION);
        }
        comment.update(commentUpdateRequestDto);
        return commentRepository.save(comment).getId();
    }

    @Transactional
    @Override
    public boolean removeComment(String userId, long commentId) throws Exception {
        User user = findUserById(userId);
        Comment comment = findCommentById(commentId);
        if (!comment.isControllable(user)) {
            throw new Exception(USER_NOT_AUTHORIZED_EXCEPTION);
        }
        commentRepository.deleteByUpper(commentId);
        commentRepository.delete(comment);
        return !commentRepository.findById(commentId).isPresent();
    }

    @Override
    public List<CommentListResponseDto> findCommentList(long postId) {
        Post post = findPostById(postId);
        List<Comment> entityList = commentRepository.findAllByPostAndUpper(post, null);
        List<CommentListResponseDto> list = new ArrayList<>();
        for (Comment comment : entityList) {
            list.add(CommentListResponseDto.builder()
                            .id(comment.getId())
                            .content(comment.getContent())
                            .registDate(comment.getRegistDate())
                            .writer(comment.getWriter().getName())
                            .kids(findKids(comment))
                    .build());
        }
        return list;
    }

    private List<KidCommentListResponseDto> findKids(Comment comment) {
        List<Comment> kidEntityList = commentRepository.findAllByUpper(comment.getId());
        List<KidCommentListResponseDto> kids = new ArrayList<>();
        for (Comment kid : kidEntityList) {
            kids.add(KidCommentListResponseDto.builder()
                    .id(kid.getId())
                    .content(kid.getContent())
                    .registDate(kid.getRegistDate())
                    .writer(kid.getWriter().getName())
                    .build());
        }
        return kids;
    }

    private Comment findCommentById(long commentId) {
        return commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException(COMMENT_NOT_FOUND_EXCEPTION));
    }

    private Post findPostById(long postId) {
        return postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException(POST_NOT_FOUND_EXCEPTION));
    }

    private User findUserById(String userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException(USER_NOT_FOUND_EXCEPTION));
    }
}
