import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { IPostsListPost, IPostData } from "../../types/types";
import { boardList } from "../../common/Navbar";

export const PostsList = () => {
  const token = useAppSelector((state) => state.auth.token);

  const { boardType } = useParams();
  const boardId = boardList.find((board) => board.route === boardType)?.id;

  const { data, status, error } = useQuery(
    ["posts", boardType],
    async () => {
      const response: IPostData = await axios.get(
        `/posts${boardId === 0 ? "" : `?boardId=${boardId}`}`
      );
      console.log(response);
      return response;
    },
    { enabled: !!token, retry: false }
  );

  const isError = (error: unknown): error is Error => {
    return error instanceof Error;
  };

  if (status === "loading") {
    return <span>Loading</span>;
  }

  if (status === "error") {
    if (isError(error)) {
      return <span>Error: {error.message}</span>;
    }
  }

  return (
    <div>
      {data?.content.map((post: IPostsListPost) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </div>
  );
};
