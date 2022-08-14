import { Fragment } from "react";

import PageTitle from "../../components/PageTitle";
import PostDetailPage from "../../components/PostDetailPage/PostDetailPage";
import { useAppSelector } from "../../store/hooks";
import { useGetPostDetailQuery } from "../../store/postsApi";
import useRouterInfo from "../../utils/useRouterInfo";
import withAuth from "../../utils/withAuth";

const DetailedPostPage = () => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
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
};

export default withAuth(DetailedPostPage);
