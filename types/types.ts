export interface IUser {
  id: number;
  introduction: null | string;
  githubId: null | string;
  blogUrl: null | string;
  nickname: string;
  email: null | string;
  profileImage: null | string;
  interests: [];
  profileSet: boolean;
}

export interface IPostsListPost {
  id: number;
  boardId: 0 | 1 | 2 | 3 | 4 | 5;
  user: IUser;
  title: string;
  content: string;
  imagePaths: [string];
  categories: [
    {
      postId: number;
      tagId: number;
      title: string;
    }
  ];
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
  data: {
    content: IPostsListPost[];
    hasNext: boolean;
  };
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
}

export interface ICommentData {
  data: {
    postId: number;
    content: IComment[];
  };
}

export interface IDetailedPost {
  data: {
    id: number;
    boardId: 0 | 1 | 2 | 3 | 4 | 5;
    user: IUser;
    title: string;
    content: string;
    imagePaths: string[];
    categories: [
      {
        postId: number;
        tagId: number;
        title: string;
      }
    ];
    likeCount: number;
    commentCount: number;
    scrapCount: number;
    status: string;
    createdAt: string;
    updatedAt: string;
    isLiked: boolean;
    isScrapped: boolean;
    boardType: string;
    comments: IComment[];
  };
}
