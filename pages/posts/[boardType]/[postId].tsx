import { useRouter } from "next/router";

import { useGetPostDetailQuery } from "../../../api/postsApi";
import PageTitle from "../../../components/PageTitle";
import PostDetailPage from "../../../components/PostDetailPage/PostDetailPage";

export default function DetailedPostPage() {
  const router = useRouter();
  const { postId } = router.query;

  const { data, isLoading, error } = useGetPostDetailQuery(
    typeof postId === "string" ? postId : "0",
    {
      refetchOnMountOrArgChange: true,
    }
  );

  return (
    <>
      <PageTitle title={data?.title || "Posts"} />
      {isLoading ? <span>Loading</span> : error ? <span>Error</span> : null}
      <PostDetailPage />
      {/* {postData?.imagePaths.map((image) => (
        <li key={image}>
          <img src={process.env.BUCKET_URL + image} />
        </li>
      ))} */}
    </>
  );
}
