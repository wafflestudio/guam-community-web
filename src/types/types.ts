export interface IPostsListPost {
  id: number;
  boardId: 0 | 1 | 2 | 3 | 4 | 5;
  user: {
    id: number;
    introduction: null | string;
    githubId: null | string;
    blogUrl: null | string;
    nickname: string;
    email: null | string;
    profileImage: null | string;
    interests: [];
    profileSet: boolean;
  };
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

export interface IPostData {
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
  user: {
    id: number;
    introduction: string;
    githubId: string;
    blogUrl: string;
    nickname: string;
    email: string;
    profileImage: string;
    interests: [
      {
        name: string;
      }
    ];
    profileSet: boolean;
  };
  content: string;
  imagePaths: [string];
  likeCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ICommentData {
  postId: number;
  content: [IComment];
}

export interface IDetailedPost extends IPostsListPost {
  comments: [IComment];
}
