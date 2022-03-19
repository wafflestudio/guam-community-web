export const LOADING = "loading";
export const ERROR = "error";

export const FREE = "free";
export const ANONYMOUS = "anonymous";
export const CAREER = "career";
export const INFORMATION = "information";
export const AD = "ad";

export const boardList = [
  { id: 0, name: "전체 게시판", route: "" },
  { id: 1, name: "자유 게시판", route: FREE },
  { id: 2, name: "익명 게시판", route: ANONYMOUS },
  { id: 3, name: "구인 게시판", route: CAREER },
  { id: 4, name: "정보공유 게시판", route: INFORMATION },
  { id: 5, name: "홍보 게시판", route: AD },
];

export const categoryList = [
  { id: 1, name: "개발" },
  { id: 2, name: "데이터분석" },
  { id: 3, name: "디자인" },
  { id: 4, name: "기획/마케팅" },
  { id: 5, name: "기타" },
];
