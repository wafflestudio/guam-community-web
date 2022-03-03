import { dehydrate, QueryClient, useQuery } from "react-query";
import { api } from "../../api/api";
import { PostsBoardNavbar } from "../../components/PostsBoardNavbar";
import PageTitle from "../../components/PageTitle";
import { useAppSelector } from "../../store/hooks";
import { IPostsData } from "../../types/types";
import { PostsList } from "./PostsList";

const fetchPosts = async () => {
  const response: IPostsData = await api.get("/posts");
  return response;
};

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

  const isError = (error: unknown): error is Error => {
    return error instanceof Error;
  };

  return (
    <>
      <PageTitle title="Posts" />
      <PostsBoardNavbar />
      <div>all</div>
      {status === "loading" ? (
        <span>Loading</span>
      ) : status === "error" && isError(error) ? (
        <span>Error: {error.message}</span>
      ) : null}
      <PostsList posts={data?.content || []} />
    </>
  );
}
