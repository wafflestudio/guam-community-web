import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

import { useGetAllPostsQuery } from "../api/postsApi";
import PageTitle from "../components/PageTitle";
import PostsPage from "../components/PostsPage/PostsPage";
import SignInForm from "../components/SignInForm";
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

  const { isLoading, error } = useGetAllPostsQuery(currentPage, {
    refetchOnMountOrArgChange: true,
    skip: currentPage === undefined,
  });

  return (
    <>
      <PageTitle title="Home" />
      <SignInForm />
      {isLoggedIn ? null : (
        <Link href={"/oauth/authorize"}>
          <a>카카오로그인</a>
        </Link>
      )}
      <Link href={"/profile/me"}>
        <a>프로필 관리</a>
      </Link>
      {error ? <>error</> : isLoading ? <>Loading...</> : null}
      <PostsPage />
    </>
  );
};

export default Home;
