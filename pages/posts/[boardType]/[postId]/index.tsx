import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { useQuery } from "react-query";
import { api } from "../../../../api/api";
import CommentForm from "../../../../components/CommentForm";
import Comments from "../../../../components/Comments";
import PageTitle from "../../../../components/PageTitle";
import { ERROR, LOADING } from "../../../../constants/constants";
import { useAppSelector } from "../../../../store/hooks";
import { IDetailedPost } from "../../../../types/types";

export default function DetailedPostPage() {
  const router = useRouter();
  const { postId } = router.query;

  const token = useAppSelector((state) => state.auth.token);

  const fetchDetailedPost = useCallback((): Promise<IDetailedPost> => {
    return api.get(`/posts/${postId}`);
  }, [postId]);

  const { data, status, error } = useQuery(
    ["posts", postId],
    fetchDetailedPost,
    {
      retry: false,
      enabled: !!token,
    }
  );

  const postData = useMemo(() => data?.data, [data?.data]);

  return (
    <>
      <PageTitle title="Posts" />
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
          <img src={"https://guam.s3.ap-northeast-2.amazonaws.com/" + image} />
        </li>
      ))}
      <CommentForm id={postData?.id || 0} />
      <Comments comments={data?.data.comments || []} />
    </>
  );
}
