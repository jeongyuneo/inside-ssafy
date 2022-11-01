INSERT INTO member(created_date, last_modified_date, is_active, email, password, name, student_number, role) VALUES (now(), now(), 1, 'user1@ssafy.com', '1qaz2wsx!', '유저1', '0711111', 'GENERAL');
INSERT INTO member(created_date, last_modified_date, is_active, email, password, name, student_number, role) VALUES (now(), now(), 0, 'user2@ssafy.com', '1qaz2wsx!', '유저2', '0722222', 'GENERAL');
INSERT INTO member(created_date, last_modified_date, is_active, email, password, name, student_number, role) VALUES (now(), now(), 1, 'user3@ssafy.com', '1qaz2wsx!', '유저3', '0733333', 'MANAGER');
INSERT INTO member(created_date, last_modified_date, is_active, email, password, name, student_number, role) VALUES (now(), now(), 0, 'user4@ssafy.com', '1qaz2wsx!', '유저4', '0744444', 'MANAGER');

INSERT INTO post(created_date, last_modified_date, is_active, title, content, like_count, comment_count, member_id) VALUES (now(), now(), 1, '게시글 제목', '게시글 내용', 0, 1, 1);
INSERT INTO post(created_date, last_modified_date, is_active, title, content, like_count, comment_count, member_id) VALUES (now(), now(), 0, '게시글 제목2', '게시글 내용2', 0, 1, 1);
INSERT INTO post(created_date, last_modified_date, is_active, title, content, like_count, comment_count, member_id) VALUES (now(), now(), 1, '게시글 제목3', '게시글 내용3', 0, 0, 2);
INSERT INTO post(created_date, last_modified_date, is_active, title, content, like_count, comment_count, member_id) VALUES (now(), now(), 0, '게시글 제목4', '게시글 내용4', 0, 0, 2);

INSERT INTO comment(created_date, last_modified_date, is_active, content, member_id, post_id) VALUES (now(), now(), 1, '댓글 내용', 1, 1);
INSERT INTO comment(created_date, last_modified_date, is_active, content, member_id, post_id) VALUES (now(), now(), 0, '댓글 내용2', 1, 1);
INSERT INTO comment(created_date, last_modified_date, is_active, content, member_id, post_id) VALUES (now(), now(), 1, '댓글 내용3', 2, 1);
INSERT INTO comment(created_date, last_modified_date, is_active, content, member_id, post_id) VALUES (now(), now(), 0, '댓글 내용4', 2, 1);
