package com.inssa.backend.common.service;

import com.inssa.backend.common.controller.dto.MainResponse;
import com.inssa.backend.common.domain.BaseEntity;
import com.inssa.backend.common.domain.ErrorMessage;
import com.inssa.backend.common.exception.NotFoundException;
import com.inssa.backend.member.domain.Member;
import com.inssa.backend.member.domain.MemberRepository;
import com.inssa.backend.menu.domain.MenuRepository;
import com.inssa.backend.post.controller.dto.PostsResponse;
import com.inssa.backend.post.domain.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Comparator;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class MainService {

    private static final String DELIMITER = ", ";
    private static final int HOT_POST_STANDARD = 10;

    private final MemberRepository memberRepository;
    private final MenuRepository menuRepository;
    private final PostRepository postRepository;

    public MainResponse getMain(Long memberId) {
        return MainResponse.builder()
                .busLikes(findMember(memberId).getBusLikes()
                        .stream()
                        .filter(BaseEntity::isActive)
                        .sorted(Comparator.comparing(current -> current.getBus().getNumber()))
                        .map(busLikes -> busLikes.getBus().getNumber())
                        .collect(Collectors.toList())
                )
                .menus(Arrays.stream(menuRepository.findByDateEqualsAndIsActiveTrue(LocalDate.now())
                        .getItem()
                        .split(DELIMITER))
                        .collect(Collectors.toList()))
                .hotPosts(postRepository.findTop5ByIsActiveTrueAndLikeCountGreaterThanEqualOrderByCreatedDateDesc(HOT_POST_STANDARD)
                        .stream()
                        .map(post -> PostsResponse.builder()
                                .postId(post.getId())
                                .title(post.getTitle())
                                .likeCount(post.getLikeCount())
                                .commentCount(post.getCommentCount())
                                .createdDate(post.getCreatedDate())
                                .build())
                        .collect(Collectors.toList()))
                .build();
    }

    private Member findMember(Long memberId) {
        return memberRepository.findByIdAndIsActiveTrue(memberId)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.NOT_FOUND_MEMBER));
    }
}
