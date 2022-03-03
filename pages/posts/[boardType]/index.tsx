import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { api } from "../../../api/api";
import PageTitle from "../../../components/PageTitle";
import {
  boardList,
  PostsBoardNavbar,
} from "../../../components/PostsBoardNavbar";
import { useAppSelector } from "../../../store/hooks";
import { IPostsData } from "../../../types/types";
import { PostsList } from "../PostsList";

export default function PostsBoard() {
  const router = useRouter();
  const { boardType } = router.query;

  const boardId = boardList.find((board) => board.route === boardType)?.id;

  const token = useAppSelector((state) => state.auth.token);

  const { data, status, error } = useQuery(
    ["posts", boardType],
    async () => {
      const response: IPostsData = await api.get(`/posts?boardId=${boardId}`);
      return response;
    },
    {
      retry: false,
      enabled: !!token && !!boardId,
    }
  );

  const isError = (error: unknown): error is Error => {
    return error instanceof Error;
  };

  return (
    <>
      <PageTitle title="Posts" />
      <PostsBoardNavbar />
      {status === "loading" ? (
        <span>Loading</span>
      ) : status === "error" && isError(error) ? (
        <span>Error: {error.message}</span>
      ) : null}
      <PostsList posts={data?.content || []} />
    </>
  );
}
