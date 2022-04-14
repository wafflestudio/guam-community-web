import { useRouter } from "next/router";
import { useEffect } from "react";

import { useGetAllPostsQuery } from "../api/postsListApi";
import PageTitle from "../components/PageTitle";
import PostsPage from "../components/PostsPage/PostsPage";
import SignInForm from "../components/SignInForm";
import { useAppDispatch } from "../store/hooks";
import { setPage } from "../store/pageSlice";

const Home = () => {
  const dispatch = useAppDispatch();

  const router = useRouter();
  const currentPage =
    typeof router.query.page === "string" && parseInt(router.query.page) >= 1
      ? parseInt(router.query.page) - 1
      : 0;

  useEffect(() => {
    dispatch(setPage(currentPage));
  }, [router.query.page]);

  const { isLoading, error } = useGetAllPostsQuery(currentPage, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <>
      <PageTitle title="Home" />
      <SignInForm />
      {error ? <>error</> : isLoading ? <>Loading...</> : null}
      <PostsPage />
    </>
  );
};

export default Home;
