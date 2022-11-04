package com.inssa.backend.post.domain;

import com.inssa.backend.common.domain.BaseEntity;
import com.inssa.backend.common.domain.Image;
import com.inssa.backend.member.domain.Member;
import com.inssa.backend.member.domain.PostLike;
import com.inssa.backend.util.ImageUtil;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;

@Getter
@SuperBuilder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AttributeOverride(name = "id", column = @Column(name = "post_id"))
@Entity
public class Post extends BaseEntity {

    @NotNull
    private String title;

    @NotNull
    private String content;

    private int likeCount;
    private int commentCount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Builder.Default
    @OneToMany(mappedBy = "post", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE}, orphanRemoval = true)
    private List<Image> images = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "post", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<PostLike> postLikes = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "post", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<Comment> comments = new ArrayList<>();

    public void addLike(PostLike postLike) {
        postLikes.add(postLike);
        likeCount++;
    }

    public void activatePostLike() {
        likeCount++;
    }

    public void addComment(Comment comment) {
        comments.add(comment);
        commentCount++;
    }

    public void addReComment() {
        commentCount++;
    }

    public void deleteComment() {
        commentCount--;
    }

    public void saveImages(List<MultipartFile> files) {
        images.clear();
        if (hasNotUpdateFiles(files)) {
            return;
        }
        IntStream.range(1, files.size() + 1)
                .mapToObj(order -> Image.builder()
                        .url(ImageUtil.saveImage(files.get(order - 1)))
                        .order(order)
                        .post(this).build())
                .forEach(image -> images.add(image));
    }

    public void update(String title, String content, List<MultipartFile> files) {
        this.title = title;
        this.content = content;
        saveImages(files);
    }

    private static boolean hasNotUpdateFiles(List<MultipartFile> files) {
        return files.size() == 1 && files.get(0).getContentType() == null;
    }

    public boolean isEditableBy(Long memberId) {
        return member.is(memberId);
    }
}
