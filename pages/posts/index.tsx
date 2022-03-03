import { dehydrate, QueryClient, useQuery } from "react-query";
import { api } from "../../apis/api";
import { Navbar } from "../../components/Navbar";
import Title from "../../components/Title";
import { IPostsData } from "../../types/types";
import { PostsList } from "./PostsList";

const fetchPosts = async () => {
  const response: IPostsData = await api.get("/posts");
  return response;
};

export async function getStaticProps() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  await queryClient.prefetchQuery("posts", fetchPosts);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function Posts() {
  const { data, status, error } = useQuery("posts", fetchPosts, {
    retry: false,
  });

  const isError = (error: unknown): error is Error => {
    return error instanceof Error;
  };

  return (
    <>
      <Title title="Posts" />
      <Navbar />
      {status === "loading" ? (
        <span>Loading</span>
      ) : status === "error" && isError(error) ? (
        <span>Error: {error.message}</span>
      ) : null}
      <PostsList posts={data?.content || []} />
    </>
  );
}
