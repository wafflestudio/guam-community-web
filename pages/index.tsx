import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

import PageTitle from "../components/PageTitle";
import PostsPage from "../components/PostsPage/PostsPage";
import { useAppSelector } from "../store/hooks";
import {
  getAllPosts,
  getRunningOperationPromises,
  useGetAllPostsQuery,
} from "../store/postsApi";
import { wrapper } from "../store/store";

const Home = () => {
  const [currentPage, setCurrentPage] = useState<number | undefined>(undefined);

  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const router = useRouter();

  const page = useMemo(() => router.isReady && router.query.page, [router]);

  useEffect(() => {
    if (!router.isReady) return;

    if (page === undefined) {
      setCurrentPage(0);
      return;
    }

    if (typeof page === "string" && parseInt(page) >= 1) {
      setCurrentPage(parseInt(page) - 1);
    } else {
      router.push("/404");
    }
  }, [router.isReady, router.query.page]);

  useGetAllPostsQuery(currentPage || 0, {
    skip: currentPage === undefined || isLoggedIn === undefined,
  });

  return (
    <>
      <PageTitle title="Home" />
      <PostsPage />
    </>
  );
};

export default Home;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { page } = context.query;
    if (typeof page === "string" && typeof parseInt(page) === "number") {
      store.dispatch(getAllPosts.initiate(parseInt(page)));
    }

    await Promise.all(getRunningOperationPromises());

    return {
      props: {},
    };
  }
);
