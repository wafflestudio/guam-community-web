import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

import axios from "axios";

import PostsPage from "components/pages/posts/PostsPage";
import PageTitle from "components/PageTitle";
import { useAppSelector } from "store/hooks";
import { useGetAllPostsQuery } from "store/postsApi";

const Home = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const { data: clientPosts, isLoading } = useGetAllPostsQuery(props.page, {
    skip: !isLoggedIn,
  });

  return (
    <>
      <PageTitle title="Home" />
      <PostsPage
        posts={clientPosts?.content || props.data.content}
        isLoading={isLoading}
        hasNext={clientPosts?.hasNext || props.data.hasNext}
      />
    </>
  );
};

export default Home;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { page } = context.query;
  const parsedPage =
    typeof page === "string" && typeof parseInt(page) === "number"
      ? parseInt(page) - 1
      : 0;

  const { data } = await axios.get(
    `${process.env.POSTS_URL}${parsedPage}&size=10`
  );

  return {
    props: { page: parsedPage, data },
  };
};
