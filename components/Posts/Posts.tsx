import { dehydrate, QueryClient, useQuery } from "react-query";
import { api } from "../../api/api";
import { useAppSelector } from "../../store/hooks";
import { IPostsData } from "../../types/types";
import styles from "./Posts.module.scss";
import PostsList from "./PostsList/PostsList";
import WriteAPost from "./WriteAPost/WriteAPost";

const fetchPosts = (): Promise<IPostsData> => api.get(`/posts`);

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("posts", fetchPosts, { retry: false });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function Posts() {
  const token = useAppSelector((state) => state.auth.token);

  const { data, status, error } = useQuery(
    "posts",
    async () =>
      await api.get(`/posts`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    {
      retry: false,
      enabled: !!token,
    }
  );
  return (
    <div className={styles.container}>
      <WriteAPost />
      <PostsList posts={data?.data.content || []} />
    </div>
  );
}
