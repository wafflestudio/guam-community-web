import type { NextPage } from "next";

import { postsListApi, useGetAllPostsQuery } from "../api/postsListApi";
import PageTitle from "../components/PageTitle";
import PostsPage from "../components/PostsPage/PostsPage";
import SignInForm from "../components/SignInForm";
import { useAppSelector } from "../store/hooks";
import { wrapper } from "../store/store";

const Home: NextPage = () => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const result = useGetAllPostsQuery(undefined, {
    skip: !isLoggedIn,
    refetchOnMountOrArgChange: true,
  });
  const { isLoading, error } = result;

  return (
    <>
      <PageTitle title="Home" />
      <SignInForm />
      {error ? <>error</> : isLoading ? <>Loading...</> : null}
      <PostsPage />
    </>
  );
};

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  store.dispatch(postsListApi.endpoints.getAllPosts.initiate());

  return {
    props: {},
  };
});

export default Home;
