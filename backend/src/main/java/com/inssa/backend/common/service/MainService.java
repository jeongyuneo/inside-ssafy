package com.inssa.backend.common.service;

import com.inssa.backend.common.controller.dto.MainResponse;
import com.inssa.backend.menu.domain.MenuRepository;
import com.inssa.backend.post.controller.dto.PostsResponse;
import com.inssa.backend.post.domain.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class MainService {

    private static final String DELIMITER = ", ";
    private static final int HOT_POST_STANDARD = 10;

    private final MenuRepository menuRepository;
    private final PostRepository postRepository;

    public MainResponse getMain() {
        return MainResponse.builder()
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
}
