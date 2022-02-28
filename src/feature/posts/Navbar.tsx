import React from "react";
import { useNavigate } from "react-router-dom";

export const boardList = [
  { id: 0, name: "피드", route: "all" },
  { id: 1, name: "익명", route: "anonymous" },
  { id: 2, name: "자유", route: "free" },
  { id: 3, name: "구인", route: "career" },
  { id: 4, name: "정보", route: "information" },
  { id: 5, name: "홍보", route: "ad" },
];

export const Navbar = () => {
  const navigate = useNavigate();

  const clickLink = (boardId: number) => {
    navigate(`/posts/${boardList[boardId].route}`);
  };

  const buttonList = boardList.map((board) => {
    return (
      <li key={board.id}>
        <button type="button" onClick={() => clickLink(board.id)}>
          {board.name}
        </button>
      </li>
    );
  });

  return (
    <nav>
      <ul>{buttonList}</ul>
    </nav>
  );
};
