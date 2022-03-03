import Link from "next/link";

export const boardList = [
  { id: 0, name: "피드", route: "all" },
  { id: 1, name: "익명", route: "anonymous" },
  { id: 2, name: "자유", route: "free" },
  { id: 3, name: "구인", route: "career" },
  { id: 4, name: "정보", route: "information" },
  { id: 5, name: "홍보", route: "ad" },
];

export const Navbar = () => {
  const buttonList = boardList.map((board) => {
    return (
      <li key={board.id}>
        <Link href={`/${board.route}`}>
          <a>{board.name}</a>
        </Link>
      </li>
    );
  });

  return (
    <nav>
      <ul>{buttonList}</ul>
    </nav>
  );
};
