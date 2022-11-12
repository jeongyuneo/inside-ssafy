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

INSERT INTO menu(created_date, last_modified_date, is_active, item, menu_date, day_of_the_week)
VALUES (now(), now(), 1, '치즈함박스테이크 , 쌀밥/크림스프, 푸실리샐러드, 오이피클&할라피뇨 , 그린샐러드, 포기김치, 숭늉', '2022-10-31', '월요일');
INSERT INTO menu(created_date, last_modified_date, is_active, item, menu_date, day_of_the_week)
VALUES (now(), now(), 1, '유산슬덮밥 , 계란팟국, 깐풍기, 쑥갓사과무침, 포기김치 , 샐러드바/숭늉', '2022-11-01', '화요일');
INSERT INTO menu(created_date, last_modified_date, is_active, item, menu_date, day_of_the_week)
VALUES (now(), now(), 1, '잔치국수, 추가밥, 너비아니조림, 진미채채소무침, 물방개묵무침, 포기김치', '2022-11-02', '수요일');
INSERT INTO menu(created_date, last_modified_date, is_active, item, menu_date, day_of_the_week)
VALUES (now(), now(), 1, '돼지불고기, 혼합잡곡밥, 시금치된장국, 미역줄기팽이볶음 ,무짠지무침, 포기김치', '2022-11-03', '목요일');
INSERT INTO menu(created_date, last_modified_date, is_active, item, menu_date, day_of_the_week)
VALUES (now(), now(), 1, '사골떡국, 추가밥, 생선가스, 타르타르소스, 두부조림, 상추겉절이, 깍두기', '2022-11-04', '금요일');