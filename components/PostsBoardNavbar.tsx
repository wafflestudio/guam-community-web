import Link from "next/link";

export const boardList = [
  { id: 0, name: "피드", route: "" },
  { id: 1, name: "익명", route: "anonymous" },
  { id: 2, name: "자유", route: "free" },
  { id: 3, name: "구인", route: "career" },
  { id: 4, name: "정보", route: "information" },
  { id: 5, name: "홍보", route: "ad" },
];

export const PostsBoardNavbar = () => {
  const buttonList = boardList.map((board) => {
    return (
      <li key={board.id}>
        <Link href={`/posts${board.id === 0 ? "" : `/${board.route}`}`}>
          <a>{board.name}</a>
        </Link>
      </li>
    );
  });

  return (
    <nav>
      <ul>
        <li>
          <Link href={"/"}>
            <a>홈</a>
          </Link>
        </li>
        {buttonList}
      </ul>
    </nav>
  );
};
