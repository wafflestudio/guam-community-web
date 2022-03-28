import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo } from "react";
import { useQuery } from "react-query";
import { api } from "../../../../api/api";
import CommentForm from "../../../../components/CommentForm";
import Comments from "../../../../components/Comments";
import PageTitle from "../../../../components/PageTitle";
import { ERROR, LOADING } from "../../../../constants/constants";
import { setComments } from "../../../../store/commentsSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { IDetailedPost } from "../../../../types/types";

export default function DetailedPostPage() {
  const router = useRouter();
  const { postId } = router.query;

  const token = useAppSelector((state) => state.auth.token);
  const comments = useAppSelector((state) => state.comments.comments);
  const dispatch = useAppDispatch();

  const fetchDetailedPost = useCallback((): Promise<IDetailedPost> => {
    return api.get(`/posts/${postId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }, [postId]);

  const { data, status, error } = useQuery(
    ["posts", postId],
    fetchDetailedPost,
    { retry: false, enabled: !!token }
  );

  const postData = useMemo(() => data?.data, [data?.data]);
  useEffect(() => {
    dispatch(setComments(data?.data.comments || null));
  }, [data?.data.comments]);

  return (
    <>
      <PageTitle title={postData?.title || "Posts"} />
      <Link href={"/"}>
        <a>홈</a>
      </Link>
      {status === LOADING ? (
        <span>Loading</span>
      ) : status === ERROR && error instanceof Error ? (
        <span>Error: {error.message}</span>
      ) : null}
      <div>
        {postData?.user.nickname} {postData?.content}
      </div>
      {postData?.imagePaths.map((image) => (
        <li key={image}>
          <img src={process.env.BUCKET_URL + image} />
        </li>
      ))}
      <CommentForm id={postData?.id || 0} />
      <Comments comments={comments} />
    </>
  );
}
