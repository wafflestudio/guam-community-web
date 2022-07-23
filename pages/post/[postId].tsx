import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

import { useGetPostDetailQuery } from "../../api/postsApi";
import PageTitle from "../../components/PageTitle";
import PostDetailPage from "../../components/PostDetailPage/PostDetailPage";
import { useAppSelector } from "../../store/hooks";

export default function DetailedPostPage() {
  const [currentPost, setCurrentPost] = useState<number>(0);

  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const router = useRouter();

  const postId = useMemo(() => router.isReady && router.query.postId, [router]);

  useEffect(() => {
    if (!isLoggedIn) router.push("/login");

    if (!router.isReady) return;

    if (postId === undefined) {
      setCurrentPost(0);
      return;
    }

    if (typeof postId === "string" && parseInt(postId) >= 1) {
      setCurrentPost(parseInt(postId));
    } else {
      router.push("/404");
    }
  }, [router.isReady, router.query.page]);

  const { data, isLoading, error } = useGetPostDetailQuery(currentPost, {
    skip: !isLoggedIn || currentPost === 0,
    refetchOnMountOrArgChange: true,
  });

  return (
    <>
      <PageTitle title={data?.title || "Posts"} />
      {isLoading ? <span>Loading</span> : error ? <span>Error</span> : null}
      <PostDetailPage />
    </>
  );
}
