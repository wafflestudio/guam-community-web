import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { IDetailedPost } from "../../types/types";
import { CommentsList } from "./comments/CommentsList";

export const PostDetailPage = () => {
  const token = useAppSelector((state) => state.auth.token);

  const { postId } = useParams();
  const { data, status, error } = useQuery(
    ["comments", postId],
    async () => {
      const response: IDetailedPost = await axios.get(`/posts/${postId}`);
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
    <>
      <div>{data?.user.nickname}</div>
      <div>{data?.content}</div>
      <CommentsList comments={data?.comments} />
    </>
  );
};
