import { PostTypes } from '../../organisms/MyPosts/types';

export interface UserInfoTypes {
  name: string;
  studentNumber: string;
  postsResponses: Array<PostTypes>;
}
