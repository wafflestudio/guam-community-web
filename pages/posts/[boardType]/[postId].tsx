import { useRouter } from "next/router";

import { useGetPostDetailQuery } from "../../../api/postDetailApi";
import PageTitle from "../../../components/PageTitle";
import PostDetailPage from "../../../components/PostDetailPage/PostDetailPage";
import { useAppSelector } from "../../../store/hooks";

export default function DetailedPostPage() {
  const router = useRouter();
  const { postId } = router.query;

  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const result = useGetPostDetailQuery(
    typeof postId === "string" ? postId : "0",
    {
      skip: !!!isLoggedIn,
      refetchOnMountOrArgChange: true,
    }
  );

  const { isLoading, error } = result;

  return (
    <>
      <PageTitle title={result?.data?.title || "Posts"} />
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
