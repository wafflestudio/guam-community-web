export const LOADING = "loading";
export const ERROR = "error";

export const FREE = "free";
export const ANONYMOUS = "anonymous";
export const CAREER = "career";
export const INFORMATION = "information";
export const AD = "ad";

export const MB = 1e6;

export const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

export const boardList = [
  { id: 0, name: "전체 게시판", route: "" },
  { id: 1, name: "익명 게시판", route: ANONYMOUS },
  { id: 2, name: "자유 게시판", route: FREE },
  { id: 3, name: "구인 게시판", route: CAREER },
  { id: 4, name: "정보공유 게시판", route: INFORMATION },
  { id: 5, name: "홍보 게시판", route: AD },
];

export const categoryList = [
  { id: 1, name: "개발", tag: "develop" },
  { id: 2, name: "데이터분석", tag: "dataAnalysis" },
  { id: 3, name: "디자인", tag: "design" },
  { id: 4, name: "기획/마케팅", tag: "marketing" },
  { id: 5, name: "기타", tag: "extra" },
];

export const POST_COMMENT = "POST_COMMENT";
export const MENTION = "MENTION";
export const POST_LIKE = "POST_LIKE";
export const POST_SCRAP = "POST_SCRAP";
export const POST_COMMENT_LIKE = "POST_COMMENT_LIKE";
export const POST_COMMENT_MENTION = "POST_COMMENT_MENTION";
export const notificationList = [
  {
    id: 0,
    key: POST_COMMENT,
    phrase: "댓글을 남겼습니다.",
  },
  { id: 1, key: MENTION, phrase: "댓글에서 언급했습니다." },
  { id: 2, key: POST_LIKE, phrase: "게시글을 좋아합니다." },
  { id: 3, key: POST_SCRAP, phrase: "게시글을 스크랩했습니다." },
  { id: 4, key: POST_COMMENT_LIKE, phrase: "댓글을 좋아합니다." },
  {
    id: 5,
    key: POST_COMMENT_MENTION,
    phrase: "댓글에서 사용자를 멘션했습니다.",
  },
];
