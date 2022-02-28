export interface IPost {
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
  content: IPost[];
  hasNext: boolean;
}

export interface IMatchParams {
  match: {
    params: {
      permalink: string;
    };
  };
}
