export interface IUser {
  id: number | null;
  introduction: null | string;
  githubId: null | string;
  blogUrl: null | string;
  nickname: string | null;
  email: null | string;
  profileImage: null | string;
  interests: IInterest[];
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
  isMine: boolean;
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
  mentionIds: number[];
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  isMine: boolean;
  isLiked: boolean;
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

interface ILetter {
  id: number;
  sentBy: number;
  sentTo: number;
  text: string;
  createdAt: string;
  imagePath: string;
  isRead: string;
}

export interface ILetterBox {
  pair: IUser;
  lastLetter: ILetter;
}

export interface ILetters {
  userId: number;
  letterBoxes: ILetterBox[];
}

export interface IPairLetters {
  userId: 10;
  pairId: 8;
  letters: ILetter[];
}

export interface IInterest {
  name: string;
}

export interface IPushList {
  id: number;
  userId: number;
  writer: {
    id: number;
    email: null | string;
    nickname: string;
    introduction: string;
    githubId: string | null;
    blogUrl: string | null;
    profileImage: null | string;
    interests: string[];
    profileSet: boolean;
  };
  kind:
    | "POST_COMMENT"
    | "MENTION"
    | "POST_LIKE"
    | "POST_SCRAP"
    | "COMMENT_LIKE";
  body: string;
  linkUrl: string;
  isRead: boolean;
  createdAt: string;
}

export interface IPushData {
  userId: number;
  content: IPushList[];
  hasNext: boolean;
}
