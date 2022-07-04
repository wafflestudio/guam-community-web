import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

import { useGetAllPostsQuery } from "../api/postsApi";
import PageTitle from "../components/PageTitle";
import PaginationButton from "../components/PostsPage/PaginationButton/PaginationButton";
import PostsPage from "../components/PostsPage/PostsPage";
import { useAppSelector } from "../store/hooks";

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

  useGetAllPostsQuery(currentPage, {
    refetchOnMountOrArgChange: true,
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
