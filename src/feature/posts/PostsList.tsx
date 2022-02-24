import React from "react";

interface IPost {
  id: number;
  title: string;
}

export const PostsList = () => {
  const posts: IPost[] = [
    {
      id: 1,
      title: "코딩 뭐부터 시작해야 하나요?",
    },
    {
      id: 2,
      title: "네이버 코테 보신 분?",
    },
    {
      id: 3,
      title: "맥북 사양 추천",
    },
    {
      id: 4,
      title: "설계할 때 무슨 툴 쓰시나요?",
    },
    {
      id: 5,
      title: "망고보드 괜찮나요?",
    },
  ];

  const list = posts.map((post: IPost) => <li key={post.id}>{post.title}</li>);

  return <div>{list}</div>;
};
