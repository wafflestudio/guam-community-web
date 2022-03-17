import PageTitle from "../../../components/PageTitle";
import SignInForm from "../../../components/SignInForm";
import PostsPage from "../../../components/PostsPage/PostsPage";
import { useRouter } from "next/router";
import { boardList, ERROR, LOADING } from "../../../constants/constants";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { api } from "../../../api/api";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setPosts } from "../../../store/postsListSlice";
import { GetStaticProps } from "next";

export async function getStaticPaths() {
  const paths = boardList.map((board) => ({
    params: { boardType: board.route },
  }));
  return {
    paths,
    fallback: true,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queryClient = new QueryClient();

  const boardId = boardList.find(
    (board) => board.route === params?.boardType
  )?.id;

  await queryClient.prefetchQuery(
    ["posts", boardId],
    async () =>
      await api.get(`/posts`, {
        params: {
          boardId,
        },
      }),
    { retry: false }
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

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
        title={`${
          typeof boardType === "string" && boardType.toUpperCase()
        } | Guam`}
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
