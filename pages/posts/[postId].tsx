import { Fragment } from "react";

import PageTitle from "../../components/PageTitle";
import PostDetailPage from "../../components/PostDetailPage/PostDetailPage";
import { useGetPostDetailQuery } from "../../store/postsApi";
import { useLogin } from "../../utils/useLogin";
import useRouterInfo from "../../utils/useRouterInfo";

export default function DetailedPostPage() {
  const isLoggedIn = useLogin();
  const { postId } = useRouterInfo();

  const { data, isLoading, error } = useGetPostDetailQuery(postId!, {
    skip: !isLoggedIn || !postId,
    refetchOnMountOrArgChange: true,
  });

  return (
    <Fragment key={postId}>
      <PageTitle title={data?.title || "Posts"} />
      {isLoading ? <span>Loading</span> : error ? <span>Error</span> : null}
      <PostDetailPage />
    </Fragment>
  );
}
