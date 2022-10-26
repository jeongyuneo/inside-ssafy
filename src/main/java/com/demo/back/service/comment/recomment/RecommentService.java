package com.demo.back.service.comment.recomment;

import com.demo.back.domain.comment.Comment;
import com.demo.back.domain.comment.CommentRepository;
import com.demo.back.domain.comment.recomment.Recomment;
import com.demo.back.domain.comment.recomment.RecommentRepository;
import com.demo.back.domain.user.User;
import com.demo.back.domain.user.UserRepository;
import com.demo.back.dto.comment.recomment.request.RecommentCreateRequest;
import com.demo.back.dto.comment.recomment.request.RecommentUpdateRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RecommentService {

    private static final String COMMENT_NOT_FOUND = "Comment Not Found";
    private static final String RECOMMENT_NOT_FOUND = "Recomment Not Found";
    private static final String USER_NOT_AUTHORIZED = "User Not Authorized";
    private static final String USER_NOT_FOUND = "User Not Found";

    private final CommentRepository commentRepository;
    private final RecommentRepository recommentRepository;
    private final UserRepository userRepository;

    public long addRecomment(long commentId, long userId, RecommentCreateRequest recommentCreateRequest) {
        return recommentRepository.save(recommentCreateRequest.toEntity(findCommentById(commentId), findUserById(userId))).getId();
    }

    public long modifyRecomment(long recommentId, long userId, RecommentUpdateRequest recommentUpdateRequest) throws Exception {
        Recomment recomment = findRecommentById(recommentId);
        User user = findUserById(userId);
        if (!recomment.isAuthorized(user)) {
            throw new Exception(USER_NOT_AUTHORIZED);
        }
        recomment.update(recommentUpdateRequest.getContent());
        return recommentRepository.save(recomment).getId();
    }

    public boolean removeRecomment(long recommentId, long userId) throws Exception {
        Recomment recomment = findRecommentById(recommentId);
        User user = findUserById(userId);
        if (!recomment.isAuthorized(user)) {
            throw new Exception(USER_NOT_AUTHORIZED);
        }
        recommentRepository.delete(recomment);
        return !recommentRepository.findById(recommentId).isPresent();
    }

    private Comment findCommentById(long commentId) {
        return commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException(COMMENT_NOT_FOUND));
    }

    private Recomment findRecommentById(long recommentId) {
        return recommentRepository.findById(recommentId)
                .orElseThrow(() -> new IllegalArgumentException(RECOMMENT_NOT_FOUND));
    }

    private User findUserById(long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException(USER_NOT_FOUND));
    }
}
