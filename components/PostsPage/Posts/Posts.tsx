import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { api } from "../../../api/api";
import { boardList, ERROR, LOADING } from "../../../constants/constants";
import { useAppSelector } from "../../../store/hooks";
import { IPostsData } from "../../../types/types";
import styles from "./Posts.module.scss";
import PostsList from "./PostsList/PostsList";
import WriteAPost from "./WriteAPost/WriteAPost";

const fetchPosts = (): Promise<IPostsData> => api.get(`/posts`);

export const getStaticProps: GetStaticProps = async (context) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("posts", fetchPosts, { retry: false });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      key: context.params,
    },
  };
};

export default function Posts() {
  const token = useAppSelector((state) => state.auth.token);

  const router = useRouter();
  const { boardType } = router.query;

  const boardId = boardList.find((board) => board.route === boardType)?.id;

  const { data, status, error } = useQuery(
    ["posts", boardId],
    async () =>
      await api.get(`/posts`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          ...(boardId !== 0 && { boardId }),
        },
      }),
    {
      retry: false,
      enabled: !!token,
    }
  );
  return (
    <div className={styles.container}>
      <WriteAPost />
      {status === LOADING ? (
        <span>Loading</span>
      ) : status === ERROR && error instanceof Error ? (
        <span>Error: {error.message}</span>
      ) : null}
      <PostsList posts={data?.data.content || []} />
    </div>
  );
}
