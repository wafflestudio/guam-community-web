import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { api } from "../../../../api/api";
import Comments from "../../../../components/Comments";
import PageTitle from "../../../../components/PageTitle";
import { useAppSelector } from "../../../../store/hooks";
import { IDetailedPost } from "../../../../types/types";

export default function DetailedPostPage() {
  const router = useRouter();
  const { postId } = router.query;

  const token = useAppSelector((state) => state.auth.token);

  const { data, status, error } = useQuery(
    ["posts", postId],
    async () => {
      const response: IDetailedPost = await api.get(`/posts/${postId}`);
      return response;
    },
    {
      retry: false,
      enabled: !!token,
    }
  );

  const isError = (error: unknown): error is Error => {
    return error instanceof Error;
  };

  return (
    <>
      <PageTitle title="Posts" />
      {status === "loading" ? (
        <span>Loading</span>
      ) : status === "error" && isError(error) ? (
        <span>Error: {error.message}</span>
      ) : null}
      {data?.data.user.nickname} {data?.data.content}
      <Comments comments={data?.data.comments || []} />
    </>
  );
}
