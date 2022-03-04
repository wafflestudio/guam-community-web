import Link from "next/link";
import { boardList } from "../constants/constants";

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
