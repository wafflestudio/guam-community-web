import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

import PageTitle from "../../components/PageTitle";
import PostDetailPage from "../../components/PostDetailPage/PostDetailPage";
import { useGetPostDetailQuery } from "../../store/postsApi";
import { useLogin } from "../../utils/useLogin";

export default function DetailedPostPage() {
  const [currentPost, setCurrentPost] = useState<number>(0);

  const isLoggedIn = useLogin();

  const router = useRouter();

  const postId = useMemo(() => router.isReady && router.query.postId, [router]);

  useEffect(() => {
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
  }, [router.isReady, router.query.page, postId]);

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
