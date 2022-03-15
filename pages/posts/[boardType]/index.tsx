import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { api } from "../../../api/api";
import PageTitle from "../../../components/PageTitle";
import { PostsBoardNavbar } from "../../../components/PostsBoardNavbar";
import { useAppSelector } from "../../../store/hooks";
import { IPostsData } from "../../../types/types";
import { boardList, ERROR, LOADING } from "../../../constants/constants";
import { PostsList } from "../../../components/PostsList";

export default function PostsBoard() {
  const router = useRouter();
  const { boardType } = router.query;

  const boardId = boardList.find((board) => board.route === boardType)?.id;

  const token = useAppSelector((state) => state.auth.token);

  const fetchPostsByBoard = (): Promise<IPostsData> =>
    api.get(`/posts?boardId=${boardId}`);

  const { data, status, error } = useQuery(
    ["posts", boardType],
    fetchPostsByBoard,
    {
      retry: false,
      enabled: !!token && !!boardId,
    }
  );

  return (
    <>
      <PageTitle title="Posts" />
      <PostsBoardNavbar />
      <div>{boardType}</div>
      {status === LOADING ? (
        <span>Loading</span>
      ) : status === ERROR && error instanceof Error ? (
        <span>Error: {error.message}</span>
      ) : null}
      <PostsList posts={data?.data.content || []} />
    </>
  );
}
