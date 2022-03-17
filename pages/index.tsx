import type { GetStaticProps, NextPage } from "next";
import PageTitle from "../components/PageTitle";
import SignInForm from "../components/SignInForm";
import PostsPage from "../components/PostsPage/PostsPage";
import { IPostsData } from "../types/types";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { api } from "../api/api";
import { ERROR, LOADING } from "../constants/constants";
import { setPosts } from "../store/postsListSlice";

const fetchPosts = (): Promise<IPostsData> => api.get(`/posts`);

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("posts", fetchPosts, { retry: false });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const Home: NextPage = () => {
  const token = useAppSelector((state) => state.auth.token);

  const dispatch = useAppDispatch();

  const { data, status, error } = useQuery(
    ["posts"],
    async () =>
      await api.get(`/posts`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    {
      retry: false,
      enabled: !!token,
    }
  );

  dispatch(setPosts(data?.data.content));

  return (
    <>
      <PageTitle title="Guam" />
      <SignInForm />
      {status === LOADING ? (
        <span>Loading</span>
      ) : status === ERROR && error instanceof Error ? (
        <span>Error: {error.message}</span>
      ) : null}
      <PostsPage />
    </>
  );
};

export default Home;
