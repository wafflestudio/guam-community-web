import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { useAppSelector } from "../../store/hooks";
import { IPost, IPostData } from "../../types/types";

export const PostsList = () => {
  const token = useAppSelector((state) => state.auth.token);

  const isError = (error: unknown): error is Error => {
    return error instanceof Error;
  };

  const { data, status, error } = useQuery(
    "posts",
    async () => {
      const response: IPostData = await axios.get("/posts");
      console.log(response);
      return response;
    },
    { enabled: !!token, retry: false }
  );

  if (status === "loading") {
    return <span>Loading</span>;
  }

  if (status === "error") {
    if (isError(error)) {
      return <span>Error: {error.message}</span>;
    }
  }

  const list = data?.content.map((post: IPost) => (
    <li key={post.id}>{post.title}</li>
  ));

  return <div>{list}</div>;
};
