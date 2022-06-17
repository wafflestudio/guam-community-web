export interface IUser {
  id: number;
  introduction: null | string;
  githubId: null | string;
  blogUrl: null | string;
  nickname: string | null;
  email: null | string;
  profileImage: null | string;
  interests: { name: string }[];
  profileSet: boolean;
}

export interface IPostsListPost {
  id: number;
  boardId: 0 | 1 | 2 | 3 | 4 | 5;
  user: IUser;
  title: string;
  content: string;
  imagePaths: string[];
  category: {
    postId: number;
    categoryId: number;
    title: string;
  };
  likeCount: number;
  commentCount: number;
  scrapCount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  isLiked: boolean;
  isScrapped: boolean;
  boardType: string;
}

export interface IPostsData {
  content: IPostsListPost[];
  hasNext: boolean;
}

export interface IMatchParams {
  match: {
    params: {
      permalink: string;
    };
  };
}

export interface IComment {
  id: number;
  postId: number;
  user: IUser;
  content: string;
  imagePaths: string[];
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  isMine: boolean;
}

export interface ICommentData {
  postId: number;
  content: IComment[];
}

export interface IDetailedPost extends IPostsListPost {
  comments: IComment[];
}

export interface IImageUrl {
  id: number;
  url: string;
}
