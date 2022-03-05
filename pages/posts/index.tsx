import { dehydrate, QueryClient, useQuery } from "react-query";
import { api } from "../../api/api";
import { PostsBoardNavbar } from "../../components/PostsBoardNavbar";
import PageTitle from "../../components/PageTitle";
import { useAppSelector } from "../../store/hooks";
import { IPostsData } from "../../types/types";
import { PostsList } from "../../components/PostsList";
import SignInForm from "../../components/SignInForm";
import { ERROR, LOADING } from "../../constants/constants";

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

  const { data, status, error } = useQuery("posts", fetchPosts, {
    retry: false,
    enabled: !!token,
  });

  return (
    <>
      <PageTitle title="Posts" />
      <PostsBoardNavbar />
      <SignInForm />
      <div>all</div>
      {status === LOADING ? (
        <span>Loading</span>
      ) : status === ERROR && error instanceof Error ? (
        <span>Error: {error.message}</span>
      ) : null}
      <PostsList posts={data?.data.content || []} />
    </>
  );
}
