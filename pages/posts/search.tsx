import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

import PageTitle from "../../components/PageTitle";
import PostsPage from "../../components/PostsPage/PostsPage";

export default function Home() {
  const [currentPage, setCurrentPage] = useState<number | undefined>(undefined);
  const router = useRouter();

  const page = useMemo(() => router.isReady && router.query.page, [router]);
  const keyword = useMemo(
    () =>
      typeof router.query.keyword === "string" &&
      encodeURI(router.query.keyword),
    [router.query]
  );

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
  }, [page, router.isReady]);

  return (
    <>
      <PageTitle
        title={`${typeof keyword === "string" && decodeURI(keyword)}`}
      />
      <PostsPage />
    </>
  );
}
