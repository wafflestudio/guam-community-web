import React from "react";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  const boardList = [
    { link: "all", name: "피드" },
    { link: "free", name: "자유" },
    { link: "anonymous", name: "익명" },
    { link: "information", name: "정보" },
    { link: "recruits", name: "구인" },
    { link: "promo", name: "홍보" },
  ];

  const clickLink = (board: string) => {
    navigate(`/posts/${board}`);
  };

  const buttonList = boardList.map((board) => {
    return (
      <li>
        <button type="button" onClick={() => clickLink(board.link)}>
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
