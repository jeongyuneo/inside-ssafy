insert into member(created_date, last_modified_date, is_active, email, password, name, student_number, role) values (now(), now(), 1, 'jj_jjong@naver.com', '1qaz2wsx!', '장종환', '0736364', 'GENERAL');
insert into member(created_date, last_modified_date, is_active, email, password, name, student_number, role) values (now(), now(), 0, 'jgh1320@korea.ac.kr', '1qaz2wsx!', '장종환', '0736365', 'GENERAL');

insert into post(created_date, last_modified_date, is_active, title, content, like_count, comment_count, member_id) values (now(), now(), 1, '이건 제목', '이건 내용', 0, 0, 1);
insert into post(created_date, last_modified_date, is_active, title, content, like_count, comment_count, member_id) values (now(), now(), 0, '이건 제목2', '이건 내용2', 0, 0, 1);
INSERT INTO post(created_date, last_modified_date, is_active, title, content, comment_count, like_count) VALUES (now(), now(), 1, '제목', '본문', 1, 2);
INSERT INTO post(created_date, last_modified_date, is_active, title, content, comment_count, like_count) VALUES (now(), now(), 1, '문제23', '본문265456', 2, 3);
INSERT INTO post(created_date, last_modified_date, is_active, title, content, comment_count, like_count) VALUES (now(), now(), 0, '아리랑', '본문1111', 2, 3);
INSERT INTO post(created_date, last_modified_date, is_active, title, content, comment_count, like_count) VALUES (now(), now(), 0, '오늘 점심 존맛', '본문0986', 2, 3);
INSERT INTO post(created_date, last_modified_date, is_active, title, content, comment_count, like_count) VALUES (now(), now(), 0, '제목은 왜 제목', '본문0986', 2, 3);
