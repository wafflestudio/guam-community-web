import { GetServerSideProps } from "next";

import { useRouter } from "next/router";
import { dehydrate, QueryClient, useQuery } from "react-query";

import { api } from "../../../api/api";
import PageTitle from "../../../components/PageTitle";
import PostsPage from "../../../components/PostsPage/PostsPage";
import SignInForm from "../../../components/SignInForm";
import { boardList, ERROR, LOADING } from "../../../constants/constants";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setPosts } from "../../../store/postsListSlice";
import { IPostsData } from "../../../types/types";

// const fetchPosts = (boardId: number): Promise<IPostsData> =>
//   api.get(`/posts`, {
//     params: {
//       boardId,
//     },
//   });

// export async function getStaticPaths() {
//   const paths = boardList.map((board) => ({
//     params: { boardType: board.route },
//   }));
//   return {
//     paths,
//     fallback: false,
//   };
// }

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const queryClient = new QueryClient();

//   const boardId = boardList.find(
//     (board) => board.route === params?.boardType
//   )?.id;

//   const posts = await fetchPosts(boardId || 0);

//   return {
//     props: {
//       posts,
//     },
//   };
// };

export default function PostsBoard() {
  const token = useAppSelector((state) => state.auth.token);

  const dispatch = useAppDispatch();

  const router = useRouter();
  const { boardType } = router.query;

  const boardId = boardList.find((board) => board.route === boardType)?.id;

  const { data, status, error } = useQuery(
    ["posts", boardType],
    async () =>
      await api.get(`/posts`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          boardId,
        },
      }),
    {
      retry: false,
      enabled: !!token,
    }
  );

  dispatch(setPosts(data?.data.content));

  return (
    <>
      <PageTitle
        title={`${typeof boardType === "string" && boardType.toUpperCase()}`}
      />
      <SignInForm />
      {status === LOADING ? (
        <span>Loading</span>
      ) : status === ERROR && error instanceof Error ? (
        <span>Error: {error.message}</span>
      ) : null}
      <PostsPage />
    </>
  );
}
