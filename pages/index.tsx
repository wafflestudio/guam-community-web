import { NextPage } from "next";

import { useRouter } from "next/router";
import { useEffect } from "react";

import { useGetAllPostsQuery } from "../api/postsListApi";
import PageTitle from "../components/PageTitle";
import PostsPage from "../components/PostsPage/PostsPage";
import SignInForm from "../components/SignInForm";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setPage } from "../store/pageSlice";

const Home: NextPage = () => {
  const { page } = useAppSelector((state) => state.page);
  const dispatch = useAppDispatch();

  const router = useRouter();

  useEffect(() => {
    dispatch(
      setPage(
        parseInt(
          typeof router.query.page === "string" ? router.query.page : "0"
        )
      )
    );
  }, [router.query.page]);

  const result = useGetAllPostsQuery(page, {
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

export default Home;
