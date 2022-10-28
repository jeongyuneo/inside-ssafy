package com.inssa.backend.post.controller;

import com.inssa.backend.ApiDocument;
import com.inssa.backend.common.domain.ErrorMessage;
import com.inssa.backend.common.domain.Message;
import com.inssa.backend.common.exception.NotFoundException;
import com.inssa.backend.post.controller.dto.*;
import com.inssa.backend.post.service.PostService;
import jdk.nashorn.internal.runtime.regexp.joni.exception.InternalException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.ResultActions;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.*;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(PostController.class)
public class PostControllerTest extends ApiDocument {

    private static final String TITLE = "제목";
    private static final int LIKE_COUNT = 5;
    private static final int COMMENT_COUNT = 3;
    private static final String CREATED_DATE = "10/25 10:19";
    private static final String CONTENT = "본문";
    private static final String URL = "{file_url}";
    private static final Long ID = 1L;
    private static final String KEYWORD = "검색 키워드";
    private static final String POST_REQUEST_PARAMETER_NAME = "postRequest";
    private static final String POST_REQUEST_FILENAME = "";
    private static final String POST_REQUEST_CONTENT_TYPE = "application/json";
    private static final String IMAGE_PARAMETER_NAME = "files";
    private static final String IMAGE = "image.png";
    private static final String IMAGE_CONTENT_TYPE = "image/png";
    private static final byte[] IMAGE_CONTENT = "<image data>".getBytes();

    @MockBean
    private PostService postService;

    private List<PostsResponse> postsResponses;
    private PostResponse postResponse;
    private PostRequest postRequest;
    private MockMultipartFile file;
    private MockMultipartFile postRequestPart;

    @BeforeEach
    void setUp() {
        PostsResponse postsResponse = PostsResponse.builder()
                .postId(ID)
                .title(TITLE)
                .likeCount(LIKE_COUNT)
                .commentCount(COMMENT_COUNT)
                .createdDate(CREATED_DATE)
                .build();
        List<FileResponse> fileResponses = IntStream.range(0, 2)
                .mapToObj(n -> FileResponse.builder()
                        .url(URL)
                        .build())
                .collect(Collectors.toList());
        List<ReCommentResponse> reCommentResponses = IntStream.range(0, 2)
                .mapToObj(m -> ReCommentResponse.builder()
                        .content(CONTENT)
                        .createdDate(CREATED_DATE)
                        .build())
                .collect(Collectors.toList());
        List<CommentResponse> commentResponses = IntStream.range(0, 2)
                .mapToObj(n -> CommentResponse.builder()
                        .content(CONTENT)
                        .createdDate(CREATED_DATE)
                        .reCommentResponses(reCommentResponses)
                        .build())
                .collect(Collectors.toList());
        postsResponses = IntStream.range(0, 2)
                .mapToObj(n -> postsResponse)
                .collect(Collectors.toList());
        postResponse = PostResponse.builder()
                .title(TITLE)
                .likeCount(LIKE_COUNT)
                .commentCount(COMMENT_COUNT)
                .content(CONTENT)
                .files(fileResponses)
                .commentResponses(commentResponses)
                .build();
        postRequest = PostRequest.builder()
                .title(TITLE)
                .content(CONTENT)
                .build();
        postRequestPart = new MockMultipartFile(POST_REQUEST_PARAMETER_NAME, POST_REQUEST_FILENAME, POST_REQUEST_CONTENT_TYPE, toJson(postRequest).getBytes());
        file = new MockMultipartFile(IMAGE_PARAMETER_NAME, IMAGE, IMAGE_CONTENT_TYPE, IMAGE_CONTENT);
    }

    @DisplayName("익명 게시판 목록 조회 성공")
    @Test
    void get_posts_success() throws Exception {
        // given
        willReturn(postsResponses).given(postService).getPosts();
        // when
        ResultActions resultActions = 익명_게시판_목록_조회_요청();
        // then
        익명_게시판_목록_조회_성공(resultActions);
    }

    @DisplayName("익명 게시판 목록 조회 실패")
    @Test
    void get_posts_fail() throws Exception {
        // given
        willThrow(new InternalException(ErrorMessage.FAIL_TO_GET_POSTS.getMessage())).given(postService).getPosts();
        // when
        ResultActions resultActions = 익명_게시판_목록_조회_요청();
        // then
        익명_게시판_목록_조회_실패(resultActions, new Message(ErrorMessage.FAIL_TO_GET_POSTS));
    }

    @DisplayName("익명 게시판 제목 또는 내용 검색 성공")
    @Test
    void search_post_success() throws Exception {
        // given
        willReturn(postsResponses).given(postService).searchPost(anyString());
        // when
        ResultActions resultActions = 익명_게시판_검색_요청(KEYWORD);
        // then
        익명_게시판_검색_성공(resultActions);
    }

    @DisplayName("익명 게시판 제목 또는 내용 검색 실패")
    @Test
    void search_post_fail() throws Exception {
        // given
        willThrow(new InternalException(ErrorMessage.FAIL_TO_SEARCH_POST.getMessage())).given(postService).searchPost(anyString());
        // when
        ResultActions resultActions = 익명_게시판_검색_요청(KEYWORD);
        // then
        익명_게시판_검색_실패(resultActions, new Message(ErrorMessage.FAIL_TO_SEARCH_POST));
    }

    @DisplayName("익명 게시판 상세 조회 성공")
    @Test
    void get_post_success() throws Exception {
        // given
        willReturn(postResponse).given(postService).getPost(anyLong());
        // when
        ResultActions resultActions = 익명_게시판_상세_조회_요청(ID);
        // then
        익명_게시판_상세_조회_성공(resultActions);
    }

    @DisplayName("익명 게시판 상세 조회 실패")
    @Test
    void get_post_fail() throws Exception {
        // given
        willThrow(new NotFoundException(ErrorMessage.NOT_FOUND_POST)).given(postService).getPost(anyLong());
        // when
        ResultActions resultActions = 익명_게시판_상세_조회_요청(ID);
        // then
        익명_게시판_상세_조회_실패(resultActions, new Message(ErrorMessage.NOT_FOUND_POST));
    }

    @DisplayName("익명 게시판 등록 성공")
    @Test
    void create_post_success() throws Exception {
        // given
        willDoNothing().given(postService).createPost(any(PostRequest.class), anyList());
        // when
        ResultActions resultActions = 익명_게시판_등록_요청(postRequest);
        // then
        익명_게시판_등록_성공(resultActions);
    }

    @DisplayName("익명 게시판 등록 실패")
    @Test
    void create_post_fail() throws Exception {
        // given
        willThrow(new InternalException(ErrorMessage.FAIL_TO_CREATE_POST.getMessage())).given(postService).createPost(any(PostRequest.class), anyList());
        // when
        ResultActions resultActions = 익명_게시판_등록_요청(postRequest);
        // then
        익명_게시판_등록_실패(resultActions, new Message(ErrorMessage.FAIL_TO_CREATE_POST));
    }

    @DisplayName("익명 게시판 수정 성공")
    @Test
    void update_post_success() throws Exception {
        // given
        willDoNothing().given(postService).updatePost(anyLong(), any(PostRequest.class), anyList());
        // when
        ResultActions resultActions = 익명_게시판_수정_요청(ID);
        // then
        익명_게시판_수정_성공(resultActions);
    }

    @DisplayName("익명 게시판 수정 실패")
    @Test
    void update_post_fail() throws Exception {
        // given
        willThrow(new NotFoundException(ErrorMessage.NOT_FOUND_POST)).given(postService).updatePost(anyLong(), any(PostRequest.class), anyList());
        // when
        ResultActions resultActions = 익명_게시판_수정_요청(ID);
        // then
        익명_게시판_수정_실패(resultActions, new Message(ErrorMessage.NOT_FOUND_POST));
    }

    @DisplayName("익명 게시판 삭제 성공")
    @Test
    void delete_post_success() throws Exception {
        // given
        willDoNothing().given(postService).deletePost(anyLong());
        // when
        ResultActions resultActions = 익명_게시판_삭제_요청(ID);
        // then
        익명_게시판_삭제_성공(resultActions);
    }

    @DisplayName("익명 게시판 삭제 실패")
    @Test
    void delete_post_fail() throws Exception {
        // given
        willThrow(new NotFoundException(ErrorMessage.NOT_FOUND_POST)).given(postService).deletePost(anyLong());
        // when
        ResultActions resultActions = 익명_게시판_삭제_요청(ID);
        // then
        익명_게시판_삭제_실패(resultActions, new Message(ErrorMessage.NOT_FOUND_POST));
    }

    private ResultActions 익명_게시판_목록_조회_요청() throws Exception {
        return mockMvc.perform(get("/api/v1/posts")
                .contextPath("/api/v1"));
    }

    private void 익명_게시판_목록_조회_성공(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isOk())
                .andExpect(content().json(toJson(postsResponses)))
                .andDo(print())
                .andDo(toDocument("get-posts-success"));
    }

    private void 익명_게시판_목록_조회_실패(ResultActions resultActions, Message message) throws Exception {
        resultActions.andExpect(status().isInternalServerError())
                .andExpect(content().json(toJson(message)))
                .andDo(print())
                .andDo(toDocument("get-posts-fail"));
    }

    private ResultActions 익명_게시판_검색_요청(String keyword) throws Exception {
        return mockMvc.perform(get("/api/v1/posts/search")
                .contextPath("/api/v1")
                .param("keyword", keyword));
    }

    private void 익명_게시판_검색_성공(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isOk())
                .andExpect(content().json(toJson(postsResponses)))
                .andDo(print())
                .andDo(toDocument("search-post-success"));
    }

    private void 익명_게시판_검색_실패(ResultActions resultActions, Message message) throws Exception {
        resultActions.andExpect(status().isInternalServerError())
                .andExpect(content().json(toJson(message)))
                .andDo(print())
                .andDo(toDocument("search-post-fail"));
    }

    private ResultActions 익명_게시판_상세_조회_요청(Long postId) throws Exception {
        return mockMvc.perform(get("/api/v1/posts/" + postId)
                .contextPath("/api/v1"));
    }

    private void 익명_게시판_상세_조회_성공(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isOk())
                .andExpect(content().json(toJson(postResponse)))
                .andDo(print())
                .andDo(toDocument("get-post-success"));
    }

    private void 익명_게시판_상세_조회_실패(ResultActions resultActions, Message message) throws Exception {
        resultActions.andExpect(status().isNotFound())
                .andExpect(content().json(toJson(message)))
                .andDo(print())
                .andDo(toDocument("get-post-fail"));
    }

    private ResultActions 익명_게시판_등록_요청(PostRequest postRequest) throws Exception {
        return mockMvc.perform(multipart("/api/v1/posts")
                .file(postRequestPart)
                .file(file)
                .file(file)
                .accept(MediaType.APPLICATION_JSON)
                .contextPath("/api/v1"));
    }

    private void 익명_게시판_등록_성공(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isOk())
                .andDo(print())
                .andDo(toDocument("create-post-success"));
    }

    private void 익명_게시판_등록_실패(ResultActions resultActions, Message message) throws Exception {
        resultActions.andExpect(status().isInternalServerError())
                .andExpect(content().json(toJson(message)))
                .andDo(print())
                .andDo(toDocument("create-post-fail"));
    }

    private ResultActions 익명_게시판_수정_요청(Long postId) throws Exception {
        return mockMvc.perform(multipart("/api/v1/posts/update/" + postId)
                .file(postRequestPart)
                .file(file)
                .file(file)
                .accept(MediaType.APPLICATION_JSON)
                .contextPath("/api/v1"));
    }

    private void 익명_게시판_수정_성공(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isOk())
                .andDo(print())
                .andDo(toDocument("update-post-success"));
    }

    private void 익명_게시판_수정_실패(ResultActions resultActions, Message message) throws Exception {
        resultActions.andExpect(status().isNotFound())
                .andExpect(content().json(toJson(message)))
                .andDo(print())
                .andDo(toDocument("update-post-fail"));
    }

    private ResultActions 익명_게시판_삭제_요청(Long postId) throws Exception {
        return mockMvc.perform(delete("/api/v1/posts/" + postId)
                .contextPath("/api/v1"));
    }

    private void 익명_게시판_삭제_성공(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isOk())
                .andDo(print())
                .andDo(toDocument("delete-post-success"));
    }

    private void 익명_게시판_삭제_실패(ResultActions resultActions, Message message) throws Exception {
        resultActions.andExpect(status().isNotFound())
                .andExpect(content().json(toJson(message)))
                .andDo(print())
                .andDo(toDocument("delete-post-fail"));
    }

    private ResultActions 익명_게시판_수정_요청(Long postId) throws Exception {
        return mockMvc.perform(multipart("/api/v1/posts/update/" + postId)
                .file(postRequestPart)
                .file(file)
                .file(file)
                .accept(MediaType.APPLICATION_JSON)
                .contextPath("/api/v1"));
    }

    private void 익명_게시판_수정_성공(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isOk())
                .andDo(print())
                .andDo(toDocument("update-post-success"));
    }

    private void 익명_게시판_수정_실패(ResultActions resultActions, Message message) throws Exception {
        resultActions.andExpect(status().isNotFound())
                .andExpect(content().json(toJson(message)))
                .andDo(print())
                .andDo(toDocument("update-post-fail"));
    }
}
