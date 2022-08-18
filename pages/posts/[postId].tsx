import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";

import PageTitle from "../../components/PageTitle";
import PostDetailPage from "../../components/PostDetailPage/PostDetailPage";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useGetPostDetailQuery } from "../../store/postsApi";
import { setToast } from "../../store/toastSlice";
import useRouterInfo from "../../utils/useRouterInfo";
import withAuth from "../../utils/withAuth";

const DetailedPostPage = () => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const { postId } = useRouterInfo();

  const dispatch = useAppDispatch();
  const router = useRouter();

  const { data, error } = useGetPostDetailQuery(postId!, {
    skip: !isLoggedIn || !postId,
  });

  useEffect(() => {
    if (error) {
      dispatch(setToast("게시글을 받아오는데 실패했습니다"));
      router.push("/");
    }
  }, [error]);

  return (
    <Fragment key={postId}>
      <PageTitle title={data?.title || "Posts"} />
      <PostDetailPage />
    </Fragment>
  );
};

export default withAuth(DetailedPostPage);
