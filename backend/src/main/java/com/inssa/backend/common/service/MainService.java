package com.inssa.backend.common.service;

import com.inssa.backend.common.controller.dto.MainResponse;
import com.inssa.backend.common.controller.dto.MenuResponse;
import com.inssa.backend.common.domain.ErrorMessage;
import com.inssa.backend.common.exception.BadRequestException;
import com.inssa.backend.common.exception.NotFoundException;
import com.inssa.backend.member.domain.BusLike;
import com.inssa.backend.member.domain.Member;
import com.inssa.backend.member.domain.MemberRepository;
import com.inssa.backend.menu.domain.Menu;
import com.inssa.backend.menu.domain.MenuRepository;
import com.inssa.backend.post.controller.dto.PostsResponse;
import com.inssa.backend.post.domain.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
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
        Menu menu = findMenuOfToday();
        return MainResponse.builder()
                .busLikes(findMember(memberId).getBusLikes()
                        .stream()
                        .filter(BusLike::isActive)
                        .sorted(Comparator.comparing(current -> current.getBus().getNumber()))
                        .map(busLikes -> busLikes.getBus().getNumber())
                        .collect(Collectors.toList()))
                .menu(MenuResponse.builder()
                        .items(Arrays.stream(menu.getItem().split(DELIMITER)).collect(Collectors.toList()))
                        .subItems(Arrays.stream(menu.getSubItem().split(DELIMITER)).collect(Collectors.toList()))
                        .build())
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

    private Menu findMenuOfToday() {
        LocalDate today = LocalDate.now();
        if (today.getDayOfWeek().equals(DayOfWeek.SATURDAY) || today.getDayOfWeek().equals(DayOfWeek.SUNDAY)) {
            throw new BadRequestException(ErrorMessage.NOT_WEEKDAY);
        }
        return menuRepository.findByDateEqualsAndIsActiveTrue(today)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.NOT_FOUND_MENU));
    }
}
